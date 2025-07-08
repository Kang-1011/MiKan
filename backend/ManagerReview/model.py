from pydantic import BaseModel
from database import Base
from datetime import date
from typing import *
from sqlalchemy import *
from sqlalchemy.orm import *
from fastapi.security import *


# ------------------------------------------------------- Base Declarative ----------------------------------------------------------

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    position = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(Date, default=func.now())

    # Relationship: one user has many tasks
    tasks = relationship("Task", back_populates="assignee")


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    created_at = Column(Date, default=func.now())

    # Relationship: one project has many tasks
    tasks = relationship("Task", back_populates="project")


class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Foreign Keys
    assignee_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)

    # Task fields
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    due_date = Column(Date)
    priority = Column(String, nullable=False)
    status = Column(String)
    comment = Column(String, nullable=True)

    file_user_data = Column(LargeBinary, nullable=True)
    file_user_type = Column(String, nullable=True)
    file_user_url = Column(String, nullable=True)

    created_at = Column(Date, default=func.now())

    # Relationships
    assignee = relationship("User", back_populates="tasks")
    project = relationship("Project", back_populates="tasks")
    
    
class Draft(Base):
    __tablename__ = "drafts"
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Foreign Keys
    assignee_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)

    # Task fields (same as Task)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    due_date = Column(Date)
    approved = Column(Boolean, default=False)
    created_at = Column(Date, default=func.now())

    # Relationships
    assignee = relationship("User", backref="drafts")
    project = relationship("Project", backref="drafts")
    

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date)

    # Transcript PDF
    transcript_data = Column(LargeBinary, nullable=True)     # raw PDF binary
    transcript_type = Column(String, nullable=True)          # e.g., "application/pdf"

    # Minute of Meeting PDF
    minutes_data = Column(LargeBinary, nullable=True)
    minutes_type = Column(String, nullable=True)

    created_at = Column(Date, default=func.now())



# ------------------------------------------------------- Base Model ----------------------------------------------------------

# User Schemas
class UserBase(BaseModel):
    username: str
    name: str
    email: str
    password: str
    position: str
    role: str

class UserOut(BaseModel):
    id: int
    name: str
    username: str

    class Config:
        orm_mode = True


# Project Schemas
class ProjectBase(BaseModel):
    title: str

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int
    created_at: Optional[date]

    class Config:
        orm_mode = True


# Task Schemas
class TaskBase(BaseModel):
    assignee_id: Optional[int]
    project_id: int
    title: str
    description: str
    due_date: date
    priority: str
    status: Optional[str] = 'todo'
    comment: Optional[str] = None

    class Config:
        orm_mode = True

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    assignee_id: Optional[int] = None
    project_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    comment: Optional[str] = None

class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    due_date: Optional[date]
    priority: str
    status: str
    comment: Optional[str]
    assignee: Optional[UserOut]
    project: ProjectOut

    class Config:
        orm_mode = True
        

# Draft Schemas
class DraftBase(BaseModel):
    assignee_id: int
    project_id: int
    title: str
    description: str
    due_date: date
    approved: bool = False

    class Config:
        orm_mode = True

class DraftCreate(DraftBase):
    pass

class DraftUpdate(BaseModel):
    assignee_id: Optional[int] = None
    project_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    comment: Optional[str] = None

class DraftOut(BaseModel):
    id: int
    title: str
    description: str
    due_date: Optional[date]
    status: str
    priority: str
    comment: Optional[str]
    assignee: UserOut
    project: ProjectOut

    class Config:
        orm_mode = True
