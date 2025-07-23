from fastapi.responses import *
from fastapi import *
from database import *
from model import *
from typing import *
import io

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/{attachment_id}")
def get_attachment(attachment_id: int, db: db_dependency):
    attachment = db.query(Attachment).filter(Attachment.id == attachment_id).first()
    if not attachment or not attachment.data:
        raise HTTPException(status_code=404, detail="No attachment associated with this task")
    media_type = f"application/{attachment.type}" if attachment.type in ['pdf', 'txt'] else f"image/{attachment.type}"
    return StreamingResponse(io.BytesIO(attachment.data), media_type=media_type)

@router.post("/upload_attachment")
async def upload_attachment(
    db: Annotated[Session, Depends(get_db)],
    task_id: Annotated[int, Form()],
    attachment_id: Annotated[Optional[int], Form()] = 0,
    file: Optional[UploadFile] = None
):
    # Check if task exists
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    title = file.filename

    if not attachment_id or attachment_id <= 0:
        attachment = Attachment(task_id=task_id, title=title)
        db.add(attachment)
        db.commit()
        db.refresh(attachment)
    else:
        attachment = db.query(Attachment).filter(Attachment.id == attachment_id).first()
        if not attachment:
            raise HTTPException(status_code=404, detail="Attachment not found")
        attachment.title = title

    if file.content_type not in ["application/pdf", "text/plain", "image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    attachment.data = await file.read()
    attachment.type = file.content_type.split("/")[-1]

    db.commit()
    db.refresh(attachment)

    return {
        "message": "Attachment saved successfully",
        "attachment_id": attachment.id,
        "attachment_task_id": attachment.task_id,
        "attachment_title": attachment.title,
        "attachment_type": attachment.type,
    }

@router.delete("/delete_attachment/{attachment_id}")
def delete_attachment(attachment_id: int, db: db_dependency):
    attachment = db.query(Attachment).filter(Attachment.id == attachment_id).first()
    if not attachment:
        raise HTTPException(status_code=404, detail="Attachment not found")
    
    db.delete(attachment)
    db.commit()
    return {"message": f"Attachment {attachment_id} deleted successfully"}