# Settings

On the settings page the user can...
1. Change their username
2. Change their e-mail adress
3. Change their password
4. Delete their profile
5. Log Out

### Changing users data

Changing the username, e-mail or password will cause an automatical log out process. The user will be redirected to the main page to log in again with their (eventually) new profile data. 
All inputs are validated.
The following validation errors will occur under these circumstances:

1. If input only consists whitespaces -> Field becomes red and helptext "No whitespaces allowed" is displayed
2. If size of input is larger than 30 or fewer than 4 characters long -> Field becomes red and helptext "Name must be between 4 and 30 characters long" is displayed
3. If e-mail input is not e-mail format -> Field becomes red and helptext "Email is not in the right format" is displayed

### Delete profile and log out
Clicking on the "Delete profile" button will display a dialog, where the user can reconsider if they would like to delete their accouny permanently. Deleting their profile will also cause a permanent deletion of all data and all projects. This can not be undone. After the deletion is confirmed, the profile will be deleted out of the db and the user will be logged out + redirected to the main page.

If the user clicks on "log out", they will be logged out and redirected to the main page to (potentially) log in again.


TODO: 

- Changing the username to an already existing one wont cause a username change in the database but will log out the user. The user doesnt know that, so it should not be possible to change the username in that case. To fix that: 
  1. Compare the input with the database. If input is in usernames do not log out user
  2. The input field should become red
  3. The following helptext should be displayed: "This username is already used"
- Same as the first point with email input