# Main

The main page is splitted in two versions. 
Version one is only shown when the user is logged in. If the user clicks on "VESSEG" in the header, they will be redirected to the main page. In this case there is only the description of vesseg shown. 
Version two is splitted in two halfs. The left half consists of the vesseg description and the vesseg "logo". The right half consists of a form. 
The form is splitted in two parts again: registration (Sign Up) and login (Log in).

## Registration
To sign up a user has to fill out all fields of the form. These include a name, an e-mail, a password and a confirmation of the password.
By clicking on the "Sign Up" button all fields will be validated and if correct, the api request signs up the user. 
If the registration was successful, a dialog will be displayed to inform the user about the registration. To use vesseg, the user then needs to log in, by clicking on the "Have an Account already? Log in" link. 

## Log in
To log in the user only need their name and password. By clicking the link the sign up form, they will get to the log in form. If the log in is successful, the user will be redirected to the projects page. The documentation of that page can be found in project[dot]md.

### Validation
The following validation cases exist: 

1. The input doesnt have the correct length: "Name must be between 4 and 30 characters long" or "Password must be at least 8 characters long" will be shown as a helper text.
2. Input is empty: "No whitespaces allowed" will be shown as a helper text.
3. Email field is not in e-mail format: "Email is not in the right format" will be shown as a helper text.
4. Confirmation field - Input does not match password: "Confirm password doesn't match password" will be shown as a helper text. 