# Evaluation
On the evaluation page the user can evaluate the prediction that the chosen model made. To do that they need to rate the prediction with a smily system from "Excellent" to "Very bad" in five steps. 

- It should not be possible to switch to the the next images without rating the current prediction
- It should always be possible to switch to images that were rated already
- If all Images were rated, replace the content of the image with two buttons: "Go back to rating" and "Complete rating"
- "Go back to rating" button will redirect the user to the first image that was rated
- "Complete rating" button will add the text "Thank you for rating the images" under the two buttons


## TODO

- Fix carousel
   -  Two images per slide should be displayed. The left is the original image and the right the predicted. 
   -  The two arrows should be on the outside of the images
   -  Frame the whole carousel in a paper div
- If the user clicks the Evaluation button in /createproject or /project/[id]/[name] they should redirect to /evaluate/[id]/[name]
- Place the Rating with the text in the center of the page
- Coupel the text to the single smilies as following: 
  - Dark red: Very Bad
  - Red: Bad
  - Orange: Satisfying
  - Yellow: Good
  - Green: Excellent
- Add the above succession