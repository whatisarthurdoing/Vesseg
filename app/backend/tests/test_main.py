from fastapi.testclient import TestClient
import pytest
from sqlalchemy.orm import sessionmaker

from ..database import Base, get_db_engine
from ..main import app
from ..core.config import DBSettings
from ..dependencies import get_db


client = TestClient(app)
engine = get_db_engine(DBSettings.SQLALCHEMY_TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


    
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_user(test_db):
    response = client.post(
        "/users/",
        json = {
            "email": "iam@vesseg.com", 
            "password": "vessels4life",
            "username": "thevessl0r"
            },
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["username"] == "thevessl0r"
    assert "id" in data






