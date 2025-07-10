from fastapi.responses import *
from fastapi import *
from database import *
from model import *
from typing import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[AutostartOut])
def get_autostart_url(db: db_dependency, autostart_id: Optional[int] = None):
    if autostart_id:
        autostart = db.query(Autostart).filter(Autostart.id == autostart_id).first()
        if not autostart or not autostart.url:
            raise HTTPException(status_code=404, detail="No URL found")
        return [autostart]
    return db.query(Autostart).all()

@router.post("/upload_url")
def upload_autostart_url(autostart_data: AutostartIn, db: Annotated[Session, Depends(get_db)]):
    if not autostart_data.url:
        raise HTTPException(status_code=400, detail="No URL provided")

    if not autostart_data.url.startswith("http://") and not autostart_data.url.startswith("https://"):
        raise HTTPException(status_code=400, detail="Invalid URL format")
    
    try:
        autostart_db = Autostart(
            task_id=autostart_data.task_id,
            title=autostart_data.title,
            url=autostart_data.url
        )
        db.add(autostart_db)
        db.commit()
        db.refresh(autostart_db)
        return autostart_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete_url/{autostart_id}")
def delete_autostart_url(autostart_id: int, db: db_dependency):
    autostart = db.query(Autostart).filter(Autostart.id == autostart_id).first()
    if not autostart:
        raise HTTPException(status_code=404, detail="URL not found")
    db.delete(autostart)
    db.commit()
    return {"message": f"AI Attachment URL with id {autostart_id} has been deleted"}
