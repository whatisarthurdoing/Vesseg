from datetime import datetime, timedelta
from fastapi import Depends

from jose import JWTError, jwt
from sqlalchemy.orm import Session

from . import schemas
from .dependencies import get_db, oauth2_scheme
from .core.exceptions import *
from .core.hashing import Hasher
from .core.config import AuthSettings
from .crud.users import get_user_by_username



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

def get_current_active_user(current_user: schemas.User):
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

def create_token(user: schemas.User):
    to_encode = {
        "sub": user.username,
        "exp": datetime.utcnow() + timedelta(minutes=AuthSettings.ACCESS_EXPIRE_MINUTES)
    }
    encoded_jwt = jwt.encode(
        to_encode, 
        AuthSettings.SECRET_KEY, 
        algorithm=AuthSettings.ALGORITHM
    )
    access_token = {
        "access_token": encoded_jwt,
        "token_type": "bearer"
    }
    return access_token

