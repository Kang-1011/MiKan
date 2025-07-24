import os
import datetime
import time
import json
import sys
from dotenv import load_dotenv
from typing import Optional, Dict, Any, List

# LangChain components
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

# Google API Imports for Drive Integration
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseUpload
import io

# --- 1. Environment and LLM Setup ---

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GDRIVE_PARENT_FOLDER_ID =  "1MP5EbVa38BdHFnunf8C8Jjfl0vxtYJS4" 

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file.")

llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=GEMINI_API_KEY)


# --- 2. Google Drive Authentication Helper ---

SCOPES = ["https://www.googleapis.com/auth/drive"]

def get_gdrive_service():
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists("credentials.json"):
                raise FileNotFoundError("Error: credentials.json not found.")
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    try:
        return build("drive", "v3", credentials=creds)
    except HttpError as error:
        print(f"An error occurred building the Drive service: {error}")
        return None

def get_or_create_folder(service, folder_name: str, parent_folder_id: Optional[str] = None) -> str:
    query = f"mimeType='application/vnd.google-apps.folder' and name='{folder_name}' and trashed=false"
    if parent_folder_id:
        query += f" and '{parent_folder_id}' in parents"
    else:
        query += " and 'root' in parents"
    response = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    files = response.get('files', [])
    if files:
        return files[0].get('id')
    else:
        file_metadata = {'name': folder_name, 'mimeType': 'application/vnd.google-apps.folder'}
        if parent_folder_id:
            file_metadata['parents'] = [parent_folder_id]
        folder = service.files().create(body=file_metadata, fields='id').execute()
        return folder.get('id')

# --- 3. Core AI Functions ---

class AnalyzedTask(BaseModel):
    document_type: str = Field(description="The type of document to be created, e.g., 'outreach email', 'project proposal', 'meeting agenda'.")
    topic: str = Field(description="A concise summary of the main subject of the document.")

def analyze_user_request(user_query: str) -> AnalyzedTask:
    """
    LLM Pass 1: Analyzes the user's natural language request and extracts structured data.
    """
    print("--- Analyzing user request... ---")
    start_time = time.perf_counter()
    parser = JsonOutputParser(pydantic_object=AnalyzedTask)
    analysis_prompt = ChatPromptTemplate.from_template(
        """You are an expert at analyzing user requests and extracting key parameters.
From the user's query, determine the 'document_type' and the 'topic'.
- 'document_type' should be a general category like 'outreach email', 'meeting agenda', or 'specification document'.
- 'topic' should be a concise summary of the subject.

User Query: {query}

{format_instructions}
"""
    )
    analysis_chain = analysis_prompt | llm | parser
    result = analysis_chain.invoke({
        "query": user_query,
        "format_instructions": parser.get_format_instructions()
    })
    end_time = time.perf_counter()
    print(f"   [TIMER] Request analysis took: {end_time - start_time:.2f} seconds")
    return result

def draft_document_in_gdrive(topic: str, document_type: str) -> Dict[str, Any]:
    """
    LLM Pass 2: Generates draft content, creates it as a Google Doc, and returns a dictionary.
    """
    print(f"--- Starting Document Draft: '{topic}' ({document_type}) ---")
    start_llm_time = time.perf_counter()
    drafting_prompt = ChatPromptTemplate.from_template(
        """You are a creative writing assistant. Your task is to generate a rich and detailed draft for a professional {document_type} about the following topic: {topic}.
You are free to use your general knowledge and creativity to flesh out the document.
Generate output in natural prose format for pasting into Google Docs. Do not use markdown symbols like ##, *, or **. Use newlines, indents, or dashes instead.
The current date is {current_date}. Use this for any date fields.
"""
    )
    drafting_chain = drafting_prompt | llm
    current_date_str = datetime.date.today().strftime("%B %d, %Y")
    draft_content = drafting_chain.invoke({
        "document_type": document_type, "topic": topic, "current_date": current_date_str
    }).content
    end_llm_time = time.perf_counter()
    print(f"   [TIMER] LLM draft generation took: {end_llm_time - start_llm_time:.2f} seconds")
    print("\n--- Generated Draft Content ---\n")
    print(draft_content)
    print("\n-----------------------------\n")
    start_gdrive_time = time.perf_counter()
    try:
        service = get_gdrive_service()
        if not service:
            return {"error": "Could not authenticate with Google Drive."}
        parent_folder_id = GDRIVE_PARENT_FOLDER_ID or get_or_create_folder(service, "Mikan App Files")
        subfolder_id = get_or_create_folder(service, "Auto-Generated Drafts", parent_folder_id)
        file_metadata = {
            "name": f"{document_type.title()} - {topic}",
            "mimeType": "application/vnd.google-apps.document",
            "parents": [subfolder_id]
        }
        content_bytes = io.BytesIO(draft_content.encode('utf-8'))
        media = MediaIoBaseUpload(content_bytes, mimetype='text/plain', resumable=True)
        file = service.files().create(body=file_metadata, media_body=media, fields="id, webViewLink").execute()
        file_link = file.get("webViewLink")
        document_name = file_metadata["name"]
        end_gdrive_time = time.perf_counter()
        print(f"   [TIMER] Google Drive operations took: {end_gdrive_time - start_gdrive_time:.2f} seconds")
        return {"name": document_name, "url": file_link, "type": "link"}
    except Exception as e:
        return {"error": f"An error occurred during file creation: {e}"}

def process_task_string(task_string: str) -> Dict[str, Any]:
    """
    Processes a single task string, generates a document, and returns the result.
    """
    print(f"\n--- Processing Task String: '{task_string[:100]}...' ---")
    try:
        analyzed_result = analyze_user_request(task_string)
        if not analyzed_result or not isinstance(analyzed_result, dict):
            print(f"Could not analyze task string: {task_string}")
            return {"error": "Analysis failed"}

        doc_type = analyzed_result.get('document_type')
        topic = analyzed_result.get('topic')

        if not doc_type or not topic:
            print(f"Analysis failed for task string: {task_string}")
            return {"error": "Analysis failed to extract document type or topic"}

        gdrive_result = draft_document_in_gdrive(topic, doc_type)
        return gdrive_result

    except Exception as e:
        print(f"An error occurred processing task string: {e}")
        return {"error": str(e)}

def process_tasks(tasks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Processes a list of task objects, generates documents, and returns the results with the task ID.
    """
    generated_documents = []
    for task in tasks:
        task_id = task.get("id")
        title = task.get("title")
        description = task.get("description", "")
        assignee = task.get("assignee", "not assigned")
        due_date = task.get("dueDate", "not set")

        if not title:
            print(f"Skipping task with missing title: {task}")
            continue

        user_query = f"Task Title: {title}\nDescription: {description}\nAssignee: {assignee}\nDue Date: {due_date}"

        print(f"\n--- Processing Task {task_id}: '{title}' ---")
        try:
            analyzed_result = analyze_user_request(user_query)
            if not analyzed_result or not isinstance(analyzed_result, dict):
                print(f"Could not analyze task: {title}")
                continue

            doc_type = analyzed_result.get('document_type')
            topic = analyzed_result.get('topic')

            if not doc_type or not topic:
                print(f"Analysis failed for task: {title}")
                continue

            gdrive_result = draft_document_in_gdrive(topic, doc_type)
            
            # Add task_id to the result for mapping
            gdrive_result['task_id'] = task_id
            generated_documents.append(gdrive_result)

        except Exception as e:
            print(f"An error occurred processing task '{title}': {e}")
            generated_documents.append({"error": str(e), "task_id": task_id, "task_title": title})

    return generated_documents

def process_drafts(drafts: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Processes a list of draft objects, generates documents, and returns the results.
    This is for compatibility with the existing /autostart endpoint.
    """
    generated_documents = []
    for draft in drafts:
        user_query = draft.get("title")
        if not user_query:
            print(f"Skipping draft with missing title: {draft}")
            continue

        print(f"\n--- Processing Draft: '{user_query}' ---")
        try:
            analyzed_result = analyze_user_request(user_query)
            if not analyzed_result or not isinstance(analyzed_result, dict):
                 print(f"Could not analyze draft: {user_query}")
                 continue

            doc_type = analyzed_result.get('document_type')
            topic = analyzed_result.get('topic')

            if not doc_type or not topic:
                print(f"Analysis failed for draft: {user_query}")
                continue

            gdrive_result = draft_document_in_gdrive(topic, doc_type)
            generated_documents.append(gdrive_result)

        except Exception as e:
            print(f"An error occurred processing draft '{user_query}': {e}")
            generated_documents.append({"error": str(e), "draft_title": user_query})

    return generated_documents

if __name__ == '__main__':
    """
    Main execution block to run the script from the command line.
    Expects a single argument: the path to a JSON file containing the tasks.
    """
    if len(sys.argv) != 2:
        print("Usage: python autostart.py <path_to_tasks.json>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = "autostart_output.json"

    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        sys.exit(1)

    with open(input_path, 'r') as f:
        task_data = json.load(f)

    print(f"Loaded {len(task_data)} tasks from {input_path}")

    # Process the tasks
    results = process_tasks(task_data)

    # Save the results to a JSON file
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=4)

    print(f"\nProcessing complete. Results saved to {output_path}")
