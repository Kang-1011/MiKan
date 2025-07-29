from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[NameOut])
def get_names(db: db_dependency, name: Optional[str] = None):
    return db.query(Name).all()