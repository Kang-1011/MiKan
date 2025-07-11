from fastapi.responses import *
from fastapi import *
from database import *
from model import *
from typing import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[AIAttachmentOut])
def get_ai_attachment_url(db: db_dependency, ai_attachment_id: Optional[int] = None):
    if ai_attachment_id:
        ai_attachment = db.query(AIAttachment).filter(AIAttachment.id == ai_attachment_id).first()
        if not ai_attachment or not ai_attachment.url:
            raise HTTPException(status_code=404, detail="No URL found")
        return [ai_attachment]
    return db.query(AIAttachment).all()

@router.post("/upload_url")
def upload_ai_attachment_url(ai_attachment_data: AIAttachmentIn, db: Annotated[Session, Depends(get_db)]):
    if not ai_attachment_data.url:
        raise HTTPException(status_code=400, detail="No URL provided")

    if not ai_attachment_data.url.startswith("http://") and not ai_attachment_data.url.startswith("https://"):
        raise HTTPException(status_code=400, detail="Invalid URL format")
    
    try:
        ai_attachment_db = AIAttachment(
            task_id=ai_attachment_data.task_id,
            title=ai_attachment_data.title,
            url=ai_attachment_data.url
        )
        db.add(ai_attachment_db)
        db.commit()
        db.refresh(ai_attachment_db)
        return ai_attachment_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete_url/{ai_attachment_id}")
def delete_ai_attachment_url(ai_attachment_id: int, db: db_dependency):
    ai_attachment = db.query(AIAttachment).filter(AIAttachment.id == ai_attachment_id).first()
    if not ai_attachment:
        raise HTTPException(status_code=404, detail="URL not found")
    db.delete(ai_attachment)
    db.commit()
    return {"message": f"AI Attachment URL with id {ai_attachment_id} has been deleted"}
