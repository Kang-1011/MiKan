import os
import json
import re
import requests
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

# === LOAD GEMINI API KEY ===
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in .env file.")

# === CONFIGURATION ===
BASE_URL = "http://localhost:8000"
OUTPUT_JSON_PATH = os.path.join(os.path.dirname(__file__), "generated_minutes.json")

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
def build_chain():
    prompt = ChatPromptTemplate.from_messages([
        ("system", """
You are a smart assistant that extracts meeting metadata and actionable tasks from meeting transcripts.

Extract the following meeting headers:
- title
- location
- created_by
- date (YYYY-MM-DD)
- project
- purpose
- attendees

Then extract actionable tasks with these details for each task:
- Assign a task number (1, 1.1, 2, etc.)
- Include a detailed description
- Assign to someone if possible ("Action by")
- Include a due date in YYYY-MM-DD if available or infer from context

Format the output as a JSON object with two keys: "header" and "tasks"

Example output format:

{{
  "header": {{
    "title": "Project Kickoff Meeting",
    "location": "Conference Room A",
    "created_by": "Alice",
    "date": "2025-07-08",
    "project": "New Website Launch",
    "purpose": "Discuss project goals and assign tasks",
    "attendees": "Alice, Bob, Charlie"
  }},
  "tasks": [
    {{
      "Task No.": "1",
      "Description": "Write up the revised product launch plan.",
      "Action by": "Charlie",
      "Due date": "2025-07-15"
    }},
    {{
      "Task No.": "2",
      "Description": "Prepare marketing materials.",
      "Action by": "Bob",
      "Due date": "2025-07-20"
    }}
  ]
}}

Only return the JSON object.
        """),
        ("human", "{input}")
    ])
    return prompt | ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=GEMINI_API_KEY)



# === ENTRYPOINT FUNCTION ===
def generate_minutes():
    print("[DEBUG] Generating minutes...")
    transcript_id = fetch_latest_transcript_id()
    if not transcript_id:
        raise ValueError("No transcript ID found")

    transcript_text = fetch_transcript_text(transcript_id)
    if not transcript_text.strip():
        raise ValueError("Transcript is empty")

    chain = build_chain()
    result_raw = chain.invoke({ "input": transcript_text })
    result_str = result_raw.content

    json_text = result_str.strip()
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", json_text, re.IGNORECASE)
    if fence_match:
        json_text = fence_match.group(1).strip()

    try:
        result_json = json.loads(json_text)
    except json.JSONDecodeError as e:
        print(f"[ERROR] JSON decoding failed: {e}")
        with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
            f.write(result_str)
        raise ValueError("Failed to decode JSON. Raw result saved.")

    # Save to pinia
    print(f"[✅] Minutes generated successfully.")
    return result_json

