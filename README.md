# Module 5 Challenge: Password Generator

## Title

Simple web page that produces a random password using Javascript based on user criteria specifying content and length.

## User Story

AS a DEVELOPER<br>
I WANT to write code that will generate a random password based on a range of user selected criteria<br>
SO THAT I can provide the user with a secure password<br>

## Acceptance Criteria

IT IS DONE when 

  * The user is presented with a series of prompts for password criteria
    * Length of password
      * At least 10 characters but no more than 64.
    * Character types
      * Lowercase
      * Uppercase
      * Numeric
      * Special characters ($@%&*, etc)
  * Code validates each input and at least one character type should be selected before the button is enabled
  * A random password is generated when the button is clicked
  * The password is written to the page

## Tasks Completed

* Implemented the required solution in Javascript
* Divided implementation into multiple functions
* Enable / Disable Generate button based on selection of criteria
* Shuffles password using Durstenfield shuffle (Fisher-Yates algorithm)

## Challenges / Things I learnt

* How to query HTML elements using getElementById and querySelector
* Invoking JS method from HTML onclick="enableDisableGenerateBtn(this,id)
* Attaching JS method to document event generateBtn.addEventListener('click', writePassword);
* Combining arrays using concat
* Shuffling arrays using the Fisher-Yates algorithm
* Variable scoping
* Const

## Website image

![Website image](https://user-images.githubusercontent.com/1043077/200688107-9c1823ab-58f7-4bcb-81f2-9976401c7014.png)

## Technologies Used

- HTML
- Javascript

## Links

* [Link to the deployed website](https://jonharrison.github.io/password-generator/)
* [Link to the code repository](https://github.com/JonHarrison/password-generator)

## Contact

If you have any questions, please contact me at :

* GitHub profile : [JonHarrison](https://github.com/JonHarrison)
* Email : [******]()
* LinkedIn : [******]()
