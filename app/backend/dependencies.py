from fastapi.security import OAuth2PasswordBearer

import models
from database import SessionLocal, engine


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_database():
    models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
