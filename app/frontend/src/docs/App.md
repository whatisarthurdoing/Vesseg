# App
The front end is seperated in three parts: 
- The header
- The "routes"
- The footer

All pages and components, that are not the header or the footer can be found in the routes div.

Depending on the login status of a user, the routing is slightly different. 
Is a user logged in all available pages will be shown and the user can be direct to each page by clicking on the event triggering button in header, footer and different pages. 
If the user is logged out, they can only reach the following pages: main, impressum and about. All other url's will direct the user to the main page.

## TODO
- Find a way to hide /project and /evaluation in both cases: user is logged in and user is logged out