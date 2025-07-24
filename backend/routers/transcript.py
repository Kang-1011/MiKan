from fastapi import *
from database import *
from model import *
from .generate_minutes import gemini_generate_minutes,generate_minutes
from fastapi.responses import FileResponse

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[UserOut])
def get_users(db: db_dependency, username: Optional[str] = None):
    if username:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return [user]
    return db.query(User).all()
    
@router.post("/add_user", response_model=UserOut)
def add_user(db: db_dependency, user_data: UserIn):
    try:
        user_db = User(**user_data.dict())
        db.add(user_db)
        db.commit()
        db.refresh(user_db)
        return user_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/transcripts/latest")
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
        

@router.get("/transcripts/{transcript_id}", response_model=TranscriptResponse)
def read_transcript(transcript_id: int, db: Session = Depends(get_db)):
    transcript = get_transcript_by_id(db, transcript_id)
    if not transcript:
        raise HTTPException(status_code=404, detail="Transcript not found")

    return transcript

@router.post("/transcripts", response_model=TranscriptResponse)
def create_transcript_api(transcript: TranscriptCreate, db: Session = Depends(get_db)):
    return create_transcript(db, transcript)

@router.post("/minutes/generate")
def generate_minutes(transcript_data: Dict = Body(...)):
    """
    Generate minutes from transcript JSON provided by frontend (not from DB).
    """
    try:
        print("Generating minutes using frontend-provided transcript JSON...")
        result = gemini_generate_minutes(transcript_data)
        return result
    except Exception as e:
        print(f"Error generating minutes: {e}")
        return {"error": "Failed to generate minutes"}

@router.get("/minutes/generate")
def fetch_last_generated_minutes():
    return FileResponse("generated_minutes.json")

#------------------------------------------------------------------------------------------------------#

from sqlalchemy.orm import Session
from model import TranscriptCreate, TranscriptResponse, TranscriptLineSchema, Transcript

def create_transcript(db: Session, transcript_data: TranscriptCreate):
    transcript = Transcript(
        title=transcript_data.title,
        location=transcript_data.location,
        created_by=transcript_data.created_by,
        date=transcript_data.date,
        project=transcript_data.project,
        purpose=transcript_data.purpose,
        attendees=transcript_data.attendees,
    )
    db.add(transcript)
    db.flush()  # Get ID for FK use

    for line in transcript_data.transcript_lines:
        db.add(TranscriptLine(transcript_id=transcript.id, transcript=line.transcript))

    db.commit()
    db.refresh(transcript)
    return transcript


def get_transcript_by_id(db: Session, transcript_id: int):
    return db.query(Transcript).filter(Transcript.id == transcript_id).first()

def create_mock_data(db: Session):
    # Check if mock data already exists
    if db.query(Transcript).first():
        return

    transcript = Transcript(
        title="Transcript",
        location="Meeting Room 1",
        created_by="Alpha",
        date="2025-07-03",
        project="Project Capstone",
        purpose="This meeting focused on...",
        attendees="Alpha (alpha@example.com)\nBravo (bravo@example.com)"
    )
    db.add(transcript)
    db.commit()
    db.refresh(transcript)

    lines = [
        TranscriptLine(transcript_id=transcript.id, transcript="00:00:05 Speaker 1 (Alpha) : Welcome everyone."),
        TranscriptLine(transcript_id=transcript.id, transcript="00:00:10 Speaker 2 (Bravo) : Thanks, Alpha."),
    ]
    db.add_all(lines)
    db.commit()
