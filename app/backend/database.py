from venv import create
from sqlalchemy import create_engine
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .core.config import DBSettings


def get_db_engine(db_url: str) -> sqlalchemy.engine: 
    if "sqlite" in db_url:
        engine = create_engine(
            db_url, 
            connect_args={"check_same_thread": False}
        )
    else:
        engine = create_engine(
            db_url
        )
    return engine

engine = get_db_engine(DBSettings.SQLALCHEMY_DATABASE_URL)

# Each instance of the SessionLocal class will be a database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
