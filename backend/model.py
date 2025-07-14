from pydantic import BaseModel
from database import Base
from datetime import date, datetime
from typing import *
from sqlalchemy import *
from sqlalchemy.orm import *
from fastapi.security import *


# ------------------------- User -------------------------
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    position = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())
    
    task = relationship("Task", back_populates="assignee")

class UserBase(BaseModel):
    name: str
    username: str
    email: str
    password: str
    position: str
    role: str

class UserIn(UserBase):
    pass

class UserOut(BaseModel):
    id: int
    name: str
    username: str
    class Config:
        orm_mode = True


# ------------------------- Project -------------------------
class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())

    task = relationship("Task", back_populates="project")
    meeting = relationship("Meeting", back_populates="project")

class ProjectBase(BaseModel):
    title: str

class ProjectIn(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int
    class Config:
        orm_mode = True


# ------------------------- Task -------------------------
class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    assignee_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    due_date = Column(Date)
    priority = Column(String, nullable=False)
    status = Column(String, default="todo")
    created_at = Column(DateTime, default=func.now())

    assignee = relationship("User", back_populates="task")
    project = relationship("Project", back_populates="task")
    comments = relationship("Comment", cascade="all, delete-orphan", back_populates="task")
    subtask = relationship("Subtask", cascade="all, delete-orphan", back_populates="task")
    attachments = relationship("Attachment", cascade="all, delete-orphan", back_populates="task")
    ai_attachments = relationship("AIAttachment", cascade="all, delete-orphan", back_populates="task")
    autostarts = relationship("Autostart", cascade="all, delete-orphan", back_populates="task")

class TaskBase(BaseModel):
    assignee_id: int
    project_id: int
    title: str
    description: str
    due_date: date
    priority: str
    status: str

class TaskIn(TaskBase):
    pass

class TaskOut(TaskBase):
    id: int
    
    # attachments: List[AttachmentOut] = []
    # ai_attachments: List[AIAttachmentOut] = []
    # autostarts: List[AutostartOut] = []
    # comments: List[CommentOut] = []
    
    class Config:
        orm_mode = True

class TaskUpdate(TaskBase):
    pass
    # attachments: Optional[List[AttachmentIn]] = None
    # ai_attachments: Optional[List[AIAttachmentIn]] = None
    # autostarts: Optional[List[AutostartIn]] = None
    # comments: Optional[List[CommentIn]] = None


# ------------------------- Comment -------------------------
class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    text = Column(String)
    date = Column(DateTime, default=func.now())
    
    task = relationship("Task", back_populates="comments")

class CommentBase(BaseModel):
    task_id: int
    text: str
    date: datetime

class CommentIn(CommentBase):
    pass
    
class CommentOut(CommentBase):
    id: int    
    class Config:
        orm_mode = True


# ------------------------- Subtask -------------------------
class Subtask(Base):
    __tablename__ = "subtasks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    text = Column(String)
    date = Column(DateTime, default=func.now())
    
    task = relationship("Task", back_populates="subtask")

class SubtaskBase(BaseModel):
    task_id: int
    text: str
    date: datetime

class SubtaskIn(SubtaskBase):
    pass

class SubtaskOut(SubtaskBase):
    id: int
    class Config:
        orm_mode = True



# ------------------------- Attachment -------------------------
class Attachment(Base):
    __tablename__ = "attachments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    type = Column(String, nullable=True)
    data = Column(LargeBinary, nullable=True)
    
    task = relationship("Task", back_populates="attachments")

class AttachmentBase(BaseModel):
    task_id: str
    title: str
    type: str
    
class AttachementIn(AttachmentBase):
    pass

class AttachmentOut(AttachmentBase):
    id: int
    class Config:
        orm_mode = True


# ------------------------- AI Attachment -------------------------
class AIAttachment(Base):
    __tablename__ = "ai_attachments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    title = Column(String)
    url = Column(String)
    
    task = relationship("Task", back_populates="ai_attachments")

class AIAttachmentBase(BaseModel):
    task_id: int
    title: str
    url: str
    
class AIAttachmentIn(AIAttachmentBase):
    pass
    
class AIAttachmentOut(AIAttachmentBase):
    id: int
    class Config:
        orm_mode = True


# ------------------------- Autostart -------------------------
class Autostart(Base):
    __tablename__ = "autostarts"
    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    title = Column(String)
    url = Column(String)
    
    task = relationship("Task", back_populates="autostarts")

class AutostartBase(BaseModel):
    task_id: int
    title: str
    url: str
    
class AutostartIn(AutostartBase):
    pass
    
class AutostartOut(AutostartBase):
    id: int
    class Config:
        orm_mode = True


# ------------------------- Meeting -------------------------
class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    transcript_url = Column(String, nullable=True)
    minutes_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    
    project = relationship("Project", back_populates="meeting")
    
class MeetingBase(BaseModel):
    project_id: int
    transcript_url: str
    minutes_url: str
    
class MeetingIn(MeetingBase):
    pass
    
class MeetingOut(MeetingBase):
    id: int
    class Config:
        orm_mode = True
        

# ------------------------- Draft -------------------------
class Draft(Base):
    __tablename__ = "drafts"
    id = Column(Integer, primary_key=True, autoincrement=True)
    assignee_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    due_date = Column(Date)
    approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())

    assignee = relationship("User", backref="drafts")
    project = relationship("Project", backref="drafts")
    
class DraftBase(BaseModel):
    assignee_id: Optional[int]
    project_id: int
    title: str
    description: str
    due_date: date
    approved: Optional[bool] = None

class DraftCreate(DraftBase):
    pass

class DraftUpdate(BaseModel):
    assignee_id: Optional[int] = None
    project_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    approved: Optional[bool] = None

class DraftApprove(BaseModel):
    approved: bool = True

class DraftOut(BaseModel):
    id: int
    title: str
    description: str
    due_date: Optional[date]
    approved: Optional[bool]
    assignee: Optional["UserOut"]
    project: "ProjectOut"
    class Config:
        orm_mode = True

#_________________________________________________________________________________________________________

