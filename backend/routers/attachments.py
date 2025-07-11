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

@router.post("/upload_file")
async def upload_attachment(
    db: Annotated[Session, Depends(get_db)],
    task_id: Annotated[int, Form()],
    title: Annotated[str, Form()],
    file: UploadFile = File(...)    
):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task ID not found")

    try:
        file_data = await file.read()
        attachment_db = Attachment(
            task_id=task_id,
            title=title,
            type=file.content_type,
            data=file_data
        )
        db.add(attachment_db)
        db.commit()
        db.refresh(attachment_db)
        return attachment_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
# @router.post("/upload_file/{attachment_id}")
# async def upload_attachment_file(attachment_id: int, db: db_dependency, file: Optional[UploadFile] = None):
#     if not file:
#         return {"message": "No file provided"}
#     attachment = db.query(Attachment).filter(Attachment.id == attachment_id).first()
#     if not attachment:
#         raise HTTPException(status_code=404, detail="Attachment id not found")
#     if file:
#         if file.content_type not in ["application/pdf", "text/plain", "image/png", "image/jpeg"]:
#             raise HTTPException(status_code=400, detail="Invalid file type")
#         attachment.data = await file.read()
#         attachment.type = file.content_type.split("/")[-1]
#     db.commit()
#     return {"message": "Attachment saved successfully"}