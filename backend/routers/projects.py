from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[ProjectOut])
def get_projects(db: db_dependency, projectId: Optional[int] = None):
    if projectId:
        project = db.query(Project).filter(Project.id == projectId).first()
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return [project]
    return db.query(Project).all()

@router.post("/add_project", response_model=ProjectOut)
def add_project(db: db_dependency, project_data: ProjectIn):
    try:
        project = Project(**project_data.dict())
        db.add(project)
        db.commit()
        db.refresh(project)
        return project
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/delete_project/{project_id}")
def delete_project(project_id: int, db: db_dependency):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}