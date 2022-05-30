from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from core.exceptions import INCORRECT_USERNAME_PASSWORD
import schemas, dependencies, auth 
from core.config import ProjectSettings
from routers import users, projects


dependencies.create_database()

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

app.include_router(users.router)
app.include_router(projects.router)


@app.get("/")
async def root():
    return "Welcome to Vesseg 2.0"

@app.post("/login", response_model=schemas.Token)
async def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(dependencies.get_db)
    ):
    login_user = schemas.UserLogin(
        username = form_data.username,
        password = form_data.password
    )
    db_user = auth.authenticate_user(db, login_user)
    if not db_user:
        raise INCORRECT_USERNAME_PASSWORD
    access_token = auth.create_token(db_user)
    return access_token 




