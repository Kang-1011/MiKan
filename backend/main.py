from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal  # import your sessionmaker here
from database import Base, engine, get_db
from model import Transcript
from crud import get_transcript_by_id, create_mock_data
from schema import TranscriptResponse
from schema import TranscriptCreate, TranscriptResponse 
from crud import create_transcript  
from fastapi.responses import FileResponse
from pathlib import Path
import os
from generate_minutes import generate_minutes

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def init_mock_data():
    db = SessionLocal()
    try:
        create_mock_data(db)
    finally:
        db.close()

# ... all imports and app setup remain unchanged ...

@app.get("/transcripts/generated")
def serve_generated_minutes():
    file_path = Path(__file__).parent / "generated_minutes.json"
    if file_path.exists():
        return FileResponse(path=file_path, media_type='application/json')
    return {"error": "File not found"}

@app.get("/transcripts/latest")
def get_latest_transcript(db: Session = Depends(get_db)):
    try:
        latest = db.query(Transcript).order_by(Transcript.id.desc()).first()
        if not latest:
            raise HTTPException(status_code=404, detail="No transcript found")
        return {"id": latest.id}
    except Exception as e:
        import traceback
        print("[DEBUG] Exception in /transcripts/latest:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")
        

@app.get("/transcripts/{transcript_id}", response_model=TranscriptResponse)
def read_transcript(transcript_id: int, db: Session = Depends(get_db)):
    transcript = get_transcript_by_id(db, transcript_id)
    if not transcript:
        raise HTTPException(status_code=404, detail="Transcript not found")

    return transcript

@app.post("/transcripts", response_model=TranscriptResponse)
def create_transcript_api(transcript: TranscriptCreate, db: Session = Depends(get_db)):
    return create_transcript(db, transcript)

@app.post("/minutes/generate")
def generate_minutes_api():
    try:
        result = generate_minutes()
        return result
    except Exception as e:
        import traceback
        print("[ERROR] Failed to generate minutes:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Minutes generation failed")
