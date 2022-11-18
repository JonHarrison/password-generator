// Array of special characters to be included in password
const specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

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
  return arr[Math.floor(Math.random() * arr.length)]; // return a random element of the array from 0 to (array.length - 1) due to Math.floor
}

// Function to generate password with user input
function generatePassword() {

  var password = []; // array for password
  var all = []; // array for required password elements

  // firstly, add one character from each of the required elements to ensure we have at least one in the final password
  if (includeSpecial) {
    password.push(getRandom(specialCharacters)); // add random character of this element to the password
    passwordLength--; // decrement length as we need one less character now
    all = all.concat(specialCharacters); // add this element to the all array
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

  // then pick random characters from all, the composite array of required elements, at random for the rest of the password
  while(passwordLength--) {
    password.push(getRandom(all));
  }

  if (debug > 0) console.log("Total Password : " + password);

  // shuffle array using Durstenfeld shuffle, an optimised implementation of Fisher-Yates
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  if (debug > 0) console.log("Shuffled Password : " + password);

  password = password.join(""); // password array without , separator so console.log as a string

  if (debug > 0) console.log("Final Password : " + password);

  return password;
}

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  var password = generatePassword();
  passwordText.value = password;
}

function updateSliderTextFromSliderRange(val) {
  // update slider text with current value of slider range
  sliderText.value = val;
}

function updateSliderRangeFromSliderText(val) {
  // range limit input between 10 and 64 
  if (val < 10)  { val = 10; sliderText.value = val; }
  else if (val > 64) { val = 64; sliderText.value = val; }
  // update slider range with current value of slider text
  sliderRange.value = val;
}

// Enables Generate Password button when one or more password element checkboxes is checked
// If no checkboxes are checked, the Generate Password button will be disabled
// from https://www.kodyaz.com/articles/javascript-enable-disable-button-by-values-of-checkboxes-checked.aspx
function enableDisableGenerateBtn(cb,id) {
  
  const cbListSeparator = ":";
  var cbList = cbListSeparator + "cbLowercase" + cbListSeparator + "cbUppercase" + cbListSeparator + "cbSpecial" + cbListSeparator + "cbNumeric" + cbListSeparator ; // default to all checked

  if (cb.checked == true) {
    cbList = cbList + id + cbListSeparator;
  }
  else if (cb.checked == false) {
    var v;
    v = cbListSeparator + id + cbListSeparator;
    cbList = cbList.replace(v, cbListSeparator);
  }

  if (cbList == cbListSeparator) {
    generateBtn.disabled = true; // disable is no checkboxes are checked
  }
  else {
    generateBtn.disabled = false;
  }

}