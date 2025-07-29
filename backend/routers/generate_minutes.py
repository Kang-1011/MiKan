# Using JSON Output Parser from GAIA 7.2 Slides #

import os
import json
import requests
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

# === Load today's date ===
today = datetime.now().strftime("%Y-%m-%d")

# === LOAD GEMINI API KEY ===
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in .env file.")

# === CONFIGURATION ===
BASE_URL = "http://localhost:8000"
OUTPUT_JSON_PATH = os.path.join(os.path.dirname(__file__), "generated_minutes.json")

# === PYDANTIC MODELS ===
class MeetingHeader(BaseModel):
    title: str = Field(description="Meeting title")
    location: str = Field(description="Meeting location")
    created_by: str = Field(description="Person who created the meeting")
    date: str = Field(description="Meeting date in YYYY-MM-DD format")
    project: str = Field(description="Project name")
    purpose: str = Field(description="Purpose of the meeting")
    attendees: str = Field(description="Comma-separated list of attendees")

class Task(BaseModel):
    task_no: str = Field(description="The name of individual task", alias="Task No.")
    description: str = Field(description="Detailed task description", alias="Description")
    action_by: str = Field(description="Person assigned to the task", alias="Action by")
    due_date: str = Field(description="Due date in YYYY-MM-DD format", alias="Due date")

class MeetingMinutes(BaseModel):
    header: MeetingHeader = Field(description="Meeting header information")
    tasks: List[Task] = Field(description="List of actionable tasks")

# === INITIALIZE LLM AND PARSER ===
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    api_key=GEMINI_API_KEY
)

output_parser = JsonOutputParser(pydantic_object=MeetingMinutes)

# === FETCH LATEST TRANSCRIPT ID ===
def fetch_latest_transcript_id():
    try:
        res = requests.get(f"{BASE_URL}/transcripts/latest")
        res.raise_for_status()
        latest = res.json()
        return latest["id"]
    except Exception as e:
        print(f"[ERROR] Could not fetch latest transcript ID: {e}")
        return None

# === FETCH TRANSCRIPT LINES BY ID ===
def fetch_transcript_text(transcript_id):
    try:
        res = requests.get(f"{BASE_URL}/transcripts/{transcript_id}")
        res.raise_for_status()
        data = res.json()

        # Build header string
        header_lines = []
        for field in ["title", "location", "created_by", "date", "project", "purpose", "attendees"]:
            if field in data and data[field]:
                label = field.replace("_", " ").title()
                header_lines.append(f"{label}: {data[field]}")
        header_text = "\n".join(header_lines)

        # Combine with transcript lines
        lines = data.get("transcript_lines", [])
        transcript_text = "\n".join(line["transcript"] for line in lines)

        return f"{header_text}\n\n{transcript_text}"
    except Exception as e:
        print(f"[ERROR] Failed to fetch transcript ID {transcript_id}: {e}")
        return ""

# === DEFINE PROMPT CHAIN ===
chat_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a smart assistant that extracts meeting metadata and actionable tasks from meeting transcripts.

Extract the meeting headers and actionable tasks from the provided transcript in the specified JSON format.

For meeting headers, extract:
- title
- location  
- created_by
- date (YYYY-MM-DD),
- project
- purpose
- attendees (format as comma-separated list: "Name1, Name2, Name3")

For tasks, extract ALL actionable items with:
- Detailed description (use "Description" as the field name. Analyse the meeting trasncript and infer the events that is being discuss in the meeting. For each event, analyzed the transcript again for the details such as the What needs to be done
    1. Who is responsible as the assignee
    2. When it should be done
    3. How it should be done (if there are constraints or requirements)
    4. Why it matters (if context or dependencies are important)
    do not the word 'both events', be specific and list down the event names)
    make the structure to follow the following :
- Task Title (From the analysis of detailed description must. Should follow this structure: {{detailed description's verb}} {{description's direct object}}.)
- Person assigned ("Action by" , and should be lowercase)
- Due date in YYYY-MM-DD format (infer from context if not explicitly stated and use appropriate dates based on urgency, ignore the date mentioned in the analysis of the meeting transcript, use date )

Make sure to extract ALL tasks mentioned in the transcript - don't miss any actionable items.

Provide the response in the specified JSON format."""
    ),
    (
        "human",
        "{input}\n{format_instructions}"
    )
])

chain = chat_prompt | llm | output_parser

# === ENTRYPOINT FUNCTION ===
def generate_minutes():
    print("[DEBUG] Generating minutes...")
    transcript_id = fetch_latest_transcript_id()
    if not transcript_id:
        raise ValueError("No transcript ID found")

    transcript_text = fetch_transcript_text(transcript_id)
    if not transcript_text.strip():
        raise ValueError("Transcript is empty")

    try:
        result_json = chain.invoke({
            "input": transcript_text,
            "format_instructions": output_parser.get_format_instructions()
        })
        
        # Save to file
        with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(result_json, f, indent=4, ensure_ascii=False)
        
        print(f"[✅] Minutes generated successfully and saved to {OUTPUT_JSON_PATH}")
        return result_json
        
    except Exception as e:
        print(f"[ERROR] Failed to generate minutes: {e}")
        raise

def gemini_generate_minutes(transcript_data: dict) -> dict:
    header_fields = [
        "title", "location", "date", "created_by",
        "purpose", "project", "attendees"
    ]
    header = {field: transcript_data.get(field, "") for field in header_fields}
    lines = transcript_data.get("transcript_lines", [])

    # Construct a full string prompt
    prompt = f"""Title: {header["title"]}
Location: {header["location"]}
Created by: {header["created_by"]}
Date: {header["date"]}
Project: {header["project"]}
Purpose: {header["purpose"]}
Attendees: {header["attendees"]}

Transcript:
""" + "\n".join(line["transcript"] for line in lines)

    try:
        result_json = chain.invoke({
            "input": prompt,
            "format_instructions": output_parser.get_format_instructions()
        })
        
        # Save to file
        with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(result_json, f, indent=4, ensure_ascii=False)
        
        print(f"[✅] Minutes generated successfully and saved to {OUTPUT_JSON_PATH}")

        return result_json
    except Exception as e:
        print(f"[ERROR] Failed to generate minutes from store JSON: {e}")
        raise

# === TEST FUNCTION ===
if __name__ == "__main__":
    try:
        minutes = generate_minutes()
        print("\nGenerated Minutes:")
        print(json.dumps(minutes, indent=4))
    except Exception as e:
        print(f"Error: {e}")
