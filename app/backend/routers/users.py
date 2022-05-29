from fastapi import Depends, HTTPException, APIRouter

from sqlalchemy.orm import Session

from .. import schemas
from ..dependencies import get_db
from ..auth import get_current_active_user

from ..crud import users as _cu


router = APIRouter(
    prefix='/users',
    tags = ["User"],
)

@router.get("/me", response_model=schemas.User)
def read_user_me(current_user: schemas.User = Depends(get_current_active_user)):
    return current_user

@router.post("/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = _cu.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return _cu.create_user(db=db, user=user)

@router.delete("/")
async def delete_user(
        current_user: schemas.User = Depends(get_current_active_user), 
        db: Session = Depends(get_db),
    ):
    await _cu.delete_user(db=db, user=current_user)
    return {"Current user deleted"}






