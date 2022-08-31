# Vesseg
This is the update of the vesseg project

## 1. Activate virtual environment
In the projects directory:
`source venv/bin/activate`
## 2. Install the requirements
In the projects directory: 

`pip install -r requirements.txt`

## 3. Run FastApi
`cd app`
`uvicorn backend.main:app --reload`

### Interactive API Documentation
http://127.0.0.1:8000/docs

### Alternative interactive API Documentation
http://127.0.0.1:8000/redoc

## 4. Run React
In new terminal: 

`cd app/frontend`
`npm start`

