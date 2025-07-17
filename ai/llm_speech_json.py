import os, base64, json
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    attendees: str = Field(description="List of attendees, newline-separated")
    transcript_lines: List[TranscriptLine] = Field(description="List of transcript entries with timestamp, speaker, and content")

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0, thinking_budget=0, google_api_key=GEMINI_API_KEY)
structured_llm = llm.with_structured_output(ResponseFormatter)

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        print("Transcribing audio...")
        # if file.content_type not in ["audio/mpeg"]:
        #     raise HTTPException(status_code=415, detail="Invalid file type. Only 'audio/mpeg' is allowed.")
        
        if file.size and file.size > 100_000_000:
            raise HTTPException(status_code=413, detail="Audio file too large. Maximum file size is 100MB.")
        
        audio_content = await file.read()
        audio_data = base64.b64encode(audio_content).decode("utf-8")

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
        response = chain.invoke({})
        return {"transcript": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during transcription: {str(e)}")