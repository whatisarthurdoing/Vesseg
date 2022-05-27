from click import pass_context
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from app.backend.core.exceptions import INCORRECT_USERNAME_PASSWORD

from . import crud, models, schemas
from .core.config import ProjectSettings


crud.create_database()

app = FastAPI(
    title=ProjectSettings.PROJECT_NAME, 
    version=ProjectSettings.PROJECT_VERSION,
    description=ProjectSettings.PROJECT_DESCRIPTION, 
    openapi_tags=ProjectSettings.PROJECT_TAGS
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


## Token

@app.post("/login", response_model=schemas.Token)
def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(crud.get_db)
    ):
    login_user = schemas.UserLogin(
        username = form_data.username,
        password = form_data.password
    )
    db_user = crud.authenticate_user(db, login_user)
    if not db_user:
        raise INCORRECT_USERNAME_PASSWORD
    access_token = crud.create_token(db_user)
    return access_token 

@app.get("/users/me", response_model=schemas.User)
def read_user_me(current_user: schemas.User = Depends(crud.get_current_active_user)):
    return current_user


## Users 

@app.post("/users/", response_model=schemas.User, tags=["User"])
def create_user(user: schemas.UserCreate, db: Session = Depends(crud.get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


# @app.get("/users/", response_model=list[schemas.User], tags=["User"])
# def read_users(db: Session = Depends(get_db)):
#     db_users = crud.get_users(db)
#     return db_users


# @app.delete("/users/", response_model=schemas.User, tags=["User"])
# def delete_user(user_id: int, db: Session = Depends(get_db)): 
#     db_user = crud.get_user(db=db, user_id=user_id)
#     if not db_user: 
#         raise HTTPException(status_code = 404, detail = "User not found")
#     crud.delete_user(db, user = db_user)


# @app.get("/users/{user_id}", response_model=schemas.User, tags=["User"])
# def read_user(user_id: int, db: Session = Depends(get_db)):
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user


# @app.patch("/users/{user_id}/name", response_model=schemas.User, tags=["User"])
# def update_user_name(user_id: int, new_name:str, db: Session = Depends(get_db)): 
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None: 
#         raise HTTPException(status_code=404, detail="User not found")
#     return crud.update_user_name(user_id=user_id, db=db, new_name=new_name)


# @app.patch("/users/{user_id}/email", response_model=schemas.User, tags=["User"])
# def update_user_email(user_id: int, new_email:str, db: Session = Depends(get_db)): 
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None: 
#         raise HTTPException(status_code=404, detail="User not found")
#     return crud.update_user_email(user_id=user_id, db=db, new_email=new_email)


# @app.post("/users/{user_id}/projects/", response_model=schemas.Project, tags=["Project"])
# def create_project(user_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
#     return crud.create_project(db=db, project=project, user_id=user_id)


# @app.get("/users/{user_id}/projects/", response_model=list[schemas.Project], tags=["Project"])
# def read_projects_of_user(user_id: int, db: Session = Depends(get_db)): 
#     return crud.get_projects_of_user( db=db, user_id = user_id)



# @app.get("/project/", response_model=schemas.Project, tags=["Project"])
# def read_project(project_id: int, db: Session = Depends(get_db)): 
#     return crud.get_project(db=db, project_id=project_id)


# @app.patch("/projects/{project_id}/status", response_model = schemas.Project, tags=["Project"])
# def update_project_status(project_id: int, new_status: str,  db: Session = Depends(get_db)): 
#     project = crud.get_project(db=db, project_id=project_id)
#     if project is None: 
#         raise HTTPException(status_code= 404, detail= "Project not found")
#     return crud.update_project_status(db = db, project_id=project_id, new_status=new_status)



# @app.patch("/projects/{project_id}/title", response_model = schemas.Project, tags=["Project"])
# def update_project_title(project_id: int, new_title: str,  db: Session = Depends(get_db)): 
#     project = crud.get_project(db=db, project_id=project_id)
#     if project is None: 
#         raise HTTPException(status_code= 404, detail= "Project not found")
#     return crud.update_project_title(db = db, project_id=project_id, new_title=new_title)



# @app.delete("/users/{user_id}/projects/delete", response_model=list[schemas.Project], tags=["Project"])
# def delete_project(project_id: int, db: Session = Depends(get_db)): 
#     project = crud.get_project(db = db, project_id=project_id)
#     if not project: 
#         raise HTTPException(status_code = 404, detail = "Project not found")
#     crud.delete_project(db, project = project)
