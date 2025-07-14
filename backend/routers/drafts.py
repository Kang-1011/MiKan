from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

# get all drafts
@router.get("/", response_model=List[DraftOut])
def get_drafts(db: db_dependency):
    drafts = db.query(Draft).filter(Draft.approved == False)
    return drafts

# create new draft manually
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

# update a draft
@router.put("/update_draft/{draft_id}", response_model=DraftOut)
def update_draft(draft_id: int, draft_data: DraftUpdate, db: db_dependency):
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found")
    for key, value in draft_data.dict(exclude_unset=True).items():
        setattr(draft, key, value)
    db.commit()
    db.refresh(draft)
    # print(f"Draft updated: " , {draft})
    return draft

# approve one draft
@router.put("/approve_draft/{draf_id}" , response_model=DraftOut)
def approve_one_draft(draft_id: int, draft_data: DraftApprove, db: db_dependency):
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found")
    draft.approved = draft_data.approved
    db.commit()
    db.refresh(draft)
    # print("draft approved")
    return draft

# approve all drafts
@router.put("/approve_all_drafts/" , response_model=List[DraftOut])
def approve_all_drafts(draft_data: DraftApprove, db: db_dependency):
    drafts = db.query(Draft).filter(Draft.approved == False).all()
    for draft in drafts:
        draft.approved = draft_data.approved
        db.commit()
        db.refresh(draft)
        # print("draft approved")

    return drafts

# delete a draft
@router.delete("/delete_draft/{draf_id}")
def delete_draft(draf_id: int, db: db_dependency):
    draft = db.query(Draft).filter(Draft.id == draf_id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="Draft detail not found")
    db.delete(draft)
    db.commit()
    return draft