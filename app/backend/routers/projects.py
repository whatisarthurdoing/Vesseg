from fastapi import Depends, HTTPException, APIRouter

from sqlalchemy.orm import Session

from .. import schemas
from ..dependencies import get_db
from ..auth import get_current_active_user
from ..crud import projects as _cp


router = APIRouter(
    prefix='/projects',
    tags = ["Project"],
)


@router.get("/", response_model=list[schemas.Project])
async def get_projects(
        db: Session = Depends(get_db),
        current_user: schemas.User = Depends(get_current_active_user)
    ):
    return _cp.get_projects(db, current_user.id) 

    
@router.get("/{project_id}", response_model=schemas.Project)
async def get_project(
        project_id: int, 
        db: Session = Depends(get_db),
        current_user: schemas.User = Depends(get_current_active_user)
    ):
    project = _cp.get_project(db, project_id, current_user.id)
    if not project:
        HTTPException(status_code=404, detail="Project does not exist")
    return project


@router.post("/", response_model=schemas.Project)
async def create_project(
        project: schemas.ProjectBase,
        db: Session = Depends(get_db),
        current_user: schemas.User = Depends(get_current_active_user),
    ):
    create_project = schemas.ProjectCreate(
        title=project.title,
        description=project.description,
        owner_id=current_user.id
    )
    return _cp.create_project(db, create_project)





