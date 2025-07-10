from fastapi.responses import *
from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[MeetingOut])
def get_meeting(db: db_dependency, meeting_id: Optional[int] = None):
    if meeting_id:
        meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
        if not meeting:
            raise HTTPException(status_code=404, detail="No meeting found.")
        return [meeting]
    return db.query(Meeting).all()

@router.post("/upload_url")
def upload_meeting(meeting_data: MeetingIn, db: Annotated[Session, Depends(get_db)]):
    project = db.query(Project).filter(Project.id == meeting_data.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project ID not found")
    
    if not meeting_data.transcript_url.startswith("http://") and not meeting_data.transcript_url.startswith("https://"):
        raise HTTPException(status_code=400, detail="Invalid transcript URL format")

    if not meeting_data.minutes_url.startswith("http://") and not meeting_data.minutes_url.startswith("https://"):
        raise HTTPException(status_code=400, detail="Invalid minute meeting URL format")
    
    try:
        meeting_db = Meeting(
            project_id = meeting_data.project_id,
			transcript_url = meeting_data.transcript_url,
			minutes_url = meeting_data.minutes_url
        )
        db.add(meeting_db)
        db.commit()
        db.refresh(meeting_db)
        return meeting_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete_url/{meeting_id}")
def delete_meeting(meeting_id: int, db: db_dependency):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting detail not found")
    db.delete(meeting)
    db.commit()
    return {"message": f"Meeting detail with id {meeting_id} has been deleted"}
