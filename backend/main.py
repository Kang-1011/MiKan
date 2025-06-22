from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import *
from fastapi import *
from database import *
from model import *
from typing import *
import io


app = FastAPI()
create_tables()
db_dependency = Annotated[Session, Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

security = HTTPBearer()


# -------------------------------------------------------- User Routes --------------------------------------------------------


@app.get("/users", response_model=List[UserBase])
def get_users(db: db_dependency, username: Optional[str] = None):
    if username:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return [user]
    return db.query(User).all()
    
@app.post("/add_user", response_model=UserBase)
def add_user(db: db_dependency, user_data: UserBase):
    try:
        user_db = User(**user_data.dict())
        db.add(user_db)
        db.commit()
        db.refresh(user_db)
        return user_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

# -------------------------------------------------------- Project Routes --------------------------------------------------------

@app.get("/projects", response_model=List[ProjectOut])
def get_projects(db: db_dependency):
    return db.query(Project).all()

@app.post("/add_project", response_model=ProjectOut)
def add_project(db: db_dependency, project_data: ProjectCreate):
    try:
        project = Project(**project_data.dict())
        db.add(project)
        db.commit()
        db.refresh(project)
        return project
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------------------------------- Task Routes --------------------------------------------------------

@app.get("/tasks", response_model=List[TaskOut])
def get_tasks(db: db_dependency):
    return db.query(Task).all()

@app.get("/tasks/{task_id}", response_model=TaskOut)
def get_task(task_id: int, db: db_dependency):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.post("/add_task", response_model=TaskOut)
def add_task(task_data: TaskBase, db: db_dependency):
    try:
        task = Task(**task_data.dict())
        db.add(task)
        db.commit()
        db.refresh(task)
        return task
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/update_task/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task_data: TaskUpdate, db: db_dependency):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    update_data = task_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


# -------------------------------------------------------- Filter Tasks --------------------------------------------------------

@app.get("/filter_tasks", response_model=List[TaskOut])
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


# -------------------------------------------------------- File Upload & Download --------------------------------------------------------

@app.post("/upload_file/{task_id}")
async def upload_file(task_id: int, db: db_dependency, file: Optional[UploadFile] = None, url: Optional[str] = None):
    if not file and not url:
        return {"message": "No file or URL provided"}

    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if file:
        if file.content_type not in ["application/pdf", "text/plain", "image/png", "image/jpeg"]:
            raise HTTPException(status_code=400, detail="Invalid file type")
        task.file_user_data = await file.read()
        task.file_user_type = file.content_type.split("/")[-1]

    if url:
        if not url.startswith("http://") and not url.startswith("https://"):
            raise HTTPException(status_code=400, detail="Invalid URL format")
        task.file_user_url = url

    db.commit()
    return {"message": "File and/or URL saved successfully"}

@app.get("/download_file/{task_id}")
def download_file(task_id: int, db: db_dependency):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task or not task.file_user_data:
        raise HTTPException(status_code=404, detail="No file associated with this task")

    media_type = f"application/{task.file_user_type}" if task.file_user_type in ['pdf', 'txt'] else f"image/{task.file_user_type}"
    return StreamingResponse(io.BytesIO(task.file_user_data), media_type=media_type)

@app.get("/file_url/{task_id}")
def get_file_url(task_id: int, db: db_dependency):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task or not task.file_user_url:
        raise HTTPException(status_code=404, detail="No URL found")
    return {"url": task.file_user_url}


