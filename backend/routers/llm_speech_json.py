import os, base64, json
from fastapi import FastAPI, UploadFile, File, HTTPException, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List

from sqlalchemy.orm import Session
from database import get_db
from .users import get_users
from .names import get_names

router = APIRouter()

class TranscriptLine(BaseModel):
    timestamp: str = Field(description="Timestamp in [hh:mm:ss] format")
    speaker: str = Field(description="Name of the speaker")
    text: str = Field(description="Spoken content without the timestamp or speaker label")

class ResponseFormatter(BaseModel):
    """Always use this tool to structure your response to the user."""
    title: str = Field(description="Title of the meeting or event")
    # location: str = Field(description="Location where the meeting took place")
    # created_by: str = Field(description="Name of the person who created the meeting record")
    # date: str = Field(description="Date of the meeting in YYYY-MM-DD format")
    # project: str = Field(description="Name of the related project(s)")
    purpose: str = Field(description="Purpose or objective of the meeting")
    attendees: str = Field(description="List of attendees")
    transcript_lines: List[TranscriptLine] = Field(description="List of transcript entries with timestamp, speaker, and content")

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0, thinking_budget=0, google_api_key=GEMINI_API_KEY)
structured_llm = llm.with_structured_output(ResponseFormatter)

# attendee =  get_attendees()

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        print("Transcribing audio...")
        # if file.content_type not in ["audio/mpeg"]:
        #     raise HTTPException(status_code=415, detail="Invalid file type. Only 'audio/mpeg' is allowed.")
        
        if file.size and file.size > 100_000_000:
            raise HTTPException(status_code=413, detail="Audio file too large. Maximum file size is 100MB.")
        
        audio_content = await file.read()
        audio_data = base64.b64encode(audio_content).decode("utf-8")

        users = get_users(db)
        users = [user.username for user in users]
        users_str = ", ".join(users) if users else "No users found"
        print("Users:", users_str)

        names = get_names(db)
        names = [name.special_name for name in names]
        names_str = ", ".join(names) if names else "No names found"
        print("Proper Nouns:", names_str)

        prompt = ChatPromptTemplate.from_messages([
            (
                "system", 
                """
                You are an AI transcription assistant specialised in accurately converting spoken audio (e.g. meetings, presentations, or discussions) into written text. 
                """
            ),
            (
                "human",
                [
                    {
                        "type": "text",
                        "text": """
                                Transcribe the following audio file into the exact JSON format specified.
                                Ensure the transcription is clear, properly segmented, and captures speaker turns (if speaker information is available).
                                Group consecutive speech from the same speaker into a single transcript block (i.e. avoid splitting it into multiple entries if the speaker continues talking without interruption).
                                Do not include any additional explanation or commentary.
                                For title, please provide one that can well represent the audio. Example: 'XXX meeting for XXX events'.
                                For purpose, please analyze the tasks assigned, then categorized them into common category. Template: 'To discuss plans for the XXX, focusing {{common categories}}.'
                                Available attendees: {attendee_list}                                
                                For the attendees field, match the speakers you identify in the transcript with the available attendees list above. Only include attendees who actually spoke or were mentioned in the meeting.
                                Proper nouns: {proper_nouns}
                                For the actual spelling of proper_nouns, match with the names you identify in the transcript with the available proper nouns list above.
                                """
                    },
                    {
                        "type": "audio",
                        "source_type": "base64",
                        "data": audio_data,
                        "mime_type": "audio/mp3",
                    },
                ]
            ),
        ])
        chain = prompt | structured_llm
        
        response = chain.invoke({"attendee_list": users_str, "proper_nouns": names_str})
        # response = chain.invoke({})

        return {"transcript": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during transcription: {str(e)}")
