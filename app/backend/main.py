from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import desc
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

import crud, models, schemas
from core.config import settings

models.Base.metadata.create_all(bind=engine)

SECRET_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

app = FastAPI(
    title=settings.PROJECT_NAME, 
    version=settings.PROJECT_VERSION,
    description=settings.PROJECT_DESCRIPTION, 
    openapi_tags=settings.PROJECT_TAGS
)

origins = {
    "http://localhost:3000"
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/login")
def user_login(user: schemas.UserCreate):
    user_login(user = user)


@app.post("/users/", response_model=schemas.User, tags=["User"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User], tags=["User"])
def read_users(db: Session = Depends(get_db)):
    db_users = crud.get_users(db)
    return db_users


@app.delete("/users/", response_model=schemas.User, tags=["User"])
def delete_user(user_id: int, db: Session = Depends(get_db)): 
    db_user = crud.get_user(db=db, user_id=user_id)
    if not db_user: 
        raise HTTPException(status_code = 404, detail = "User not found")
    crud.delete_user(db, user = db_user)



@app.get("/users/{user_id}", response_model=schemas.User, tags=["User"])
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.patch("/users/{user_id}/name", response_model=schemas.User, tags=["User"])
def update_user_name(user_id: int, new_name:str, db: Session = Depends(get_db)): 
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None: 
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user_name(user_id=user_id, db=db, new_name=new_name)


@app.patch("/users/{user_id}/email", response_model=schemas.User, tags=["User"])
def update_user_email(user_id: int, new_email:str, db: Session = Depends(get_db)): 
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None: 
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user_email(user_id=user_id, db=db, new_email=new_email)


@app.post("/users/{user_id}/projects/", response_model=schemas.Project, tags=["Project"])
def create_project(user_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db=db, project=project, user_id=user_id)


@app.get("/users/{user_id}/projects/", response_model=list[schemas.Project], tags=["Project"])
def read_projects_of_user(user_id: int, db: Session = Depends(get_db)): 
    return crud.get_projects_of_user( db=db, user_id = user_id)



@app.get("/project/", response_model=schemas.Project, tags=["Project"])
def read_project(project_id: int, db: Session = Depends(get_db)): 
    return crud.get_project(db=db, project_id=project_id)


@app.patch("/projects/{project_id}/status", response_model = schemas.Project, tags=["Project"])
def update_project_status(project_id: int, new_status: str,  db: Session = Depends(get_db)): 
    project = crud.get_project(db=db, project_id=project_id)
    if project is None: 
        raise HTTPException(status_code= 404, detail= "Project not found")
    return crud.update_project_status(db = db, project_id=project_id, new_status=new_status)



@app.patch("/projects/{project_id}/title", response_model = schemas.Project, tags=["Project"])
def update_project_title(project_id: int, new_title: str,  db: Session = Depends(get_db)): 
    project = crud.get_project(db=db, project_id=project_id)
    if project is None: 
        raise HTTPException(status_code= 404, detail= "Project not found")
    return crud.update_project_title(db = db, project_id=project_id, new_title=new_title)



@app.delete("/users/{user_id}/projects/delete", response_model=list[schemas.Project], tags=["Project"])
def delete_project(project_id: int, db: Session = Depends(get_db)): 
    project = crud.get_project(db = db, project_id=project_id)
    if not project: 
        raise HTTPException(status_code = 404, detail = "Project not found")
    crud.delete_project(db, project = project)
