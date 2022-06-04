from sqlalchemy.orm import Session

from .. import models, schemas


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
    project.description = patch_project.description
    if patch_project.title: 
        project.title = patch_project.title
    db.commit()
    db.refresh(project)
    return project

