from sqlalchemy.orm import Session
from model import Transcript, TranscriptLine
from schema import TranscriptCreate

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
