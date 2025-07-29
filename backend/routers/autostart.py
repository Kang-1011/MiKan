from fastapi.responses import *
from fastapi import *
from database import *
from model import *
from typing import *

# Import the AI functions from other modules
from .autostart_task_ai import process_task_string

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

class AutostartStringRequest(BaseModel):
    task_string: str
    task_id: int

@router.post("/generate-autostart/", response_model=AutostartOut)
async def autostart_task_endpoint(request: AutostartStringRequest, db: db_dependency):
    """
    Receives a single task as a string, generates a document, saves it to the DB,
    and returns the created autostart object.
    """
    print(f"Received autostart-task request for task ID: {request.task_id}")
    try:
        # Generate the document using the AI service
        result = process_task_string(request.task_string)
        if result.get("error"):
            raise HTTPException(status_code=500, detail=result.get("error"))

        # # Save to database
        autostart_db = Autostart(
            task_id=request.task_id,
            title=result.get("name"),
            url=result.get("url")
        )
        db.add(autostart_db)
        db.commit()
        db.refresh(autostart_db)

        print(f"Autostart-task processing complete. Returning result for task {request.task_id}.")
        return autostart_db

        # Create a temporary object to return to the frontend without saving to DB
        import time
        temp_id = int(time.time() * 1000) # temporary unique ID

        autostart_response = {
            "id": temp_id,
            "task_id": request.task_id,
            "title": result.get("name"),
            "url": result.get("url")
        }

        print(f"Autostart-task processing complete. Returning result for task {request.task_id} without DB write.")
        # The response_model=AutostartOut will validate this dictionary
        return autostart_response
    except Exception as e:
        # db.rollback()
        print(f"An error occurred during autostart-task processing: {e}")
        # Re-raise as HTTPException to be handled by FastAPI
        raise HTTPException(status_code=500, detail=f"An error occurred during autostart-task processing: {e}")

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

