Possible test cases:

Component renders without errors
Header should exist and has the expected content
User does not input into forms and tries to Submit (should fail and renders errors)
User inputs only a First Name and tries to Submit (should fail and renders errors)
User inputs only a Last Name and tries to Submit (should fail and renders errors)
User inputs only an Email and tries to Submit (should fail and renders errors)
User inputs only a Message and tries to Submit (should fail and renders errors)
User inputs First Name, Last Name, Email, and Message, and tries to Submit (should succeed and render all fields)
User inputs too few characters into the First Name fields (should render errors)
User inputs an invalid email address (should render errors)