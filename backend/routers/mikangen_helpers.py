import re
import os
import pickle

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

# If modifying these scopes, delete the file token.pickle.
# 'https://www.googleapis.com/auth/documents' allows reading/writing documents this app creates or opens.
# 'https://www.googleapis.com/auth/drive.file' allows creating files and managing them (including parents).
SCOPES = ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive.file']

def get_google_services():
    """
    Authenticates with Google APIs and returns the Google Docs and Google Drive service objects.
    This function will guide you through the authentication process if you run it for the first time.
    It saves credentials in 'token.pickle' for future use.
    """
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            try:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            except FileNotFoundError:
                print("Error: 'credentials.json' not found. Please follow the setup instructions.")
                print("Make sure you've downloaded your OAuth 2.0 Client ID JSON file and named it 'credentials.json' in the same directory as this script.")
                return None, None
            except Exception as e:
                print(f"An authentication error occurred: {e}")
                return None, None
        
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
            
    docs_service = build('docs', 'v1', credentials=creds)
    drive_service = build('drive', 'v3', credentials=creds) # Use Drive API v3 for file operations
    return docs_service, drive_service

def parse_text_for_google_doc_chunks(text_input):
    """
    Parses the input text into a list of "document chunks".
    Each chunk represents a logical paragraph or a special element like a horizontal rule.
    For paragraphs, it identifies inline bolding marked by double asterisks (**text**).

    Args:
        text_input (str): The raw text string with formatting indicators.

    Returns:
        list: A list of dictionaries, each describing a document element
              (e.g., {'type': 'paragraph', 'runs': [{'text': '...', 'is_bold': False}, ...]},
              {'type': 'horizontal_rule'}, {'type': 'empty_paragraph'}).
    """
    document_chunks = []
    lines = text_input.split('\n')

    for line in lines:
        line_stripped = line.strip()

        # Handle horizontal rule (---)
        if line_stripped == '---':
            document_chunks.append({'type': 'horizontal_rule'})
            continue
        
        # Handle explicit empty lines as separate paragraphs in the document
        if not line_stripped:
            document_chunks.append({'type': 'empty_paragraph'})
            continue

        # Process the line for inline bolding and normal text segments
        current_paragraph_runs = []
        # Split the line by occurrences of '**...**', keeping the delimiters.
        # This will produce parts like: ["normal text", "**bold text**", "more normal text"]
        parts = re.split(r'(\*\*.*?\*\*)', line)

        for part in parts:
            if not part: # Skip any empty strings that might result from splitting
                continue
            
            # Check if the part starts and ends with '**' and is not just '**' itself
            if part.startswith('**') and part.endswith('**') and len(part) > 3:
                # Add the bold text content (without the asterisks)
                current_paragraph_runs.append({'text': part[2:-2], 'is_bold': True})
            else:
                # Add normal text content
                current_paragraph_runs.append({'text': part, 'is_bold': False})

        # If there are any text runs for this line, add it as a paragraph chunk
        if current_paragraph_runs:
            document_chunks.append({'type': 'paragraph', 'runs': current_paragraph_runs})
            
    return document_chunks


def create_and_format_google_doc(parsed_content, title="Formatted Document", folder_id=None):
    """
    Creates a new Google Doc, populates it with content based on the
    parsed text, applies bold formatting, handles new paragraphs/horizontal rules,
    and optionally moves the document to a specific Google Drive folder.

    Args:
        parsed_content (list): A list of document chunks generated by parse_text_for_google_doc_chunks.
        title (str): The title of the new Google Document.
        folder_id (str, optional): The ID of the Google Drive folder where the document should be placed.
                                   If None, the document is created in the user's My Drive root.

    Returns:
        str: The ID of the created Google Document, or None if an error occurred.
    """
    docs_service, drive_service = get_google_services()
    if not docs_service or not drive_service:
        return None # Authentication failed

    requests = []

    # 1. Create a new, empty Google Document
    document = docs_service.documents().create(body={'title': title}).execute()
    document_id = document.get('documentId')
    print(f'Successfully created new Google Doc with ID: {document_id}')

    # 2. If a folder_id is provided, move the document to that folder
    if folder_id:
        try:
            # Retrieve the current parents of the document. A newly created doc is in 'My Drive' root.
            # We need to explicitly remove the current parent and add the new one.
            # For a newly created document without specified parents, its parent is 'root'.
            file_metadata = drive_service.files().get(fileId=document_id, fields='parents').execute()
            previous_parents = ",".join(file_metadata.get('parents')) if file_metadata.get('parents') else ''

            drive_service.files().update(
                fileId=document_id,
                addParents=folder_id,
                removeParents=previous_parents,
                fields='id, parents'
            ).execute()
            print(f'Moved document "{title}" (ID: {document_id}) to folder ID: {folder_id}')
        except Exception as e:
            print(f"Warning: Could not move document to folder {folder_id}. Error: {e}")
            print("The document will remain in your My Drive (root) folder.")

    # The Google Docs API uses 1-based indexing for content.
    # A newly created document implicitly contains a single empty paragraph,
    # whose content starts at index 1.
    current_content_end_index = 1 

    # 3. Iterate through the parsed content and build API requests
    for chunk in parsed_content:
        if chunk['type'] == 'paragraph':
            paragraph_full_text = "".join(run['text'] for run in chunk['runs'])
            insert_start_idx = current_content_end_index
            requests.append({
                'insertText': {
                    'location': { 'index': insert_start_idx },
                    'text': paragraph_full_text + '\n'
                }
            })
            
            relative_offset_in_paragraph = 0
            for run in chunk['runs']:
                if run['is_bold']:
                    run_start_idx = insert_start_idx + relative_offset_in_paragraph
                    run_end_idx = run_start_idx + len(run['text'])
                    requests.append({
                        'updateTextStyle': {
                            'range': {
                                'startIndex': run_start_idx,
                                'endIndex': run_end_idx
                            },
                            'textStyle': {
                                'bold': True
                            },
                            'fields': 'bold'
                        }
                    })
                relative_offset_in_paragraph += len(run['text'])

            current_content_end_index += len(paragraph_full_text) + 1

        elif chunk['type'] == 'horizontal_rule':
            hr_text = "--------------------------------------------------\n"
            requests.append({
                'insertText': {
                    'location': { 'index': current_content_end_index },
                    'text': hr_text
                }
            })
            current_content_end_index += len(hr_text)
        
        elif chunk['type'] == 'empty_paragraph':
            requests.append({
                'insertText': {
                    'location': { 'index': current_content_end_index },
                    'text': '\n'
                }
            })
            current_content_end_index += 1

    # 4. Execute all batched API requests to apply changes to the document
    try:
        if requests:
            docs_service.documents().batchUpdate(documentId=document_id, body={'requests': requests}).execute()
            print('Document content and formatting applied successfully.')
        else:
            print('No content was generated or formatted for the document.')
    except Exception as e:
        print(f"An error occurred during the batch update operation: {e}")
        return None

    return document_id

def format_text_to_google_doc(text_input: str, document_title: str = "Formatted Document", folder_id: str = "1wjMWSKk8Z0VToz8hS05VrZXkyVWcP3dc"):
    """
    Takes a text input, parses it, and creates a formatted Google Doc,
    optionally placing it into a specified Google Drive folder.

    Args:
        text_input (str): The raw text string with formatting indicators (newlines, **, ---).
        document_title (str, optional): The title for the new Google Document. Defaults to "Formatted Document".
        folder_id (str, optional): The ID of the Google Drive folder where the document should be placed.
                                   If None, the document is created in the user's My Drive root.

    Returns:
        str: The URL of the created Google Document, or None if an error occurred.
    """
    print("Step 1: Parsing the input text to identify paragraphs and formatting...")
    parsed_document_data = parse_text_for_google_doc_chunks(text_input)
    
    print("Step 2: Authenticating and creating/formatting the Google Doc...")
    try:
        document_id = create_and_format_google_doc(parsed_document_data, document_title, folder_id)
        if document_id:
            doc_url = f"https://docs.google.com/document/d/{document_id}/edit"
            print(f"\nSuccess! Your formatted Google Doc is available at:")
            print(doc_url)
            return doc_url
        else:
            print("\nFailed to create or format the Google Doc. Please check the error messages above.")
            return None
    except Exception as e:
        print(f"\nAn unhandled error occurred during document creation/formatting: {e}")
        return None

# if __name__ == '__main__':
#     # Your sample text input
#     sample_text_input = """Here is a comprehensive and compelling media invite for the Shaver Gaming Event, synthesized from the provided documents:

# ---

# **1 Utama Mall Management**
# 1, Lebuh Bandar Utama, Bandar Utama,
# 47800 Petaling Jaya, Selangor, Malaysia
# **Tel:** +603-7710 8118 | **Email:** events@1utama.com.my | **Website:** www.1utama.com.my

# **FOR IMMEDIATE RELEASE**

# **EXCLUSIVE MEDIA INVITATION**"""

#     # --- IMPORTANT: Replace 'YOUR_FOLDER_ID_HERE' with the actual ID of your Google Drive folder ---
#     # To get a folder ID:
#     # 1. Go to Google Drive in your web browser.
#     # 2. Open the folder you want to use.
#     # 3. The folder ID is in the URL, after '/folders/'.
#     #    Example URL: https://drive.google.com/drive/folders/1aB2c3D4eF5g6H7i8J9k0L
#     #    The folder ID would be '1aB2c3D4eF5g6H7i8J9k0L'
#     # ---------------------------------------------------------------------------------------------
#     target_folder_id = "1wjMWSKk8Z0VToz8hS05VrZXkyVWcP3dc" # Set to None to create in My Drive root, or provide your folder ID
#     # https://drive.google.com/drive/folders/1wjMWSKk8Z0VToz8hS05VrZXkyVWcP3dc?usp=sharing
#     # target_folder_id = 'YOUR_FOLDER_ID_HERE' # Example: '1aB2c3D4eF5g6H7i8J9k0L'

#     # Call the main function with the sample input and the optional folder ID
#     formatted_doc_url = format_text_to_google_doc(
#         sample_text_input,
#         "Shaver Gaming Event Media Invite",
#         folder_id=target_folder_id
#     )

#     if formatted_doc_url:
#         print(f"The Google Doc URL is: {formatted_doc_url}")
#     else:
#         print("Failed to create the Google Doc.")


def generate_title(text_input: str):
    load_dotenv()
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    summary_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=GEMINI_API_KEY)
    summary_prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful AI assistant. Summarize the following text into a short title."),
        ("human", "{input}")
    ])
    summary_chain = summary_prompt | summary_llm
    title = summary_chain.invoke({"input": text_input})
    return title.content