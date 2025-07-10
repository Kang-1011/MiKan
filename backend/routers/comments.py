from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[CommentOut])
def get_comments(db: db_dependency, comment_id: Optional[str] = None):
    if comment_id:
        comment = db.query(Comment).filter(Comment.id == comment_id).first()
        if not comment:
            raise HTTPException(status_code=404, detail="Comment not found")
        return [comment]
    return db.query(Comment).all()

@router.post("/add_comment")
def add_comment(comment_data: CommentIn, db: db_dependency):
    try:
        comment_db = Comment(
            task_id=comment_data.task_id,
            text=comment_data.text
        )
        db.add(comment_db)
        db.commit()
        db.refresh(comment_db)
        return comment_db
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/delete_comment/{comment_id}")
def delete_comment(comment_id: int, db: db_dependency):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
    return {"message":f"Comment with id {comment_id} has been deleted"}
