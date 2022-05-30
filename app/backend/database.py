from venv import create
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import DBSettings


if "sqlite" in DBSettings.SQLALCHEMY_DATABASE_URL:
    engine = create_engine(
        DBSettings.SQLALCHEMY_DATABASE_URL, 
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(
        DBSettings.SQLALCHEMY_DATABASE_URL
    )

# Each instance of the SessionLocal class will be a database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
