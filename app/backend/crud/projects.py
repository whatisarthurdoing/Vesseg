from sqlalchemy.orm import Session

from .. import models, schemas
from ..crud import projects as _cp


def get_project(db: Session, project_id: int, owner_id: int):
    project = (
        db.query(models.Project)
        .filter(models.Project.owner_id == owner_id)
        .filter(models.Project.id == project_id)
        .first() 
    )
    return project

def get_projects(db: Session, owner_id: int):
    return db.query(models.Project).filter(models.Project.owner_id == owner_id).all()

def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(
        title=project.title, 
        description=project.description,
        owner_id=project.owner_id
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def patch_project(
        db: Session, 
        project: models.Project, 
        patch_project: schemas.ProjectPatch
    ) -> models.Project:
    if patch_project.title: 
        project.title = patch_project.title
    if patch_project.description: 
        project.description = patch_project.description
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project_id: int, user: schemas.User):
    db_project = get_project(db=db, project_id=project_id, owner_id=user.id)
    db.delete(db_project)
    db.commit()
    return db_project