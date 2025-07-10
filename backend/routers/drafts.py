from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[DraftOut])
def get_drafts(db: db_dependency):
    return db.query(Draft).all()

@router.post("/add_draft", response_model=DraftOut)
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
