from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from fastapi import Depends 
from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt

from app.backend import models, schemas
from app.backend.database import SessionLocal, engine

from .core.hashing import Hasher
from .core.config import AuthSettings
from .core.exceptions import * 


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

#  Dependency

def create_database():
    models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


## Token 

def create_token(user: schemas.User):
    to_encode = {
        "sub": user.username,
        "exp": datetime.utcnow() + timedelta(minutes=AuthSettings.ACCESS_EXPIRE_MINUTES)
    } 
    encoded_jwt = jwt.encode(
        to_encode,
        AuthSettings.SECRET_KEY,
        algorithm = AuthSettings.ALGORITHM
    )
    token = {
        "access_token": encoded_jwt,
        "token_type": "bearer"
    }
    return token


# User
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session):
    return db.query(models.User).all()

def get_current_user(
        db: Session = Depends(get_db),
        token: str = Depends(oauth2_scheme)
    ):
    try:
        payload = jwt.decode(
            token,
            AuthSettings.SECRET_KEY,
            algorithms=[AuthSettings.ALGORITHM]
        )
        username = payload.get("sub")
        if not username:
            raise CREDENTIAL_EXCEPTION
    except JWTError:
        raise CREDENTIAL_EXCEPTION
    db_user = get_user_by_username(db, username)
    if not db_user:
        raise CREDENTIAL_EXCEPTION
    return db_user

def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if not current_user.is_active:
        raise INACTIVE_USER
    return current_user

def authenticate_user(db: Session, user: schemas.UserLogin):
    db_user = get_user_by_username(db, user.username)
    if not db_user:
        return False
    hashed_password = db_user.hashed_password
    if not Hasher.verify_password(user.password, hashed_password):
        return False
    return db_user

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

def update_user_name(db: Session, user_id: int, new_name: str):
    db_user = get_user(db=db, user_id=user_id)
    db_user.name = new_name
    db.commit()
    db.refresh(db_user)
    return db_user


# Project

def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first() 

def get_projects(db: Session):
    return db.query(models.Project).all()

def create_project(db: Session, project: schemas.ProjectCreate, user_id: int):
    db_project = models.Project(status = project.status, title=project.title, owner_id=user_id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def get_projects_of_user(db: Session, user_id: int): 
    projects_of_user = db.query(models.Project).filter(models.Project.owner_id == user_id).all()
    return projects_of_user


def delete_project(db: Session, project: schemas.Project): 
    project = project
    db.delete(project)
    db.commit()
    return project


def update_project_status(db: Session, project_id: int, new_status: str):
    db_project = get_project(db = db, project_id=project_id)
    db_project.status = new_status
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project_title(db: Session, project_id: int, new_title: str):
    db_project = get_project(db = db, project_id=project_id)
    db_project.title = new_title
    db.commit()
    db.refresh(db_project)
    return db_project
