# Create project

This page can only be reached if logged in.
The user gets here by using the url /createProject or by clicking the "create project" button on the projects page.

The page uses a stepper to display the different stages in the process of creating a new project.

## Functionality

### Step 1 - Create Project
By typing in a name for a new project and clicking on the "create" button, the user creates a new project with the typed in name. 
A project name can not have whitespaces, needs to be between 4 and 30 characters long and can not already exist in the list of the users already existing projects.

**Input errors**

- If input only consists whitespaces -> Field becomes red and helptext "No whitespaces allowed" is displayed
- If size of input is larger than 30 or fewer than 4 characters long -> Field becomes red and helptext "Name must be between 4 and 30 characters long" is displayed
- If input matches a projects name that already exists -> Field becomes red and helptext "There is already a project with this name" is displayed

**Clicking on the "create" button whould trigger two events:**
1. Change the pages title from "Project" to "[name]"
2. get to the next step


### Step 2 - Upload Data
The user needs to click in the box to upload their images. Nothing is specified here. The click opens the users last opened pc folder automatically.
The "back" button takes the user back to step one but we forbid to change the name of the freshly created project, so an other step one content is displayed: Just plain text that explains the user how to change a created project's name and a "next" button to get back to the second step.

The uploaded images should be displayed inside the box (specify a number here). When the process of uploading images is finalised the "upload" button is clickable. The loading process will be accompanied by a loading bar.

**Clicking on the "upload" button should trigger three events:**
1. Get to the next step
2. Patch the projects status to "Images uploaded"
3. Save image data to the database

### Step 3 - Choose a model
The user can decide between two models: Fast ai and nunet. To do that the user clicks one of the two buttons and then clicks the "choose" button. The two model buttons change color depending on which one is active. The active button has a dark background color and white font. The inactive one a white background color and dark font.

If the user clicks on the "back" button to change the uploaded data, the same content of the second step will be displayed. There is no need to change that. The user should be able to upload new images, delete uploaded images, 

**Clicking on the "choose" button should trigger three events:**
1. Get to the next step
2. Patch the projects status to "Model choosen"
3. Save chosen model to the database

### Step 4 - Download Report
The user can download a report with the key data of the analysis.
To do that the user can choose between the two buttons "Yes, send me the report" and "No thanks, I'm good". The styling is the same as the model buttons in step 3.

If the user clicks on the "back" button the content of the third step will change. Users should not be able to change the model again in the process of initialising the project, because the "choose" button in step 3 will trigger the prediction. Changing the prediction will lead to more data saved in our database that will not be accessed later. Instead the content will be replaced with a simple text, explaining that the user can change the model choosing for a project by clicking on that project in the projects table.

*** Clicking on the "send" button should trigger three events:***
1. Get to the next step
2. Patch the projects status to "report downloaded" or "report not downloaded" dependend on what the user chose
3. Send inquired report to e-Mail of user


### Step 5 - Evaluation
The user needs to evaluate a project. The evaluation button will redirect the user to the url /evaluation/[projectname]. The evaluation page will be documented under evaluation[dot]md.

## TODO

- Specify which data types are allowed to upload
- Specify how many images can be uploaded at once
- API's to CRUD images
- The whole Upload handling in the front end (including file validation)
- A design for how uploaded images will be displayed in this step
- Database for images + scheme
- Where will the model choosing be displayed in the database?
- What data will be downloaded?
- Should the report be downloaded or send per e-mail?
- Should a user later be able to download a report of a chosen model where they clicked "No thanks, I'm good" first?
- Force a user to evaluate a project
- Combine the navigation of the evaluation button to the new url