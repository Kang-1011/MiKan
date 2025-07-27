from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from database import get_db
from model import User, Project, Draft

router = APIRouter()

# --- Helpers ---

def get_or_create_user_by_name(db: Session, username: str) -> User:
    user = db.query(User).filter_by(username=username).first()

    # if not user:
    #     user = User(
    #         name=name,
    #         username=name.lower(),  # dummy default
    #         email=f"{name.lower()}@test.com",  # dummy default
    #         password="defaultpassword",  # dummy default
    #         position="Member",
    #         role="user"
    #     )

    #     db.add(user)
    #     db.commit()
    #     db.refresh(user)
    return user

def get_or_create_project_by_title(db: Session, title: str) -> Project:
    project = db.query(Project).filter_by(title=title).first()
    if not project:
        project = Project(title=title)
        db.add(project)
        db.commit()
        db.refresh(project)
    return project

# --- Main Route ---

@router.post("/submit")
def submit_minutes(data: dict, db: Session = Depends(get_db)):
    header = data.get("header", {})
    tasks = data.get("tasks", [])

    if not header or not tasks:
        return {"status": "error", "message": "Missing header or tasks."}

    project_title = header.get("project", "").strip()
    if not project_title:
        return {"status": "error", "message": "Missing project title in header."}

    # Step 1: Create/fetch project
    project = get_or_create_project_by_title(db, project_title)

    # Step 2: Loop over tasks
    seen_users = {}
    inserted_count = 0

    for task in tasks:
        task_no = task.get("Task No.", "").strip()
        description = task.get("Description", "").strip()
        due_date_str = task.get("Due date", "").strip()
        action_by = task.get("Action by", "").strip()

        if not task_no or not description:
            continue

        # Parse date safely
        try:
            due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date() if due_date_str else None
        except ValueError:
            due_date = None

        # Get first name from Action by
        assignee_name = action_by.split(",")[0].strip() if action_by else None
        assignee = None

        if assignee_name:
            if assignee_name not in seen_users:
                seen_users[assignee_name] = get_or_create_user_by_name(db, assignee_name)
            assignee = seen_users[assignee_name]

        # Create Draft
        draft = Draft(
            title=f"{task_no}",
            description=description,
            due_date=due_date,
            approved=False,
            assignee_id=assignee.id if assignee else None,
            project_id=project.id
        )
        db.add(draft)
        inserted_count += 1

    db.commit()

    return {
        "status": "ok",
        "inserted": inserted_count,
        "project": project.title,
        "project_id": project.id
    }