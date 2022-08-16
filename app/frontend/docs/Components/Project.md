# Project

## Functionality

### Change project name
The user is able to change the name of a project.

***Clicking on the "change project name" button will trigger two events***
1. Change the title of the page immediately
2. Patch the project to change the name for the project in the database

***Error cases for the input***
1. "No whitespaces allowed" will be displayed and input is red when name is empty or only full of whitespaces.
2. "Name must be between 4 and 30 characters long" will be displayed and input is red when name has less than 4 or more than 30 characters.
3. "There is already a project with this name" will be displayed and input is red when name already exists in the user's project's database (database will be crawled for this comparison)

### Edit uploaded data
The user will be allowed to edit the uploaded data, but only if the status of the project is "Project created" or "Images uploaded" (For performance reasons). It should be possible to delete, upload new and add new images.  

***Clicking on the "upload" button should trigger two events:***
1. Change status of the project to "Images uploaded"
2. Patch the project database and update the images

***Possible validation error cases***
1. Uploaded size is too big
2. Images are too big
3. Not the right format

### Change model selection
The user can choose a model, but cant change the model, because the prediction is dependend on the "select" button. 
Dependend on the status of the project, the content of this field will change: 
- The status is "Project created" or "Images uploaded": The user can choose a model, just like in /createproject.
- The status is "Model chosen": The content will be the text "You have chosen the [modelname] model. You can not change the model of a project once it is chosen."

### Download report
The user can download a report of the project. 
This is only possible if all the steps before were successful. 
The user can download the report again and again. There are no download limits.
If no report was downloaded yet, there will be a "no, thanks" button.
Clicking on one of the (two possible) buttons triggers the forcing of the evaluation. The user will be directed to the /evaluation/[projectname] page.

### Evaluation
The user is forced to evaluate the project. 
This is only possible if all the steps before were successful.
The documentation of the evaluation page can be found on evaluation[dot]md.

## TODO
- Maybe it would be a good idea to add the possibility to delete the project here too (more intuitive for the user)
- Which file types are allowed for the image uploading?
- How big should an image be?
- How many images are possible to be uploaded at once, how many in general?
- What is the format of the report?