class Settings: 
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
        }
    ]
settings = Settings()