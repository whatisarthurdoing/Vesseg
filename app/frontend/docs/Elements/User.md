# User


## Create

A user is created by signing up a user in the sign up form. The name and email have to be unique. 
Only when the user is logged in a token is created for a short time. To log out, a user has to click on the "Log out" link in the settings page. The token will then be set to NULL.

## Modify
The settings page can be used to modify different data of the user. The following data can be modified through the front end: 
1. The name of the user
2. The email of the user
3. The password of the user

Changing the data of the user will lead to an automatic log out. The users are informed about that process on the settings page.

## Delete
To delete a user, the user has to go to the settings page as well and click on "delete profile". This step is permanent and all projects plus data will be deleted permanently. To prevent that a user clicks the link by accident, a dialog field will pop up and the user has to confirm the process. After that the process of deleting one's profile is completed.