// Array of special characters to be included in password
const specialCharacters = ['@','%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];

// Array of numeric characters to be included in password
const numericCharacters = ['0','1','2','3','4','5','6','7','8','9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Array of uppercase characters to be included in password
const upperCasedCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

var debug = 0; // set positive to enable debug in console
var passwordLength = 0; // number of characters in password

// password options
var includeUppercase = false;
var includeLowercase = false;
var includeNumeric = false;
var includeSpecial = false;

// document elements
var cbUppercase = document.getElementById("cbUppercase");
var cbLowercase = document.getElementById("cbLowercase");
var cbNumeric = document.getElementById("cbNumeric");
var cbSpecial = document.getElementById("cbSpecial");
var srLength = document.getElementById("sliderRange");
var sliderText = document.getElementById("sliderText");
var sliderRange = document.getElementById("sliderRange");
var generateBtn = document.querySelector('#generate');
var passwordText = document.querySelector('#password');

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// Function to prompt user for password options
function getPasswordOptions() {

  // // prompt user for input
  // // this is only included because it was referenced in the task requirements
  // includeUppercase = confirm("Include upper case (Ok=YES,Cancel=NO) ?");
  // includeLowercase = confirm("Include lower case (Ok=YES,Cancel=NO) ?");
  // includeNumeric = confirm("Include numbers (Ok=YES,Cancel=NO) ?");
  // includeSpecial = confirm("Include special characters (Ok=YES,Cancel=NO) ?");
  // var len = prompt("Enter password length (10-64)");
  // passwordLength = parseInt(len);
  // if (passwordLength < 10) { passwordLength = 10; }
  // else if (passwordLength > 64) { passwordLength = 64; }
  
  // better is to use the HTML form though

  // read current state of password element checkboxes
  includeUppercase = cbUppercase.checked;
  includeLowercase = cbLowercase.checked;
  includeNumeric = cbNumeric.checked;
  includeSpecial = cbSpecial.checked;
  // read password length
  passwordLength = srLength.value;
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]; // return a random element from the whole array from 0 to (array.length - 1) (-1 due to Math.floor, random() will never return 1)
}

// Function to generate password with user input
function generatePassword() {

  var password = []; // array for password
  var all = []; // array for required character types

  // firstly, add one character from each of the required character types to guarantee we have at least one in the final password
  if (includeSpecial) {
    password.push(getRandom(specialCharacters)); // add random character of this character type to the password
    passwordLength--; // decrement length as we need one less character now
    all = all.concat(specialCharacters); // add this character type to the all array
  }
  if (includeNumeric) {
    password.push(getRandom(numericCharacters)); passwordLength--;
    all = all.concat(numericCharacters);
  }
  if (includeUppercase) {
    password.push(getRandom(upperCasedCharacters)); passwordLength--;
    all = all.concat(upperCasedCharacters);
  }
  if (includeLowercase) {
    password.push(getRandom(lowerCasedCharacters)); passwordLength--;
    all = all.concat(lowerCasedCharacters);
  }

  if (debug > 0) console.log("Initial Password : " + password);

  // shuffle all array here ?

  // then pick random characters from all, the composite array of required character types, at random for the rest of the password
  while(passwordLength--) {
    password.push(getRandom(all));
  }

  if (debug > 0) console.log("Total Password : " + password);

  // shuffle array using Durstenfeld shuffle, an optimised implementation of Fisher-Yates
  // this ensures that the single characters added at the start of the password don't remain in that position
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  if (debug > 0) console.log("Shuffled Password : " + password);

  password = password.join(""); // convert password from array to string without ',' separator
  
  if (debug > 0) console.log("Final Password : " + password);

  return password;
}

// Write password to the #password input
function writePassword() {
  getPasswordOptions(); // get user options - character types and length
  var password = generatePassword(); // generate random password
  passwordText.value = password; // update html field
}

function updateSliderTextFromSliderRange(val) {
  // update slider text input box with current value of slider range
  sliderText.value = val;
}

function updateSliderRangeFromSliderText(val) {
  // range limit input between 10 and 64 
  if (val < 10)  { val = 10; sliderText.value = val; }
  else if (val > 64) { val = 64; sliderText.value = val; }
  // update slider range with current value of slider text input box
  sliderRange.value = val;
}

// Enables 'Generate Password' button when one or more password element checkboxes is checked
// If no checkboxes are checked, the Generate Password button will be disabled
// from https://www.kodyaz.com/articles/javascript-enable-disable-button-by-values-of-checkboxes-checked.aspx
const cbListSeparator = ":";
var cbList = cbListSeparator + "cbLowercase" + cbListSeparator + "cbUppercase" + cbListSeparator + "cbSpecial" + cbListSeparator + "cbNumeric" + cbListSeparator ; // default to all checked
function enableDisableGenerateBtn(cb,id) {
    
  // if checkbox is checked add it to the list (it doesn't matter if it's already included)
  if (cb.checked == true) {
    cbList = cbList + id + cbListSeparator;
  }
  // if checkbox is unchecked remove it from the list
  else if (cb.checked == false) {
    var v;
    v = cbListSeparator + id + cbListSeparator;
    cbList = cbList.replace(v, cbListSeparator);
  }

  // if the list is empty (only contains separators) no checkboxes are checked so disable button
  if (cbList == cbListSeparator) {
    generateBtn.disabled = true; // disable is no checkboxes are checked
  }
  else {
    generateBtn.disabled = false;
  }

}