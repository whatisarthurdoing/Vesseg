from unicodedata import name
from flask_sqlalchemy import models_committed
from sqlalchemy.orm import Session

import models, schemas
from core.hashing import Hasher




# User
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, hashed_password=Hasher.get_password_hash(user.password), name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user: schemas.User):
    db_user = user
    users_projects = get_projects_of_user(db = db, user_id=user.id)
    if users_projects is not None: 
        #Delete all projects of user first
        for p in users_projects:
            delete_project(db=db, project=p)
    db.delete(db_user)
    db.commit()
    return db_user


def update_user_name(db: Session, user_id: int, new_name: str):
    db_user = get_user(db=db, user_id=user_id)
    db_user.name = new_name
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_email(db: Session, user_id: int, new_email: str): 
    db_user = get_user(db=db, user_id=user_id)
    db_user.email = new_email
    db.commit()
    db.refresh(db_user)
    return db_user



# Project

def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first() 


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Project).offset(skip).limit(limit).all()


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
