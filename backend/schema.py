from pydantic import BaseModel
from typing import List
from datetime import date

class TranscriptLine(BaseModel):
    transcript: str

    class Config:
        orm_mode = True

class TranscriptResponse(BaseModel):
    id: int
    title: str
    location: str
    created_by: str
    date: date
    project: str
    purpose: str
    attendees: str
    transcript_lines: List[TranscriptLine]

    class Config:
        orm_mode = True

class TranscriptLineCreate(BaseModel):
    transcript: str

class TranscriptCreate(BaseModel):
    title: str
    location: str
    created_by: str
    date: str
    project: str
    purpose: str
    attendees: str
    transcript_lines: List[TranscriptLineCreate]