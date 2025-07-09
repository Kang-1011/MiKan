from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import *
from fastapi import *
from database import *
from model import *
from typing import *
import io
import traceback
from sqlalchemy.orm import joinedload



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
    
@app.post("/add_user")
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
def get_projects(db: db_dependency, projectId: Optional[int] = None):
    if projectId:
        project = db.query(Project).filter(Project.id == projectId).first()
        if not project:
            raise HTTPException(status_code=404, detail="User not found")
        return [project]
    return db.query(Project).all()

@app.post("/add_project")
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
    
@app.delete("/delete_project/{project_id}")
def delete_project(project_id: int, db: db_dependency):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}


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

@app.post("/add_task")
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


# -------------------------------------------------------- [TASK] File Upload & Download --------------------------------------------------------

@app.post("/task/upload_file/{task_id}")
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

@app.get("/task/download_file/{task_id}")
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


# -------------------------------------------------------- [MEETING] File Upload & Download --------------------------------------------------------

@app.post("/meeting_transcript/upload_file/{meeting_id}")
async def upload_transcript_file(meeting_id: int, db: db_dependency, file: Optional[UploadFile] = None):
    if not file:
        return {"message": "No transcript file provided"}

    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    if file:
        if file.content_type not in ["application/pdf"]:
            raise HTTPException(status_code=400, detail="Invalid file type")
        meeting.transcript_data = await file.read()
        meeting.transcript_type = file.content_type.split("/")[-1]
        
    db.commit()
    return {"message": "Transcript file saved successfully"}

@app.post("/meeting_minutes/upload_file/{meeting_id}")
async def upload_minutes_file(meeting_id: int, db: db_dependency, file: Optional[UploadFile] = None):
    if not file:
        return {"message": "No minutes file provided"}

    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    if file:
        if file.content_type not in ["application/pdf"]:
            raise HTTPException(status_code=400, detail="Invalid file type")
        meeting.minutes_data = await file.read()
        meeting.minutes_type = file.content_type.split("/")[-1]
        
    db.commit()
    return {"message": "Minutes file saved successfully"}

@app.get("/meeting_transcript/download_file/{meeting_id}")
def download_transcript_file(meeting_id: int, db: db_dependency):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting or not meeting.transcript_data:
        raise HTTPException(status_code=404, detail="No transcript file associated with this meeting")

    media_type = f"application/{meeting.transcript_type}" if meeting.transcript_type in ['pdf'] else f""
    return StreamingResponse(io.BytesIO(meeting.transcript_data), media_type=media_type)

@app.get("/meeting_minutes/download_file/{meeting_id}")
def download_minutes_file(meeting_id: int, db: db_dependency):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting or not meeting.minutes_data:
        raise HTTPException(status_code=404, detail="No minutes file associated with this meeting")

    media_type = f"application/{meeting.minutes_type}" if meeting.minutes_type in ['pdf'] else f""
    return StreamingResponse(io.BytesIO(meeting.minutes_data), media_type=media_type)



# -------------------------------------------------------- Draft Task Routes --------------------------------------------------------

# @app.get("/drafts", response_model=List[DraftOut])
# def get_drafts(db: db_dependency):
#     return db.query(Draft).all()
# @app.get("/drafts", response_model=List[DraftOut])
# def get_unapproved_drafts(db: db_dependency):
#     return db.query(Draft).filter(Draft.approved == False).all()

@app.get("/drafts", response_model=List[DraftOut])
def get_drafts(db: db_dependency):
    unapproved_drafts = db.query(Draft).options(
        joinedload(Draft.assignee),
        joinedload(Draft.project)
    ).filter(Draft.approved == False)
    return unapproved_drafts.all()


@app.get("/drafts/{draft_id}", response_model=DraftOut)
def get_draft(draft_id: int, db: db_dependency):
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found")
    return draft

@app.post("/add_draft")
def add_draft(draft_data: DraftCreate, db: db_dependency):
    try:
        draft = Draft(**draft_data.dict())
        db.add(draft)
        db.commit()
        db.refresh(draft)
        return draft
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/update_draft/{draft_id}", response_model=DraftOut)
def update_draft(draft_id: int, draft_data: DraftUpdate, db: db_dependency):
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found")
    update_data = draft_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(draft, key, value)
    db.commit()
    db.refresh(draft)
    return draft

@app.delete("/delete_draft/{draft_id}")
def delete_draft(draft_id: int, db: db_dependency):
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found")
    db.delete(draft)
    db.commit()
    return {"message": "Draft deleted successfully"}

# @app.post("/approve_draft/{draft_id}")
# def approve_draft(draft_id: int, db: db_dependency):
#     draft = db.query(Draft).filter(Draft.id == draft_id).first()
#     if not draft:
#         raise HTTPException(status_code=404, detail="Draft not found")

#     try:
#         task = Task(
#             assignee_id=draft.assignee_id,
#             project_id=draft.project_id,
#             description=draft.description,
#             due_date=draft.due_date,
#             priority=draft.priority,
#             status="todo",
#             comment=draft.comment,
#             file_user_data=draft.file_user_data,
#             file_user_type=draft.file_user_type,
#             file_user_url=draft.file_user_url
#         )
#         db.add(task)
#         db.delete(draft)
#         db.commit()
#         db.refresh(task)
#         return {"message": "Draft approved and added to tasks", "task_id": task.id}
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(status_code=500, detail=str(e))



# -------------------------------------------------------- Task Aggregation Endpoint -------------------------------------------------------- 

@app.get("/boards")
def get_project_boards(db: db_dependency):
    try:
        results = (
            db.query(
                Project.id.label("project_id"),
                Project.title.label("project_title"),
                Project.created_at.label("project_created_at"),
                Task.id.label("task_id"),
                Task.title.label("task_title"),
                Task.description,
                Task.status,
                Task.due_date,
                Task.priority,
                Task.comment,
                User.name.label("assignee_name"),
                User.username.label("assignee_username")
            )
            .outerjoin(Task, Task.project_id == Project.id)
            .outerjoin(User, Task.assignee_id == User.id)
            .all()
        )

        rows = [dict(row._mapping) for row in results]

        projects_map = {}

        for row in rows:
            project_id = row["project_id"]
            status = row["status"]
            stage_map = {
                "to-do": "To Do",
                "in-progress": "In Progress",
                "done": "Done"
            }
            stage_title = stage_map.get(status, "To Do")

            # Initialize project if not seen before
            if project_id not in projects_map:
                projects_map[project_id] = {
                    "id": project_id,
                    "title": row["project_title"],
                    "stages": {
                        "To Do": [],
                        "In Progress": [],
                        "Done": []
                    }
                }

            # Only add task if it exists
            if row["task_id"] is not None:
                task_data = {
                    "id": row["task_id"],
                    "title": row["task_title"],
                    "assignee": row["assignee_name"] or "Unassigned",
                    "dueDate": row["due_date"],
                    "priority": row["priority"],
                    "description": row["description"],
                    "comments": [
                        {"text": row["comment"], "date": str(row["due_date"])}
                    ] if row["comment"] else [],
                    "attachments": [],
                    "ai_attachments": [],
                    "autostart": [],
                    "subtasks": [],
                    "reporter": row["assignee_username"] or ""
                }

                projects_map[project_id]["stages"][stage_title].append(task_data)

        # Final structure
        boards = []
        for project in projects_map.values():
            stages = []
            for idx, (title, tasks) in enumerate(project["stages"].items(), start=1):
                stages.append({"id": idx, "title": title, "tasks": tasks})
            boards.append({"id": project["id"], "title": project["title"], "stages": stages})

        return boards

    except Exception as e:
        print("ERROR:", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))