from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[UserOut])
def get_users(db: db_dependency, username: Optional[str] = None):
    if username:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return [user]
    return db.query(User).all()
    
@router.post("/add_user", response_model=UserOut)
def add_user(db: db_dependency, user_data: UserIn):
    try:
        user_db = User(**user_data.dict())
        db.add(user_db)
        db.commit()
        db.refresh(user_db)
        return user_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))