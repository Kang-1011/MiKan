from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[TaskOut])
def get_tasks(db: db_dependency, task_id: Optional[int] = None):
    if task_id:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        return [task]
    return db.query(Task).all()

@router.post("/add_task", response_model=TaskOut)
def add_task(task_data: TaskIn, db: db_dependency):
    try:
        task = Task(**task_data.dict())
        db.add(task)
        db.commit()
        db.refresh(task)
        return task
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/update_task/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task_data: TaskUpdate, db: db_dependency):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_data.dict()
    for key, value in update_data.items():
        setattr(task, key, value) 

    # update_data = task_data.dict(exclude_unset=True, exclude={"attachments", "ai_attachments", "autostarts", "comments"})

    # for key, value in update_data.items():
    #     setattr(task, key, value)

    # # Clear and recreate relationships if provided
    # if task_data.attachments is not None:
    #     task.attachments.clear()
    #     for a in task_data.attachments:
    #         task.attachments.append(Attachment(name=a.name, type=a.type))

    # if task_data.ai_attachments is not None:
    #     task.ai_attachments.clear()
    #     for ai in task_data.ai_attachments:
    #         task.ai_attachments.append(AIAttachment(name=ai.name, url=ai.url))

    # if task_data.autostarts is not None:
    #     task.autostarts.clear()
    #     for auto in task_data.autostarts:
    #         task.autostarts.append(Autostart(name=auto.name, url=auto.url))

    # if task_data.comments is not None:
    #     task.comments.clear()
    #     for c in task_data.comments:
    #         task.comments.append(Comment(text=c.text, date=c.date))

    db.commit()
    db.refresh(task)
    return task

@router.delete("/delete_task/{task_id}")
def delete_task(task_id: int, db: db_dependency):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": f"Task with id {task_id} has been deleted"}

@router.get("/filter_tasks", response_model=List[TaskOut])
def filter_tasks(db: db_dependency, username: Optional[str] = None, status: Optional[str] = None):
    query = db.query(Task)

    if username:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        query = query.filter(Task.assignee_id == user.id)

    if status:
        query = query.filter(Task.status == status)

    tasks = query.all()
    if not tasks:
        raise HTTPException(status_code=404, detail="No tasks found")
    return tasks