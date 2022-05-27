class ProjectSettings: 
    PROJECT_NAME:str = "Vesseg"
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_DESCRIPTION: str =" This is vesseg, a tool to speed up atherosclerosis research.\
        It is being developed by the Computational Radiology Group at the German Cancer Research Center (DKFZ) in Heidelberg, Germany,\
        in collaboration with the Research Group for Perioperative Vascular Biology at the Clinic for \
        Anaesthesiology at the University Hospital Heidelberg and the Institute for Artificial Intelligence in Medicine (IKIM) at the University Hospital Essen.\
        Please direct questions and feedback at jacobmatthewmurray at gmail dot com. "
    PROJECT_TAGS: list = [
        {
            "name": "User",
            "description": "CRUD Operations for users"
        },
        {
            "name": "Project", 
            "description": "CRUD Operations for projects"
        }, 
        {
            "name": "Image", 
            "description": "CRUD Operations for images"
        }
    ]

class DBSettings:
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./database.db"


class AuthSettings:
    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    ACCESS_EXPIRE_MINUTES = 30





