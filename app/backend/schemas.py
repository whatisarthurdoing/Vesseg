from typing import List, Union
from pydantic import BaseModel


## Projects

class ProjectBase(BaseModel):
    title: str
    description: Union[str, None] = None

class ProjectCreate(ProjectBase):
    owner_id: int 

class Project(ProjectBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class ProjectPatch(BaseModel):
    title: Union[str, None] = None
    description: Union[str, None] = None


## Users

class UserBase(BaseModel):
    username: str
     
class UserLogin(UserBase):
    password: str

class UserCreate(UserBase):
    password: str
    email: str

    class Config:
        orm_mode = True

class UserPatch(BaseModel):
    password: Union[str,  None] = None
    username: Union[str, None] = None
    email: Union[str, None] = None


class User(UserBase):
    id: int
    is_active: bool
    projects: List[Project] = []

    class Config:
        orm_mode = True


## Tokens

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None


