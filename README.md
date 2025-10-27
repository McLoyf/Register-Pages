<h1>Register-Pages</h1>
<p>This is a simple website that uses HTML5 and CSS3 for the front-end and Java (using Spring Boot) for the back-end. The user's data will be put into a json file. The user can make an account, login and make a new password if they forgot their current password. </p>

<h2>Pages</h2>

<ul>
    <li>Signup Page
    <li>Login Page
    <li>Forgot Password Page
</ul>

<h2>Design</h2>

<h3>Signup Page Design</h3>

<p>This page will ask the user to fill out a form to make an account, they will be asked for their first name, last name, and email. Followed by what they want their username and password to be. This information will then be stored in a json file with Personally Indentifiable Information being encrypted using AES-256. The password will be hashed and salted using bcrypt. The salt will be 16 random bytes that will be converted to hexidecimal</p>

<p>The information stored in the json file will be the encrypted username, encrypted password, encrypted email, hashed and salted password as well as the salt for the user</p>

<h3>Login Page Design</h3>
<p>This will ask for their username and password to which the input will be encrypted to compare the values to the json file to see if their is a match. In the case that their isn't match you will tell the user "The username or password is incorrect". In the case that the user cannot input the correct password, there will be a "Forgot Password" link on the page which will lead the user to the Forgot Password Page</p>

<h3>Forgot Password Design</h3>
<p>This page will ask the user for their email. The input from user will be be compared to emails in the json file for a match, if there is a match then an email will be sent that has a 5-digit code. At the same time the page will change to prompt the user to enter the 5-digit code sent to them. If the user inputs the wrong code a message will appear tells the user that it's wrong and be told that the have 3 more attempts. If the user is unable to answer correctly within the given attempts the 5-digit code section will be removed and the user will be prompted to click a button to send another email with a new 5-digit code. When they succeed, they will be prompted to enter a new password. This will then update the json file accordingly, there will be a link at the bottom of the page to go to the login page so the user can now login using their new password.</p>