from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[SubtaskOut])
def get_subtasks(db: db_dependency, subtask_id: Optional[int] = None):
    if subtask_id:
        subtask = db.query(Subtask).filter(Subtask.id == subtask_id).first()
        if not subtask:
            raise HTTPException(status_code=404, detail="Subtask not found")
        return [subtask]
    return db.query(Subtask).all()

@router.post("/add_subtask", response_model=SubtaskOut)
def add_subtask(subtask_data: SubtaskIn, db: db_dependency):
    try:
        subtask_db = Subtask(
            task_id=subtask_data.task_id,
            text=subtask_data.text
        )
        db.add(subtask_db)
        db.commit()
        db.refresh(subtask_db)
        return subtask_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/delete_subtask/{subtask_id}")
def delete_comment(subtask_id: int, db: db_dependency):
    subtask = db.query(Subtask).filter(Subtask.id == subtask_id).first()
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask not found")
    db.delete(subtask)
    db.commit()
    return {"message": f"Subtask with id {subtask_id} has been deleted"}
