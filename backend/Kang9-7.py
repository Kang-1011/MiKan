from sqlalchemy import create_engine, Column, Integer, LargeBinary, Date, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi import FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date
from sqlalchemy.sql import func
from fastapi.responses import StreamingResponse, Response
import io

DB_USER = "postgres"
DB_PASSWORD = "password"
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "mikan_db"
DB_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Set up SQLAlchemy Engine and Base
engine = create_engine(DB_URL)
Base = declarative_base()

# Create a session factory
Session = sessionmaker(bind=engine)
session = Session()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, default=func.now())

    # Transcript PDF
    transcript_data = Column(LargeBinary, nullable=True)     # raw PDF binary

    # Minute of Meeting PDF
    minutes_data = Column(LargeBinary, nullable=True)

    created_at = Column(Date, default=func.now())

# Create tables
Base.metadata.create_all(engine)

class MeetingResponse(BaseModel):
    id: int
    date: date
    created_at: date

    class Config:
        orm_mode = True

class MeetingsListResponse(BaseModel):
    meetings: List[MeetingResponse]

@app.get("/")
def read_root():
    return {
        "message": "Hello World, I am Kang!"
    }

@app.get("/get-meetings", response_model=MeetingsListResponse)
def get_meetings():
    meetings = session.query(Meeting).order_by(Meeting.created_at.desc()).all()
    return {
        "meetings": meetings
    }
    # try:
    #     meetings = session.query(Meeting).order_by(Meeting.created_at.desc()).all()
    #     return {
    #         "meetings": meetings
    #     }
    # except Exception as e:
    #     raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to retrieve meetings: {str(e)}")

@app.get("/get-meetings", response_model=MeetingsListResponse)
def get_meetings(page: int = 1, limit: int = 10, sortBy: str = "", sortOrder: str = "asc"):
    offset = (page - 1) * limit
    
    # Apply pagination to your query
    meetings = session.query(Meeting).offset(offset).limit(limit).all()
    total_count = session.query(Meeting).count()
    
    return {
        "meetings": meetings,
        "total": total_count,
        "page": page,
        "limit": limit
    }

@app.post("/meeting_transcript/upload_file/")
async def upload_transcript_file(file: UploadFile = File(...)):
    if file.content_type not in ["application/pdf"]:
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Unsupported file type. Only PDF is allowed.")
    
    if file.size and file.size > 10_000_000:  # 10 MB
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="File too large. Max 10 MB allowed.")
   
    new_meeting = Meeting(
        transcript_data = await file.read()
    ) 
    session.add(new_meeting)
    session.commit()
    session.refresh(new_meeting)
    return {"message": "Transcript file saved successfully", "meeting_id": new_meeting.id}

@app.post("/meeting_minutes/upload_file/{meeting_id}")
async def upload_minutes_file(meeting_id: int, file: UploadFile = File(...)):
    if file.content_type not in ["application/pdf"]:
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Unsupported file type. Only PDF is allowed.")
    
    if file.size and file.size > 10_000_000:  # 10 MB
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="File too large. Max 10 MB allowed.")
    
    meeting = session.query(Meeting).get(meeting_id)
    if not meeting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting not found")
    
    meeting.minutes_data = await file.read()
    session.commit()
    session.refresh(meeting)
    return {"message": "Minutes file saved successfully", "meeting_id": meeting.id}

@app.get("/meeting_transcript/download_file/{meeting_id}")
def download_transcript_file(meeting_id: int):
    meeting = session.query(Meeting).get(meeting_id)
    if not meeting or not meeting.transcript_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No transcript file associated with this meeting")

    return StreamingResponse(io.BytesIO(meeting.transcript_data), media_type="application/pdf")

@app.get("/meeting_minutes/download_file/{meeting_id}")
def download_minutes_file(meeting_id: int):
    meeting = session.query(Meeting).get(meeting_id)
    if not meeting or not meeting.minutes_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No minutes file associated with this meeting")

    return StreamingResponse(io.BytesIO(meeting.minutes_data), media_type="application/pdf")