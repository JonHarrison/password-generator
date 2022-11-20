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
* Enable / Disable 'Generate Password' button based on selection of one or more character type checkboxes
* Implementation guarantees password always contains at least one character of each selected character type 
* Shuffles password to randomise position of character types using Durstenfield shuffle (Fisher-Yates algorithm)
* The value of the length slider and text box are linked and range limited between 10 and 64

## Challenges / Things I learnt

* How to query HTML elements using getElementById and querySelector
* Invoking JS method from HTML onclick="enableDisableGenerateBtn(this,id)
* Attaching JS method to document event generateBtn.addEventListener('click', writePassword);
* Combining arrays using concat
* Shuffling arrays using the Fisher-Yates algorithm
* Variable scoping
* Use .join("") to convert array to string without the ',' separator
* Use const character arrays

## Website image

![Password Generator](https://user-images.githubusercontent.com/1043077/202894373-8adff79a-1cd3-4a48-8925-251de925f8f4.png)

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
