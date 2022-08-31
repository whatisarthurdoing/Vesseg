from fastapi import Depends, HTTPException, APIRouter

from sqlalchemy.orm import Session

from .. import schemas
from ..dependencies import get_db
from ..auth import create_token, get_current_active_user

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
    db_user = _cu.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return _cu.create_user(db=db, user=user)

   #return create_token(user)

@router.patch("/", response_model=schemas.User)
async def patch_user(
        patch_user: schemas.UserPatch, 
        current_user: schemas.User = Depends(get_current_active_user), 
        db: Session = Depends(get_db)
    ):
    if patch_user.username and _cu.get_user_by_username(db, patch_user.username):
        raise HTTPException(status_code=400, detail="Email already registered")
    if patch_user.email and _cu.get_user_by_email(db, patch_user.email):
        raise HTTPException(status_code=400, detail="Username already registered") 
    return _cu.patch_user(db=db, patch_user=patch_user, current_user=current_user)

    _

@router.delete("/")
async def delete_user(
        current_user: schemas.User = Depends(get_current_active_user), 
        db: Session = Depends(get_db),
    ):
    await _cu.delete_user(db=db, user=current_user)
    return {"Current user deleted"}






