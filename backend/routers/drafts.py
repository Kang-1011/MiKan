from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/drafts", response_model=List[DraftOut])
def get_drafts(db: db_dependency):
    return db.query(Draft).all()