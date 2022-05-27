from typing import Optional
from pendulum import date, datetime

from pydantic import BaseModel


class ProjectBase(BaseModel):
    status: Optional[str] = "Project created"

class ProjectCreate(ProjectBase):
    title: str

# Reading Project
class Project(ProjectBase):
    id: int
    owner_id: int
    title: str

    # Tell model to read data even if it is not a dict but an ORM model
    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    email: str


class UserCreate(UserBase):
    password: str

# Reading User
class User(UserBase):
    id: int
    is_active: bool
    projects: list[Project] = []

    class Config:
        orm_mode = True

# TODO: Add Images schemas