# Header 

## Content
On the left side is the Vesseg Logo (only the name displayed). Clicking on it will redirect the user to the main page. If the user is logged in this will be just plain text. If the user is not logged in, clicking on it will redirect the user to the registration page. 
Holding a button in the header changes the color to a dark pink.

On the right side of the header are five buttons. From left to right: 
1. Projects button: Redirects the user to the projects table page
2. Tasks button: Clicking on it opens a full screen dialog where the user can see the current loading state of the tasks they triggered.
3. About button: Redirects the user to the about page, where they can find out more about vesseg. 
4. FAQ button: Redirects the user to the FAQ page where they can found answers to the most common questions.
5. A settings Icon: This button will redirect the user to the settings page. The content of the setting page is documented in settings[.]md

## Task button

The task button will open a full screen dialog where the user can see the current loading state of the tasks they triggered.
Each column has the following content: 
1. The title of the task
2. snds
3. A loading bar that indicates how far the task has come
4. A delete icon to abort the task

## TODOS
- Decide if tasks should load parallel or once at a time
- Add percentages to the loading bar: https://mui.com/material-ui/react-progress/#main-content
- Make the dialog scrollable: https://mui.com/material-ui/react-dialog/ 
- Decide how many tasks can be displayed at once