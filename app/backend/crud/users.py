
from requests import patch
from sqlalchemy.orm import Session

from .. import models, schemas
from ..core.hashing import Hasher


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        email=user.email, 
        hashed_password=Hasher.get_password_hash(user.password),
        username=user.username
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user: schemas.User):
    db_user = get_user_by_username(db, user.username)
    db.delete(db_user)
    db.commit()
    return db_user

def patch_user(
        db: Session,
        patch_user: schemas.UserPatch, 
        current_user: schemas.User,
    ) -> models.User :
    db_user = get_user(db=db, user_id=current_user.id)
    
    if patch_user.username:
        db_user.username = patch_user.username
    if patch_user.email:
        db_user.email = patch_user.email
    if patch_user.password: 
        db_user.hashed_password = Hasher.get_password_hash(patch_user.password)
    
    db.commit()
    db.refresh(db_user)
    return db_user
    
