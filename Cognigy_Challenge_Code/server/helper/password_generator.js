// const with Ascii code characters.
// see pic ((ascii_table.png)) in sever's root folder
const allChars =
  getString(65, 90) + // ABCDEFGHIJKLMNOPQRSTUVWXYZ
  getString(97, 122); // abcdefghijklmnopqrstuvwxyz
const allNumbers = 
  getString(48, 57); // 0123456789
const allSpecialChars =
  getString(33, 47) + // !"#$%&'()*+,-./
  getString(58, 64) + // :;<=>?@
  getString(91, 96) + // [\]^_`
  getString(123, 126); // {|}~

function getString(from, to) {
  let str = "";
  for (let i = from; i <= to; i++) {
    str += String.fromCharCode(i);
  }
  return str;
}

const generatePassword = ({
  minLength = 8,
  specialCharacters = 0,
  numbers = 0,
}) => {
  let generateFrome = allChars;
  let password = "";

  if (specialCharacters > 0) {
    generateFrome += allSpecialChars;
  }

  if (numbers > 0) {
    generateFrome += allNumbers;
  }

  let numCount = 0,
      specialCount = 0;

  while (
    numCount < numbers ||
    specialCount < specialCharacters ||
    password.length < minLength
  ) {
    const generatedLetter =
      generateFrome[Math.floor(Math.random() * generateFrome.length)];

    if (allSpecialChars.includes(generatedLetter)) {
      specialCount++;
      if (specialCount == specialCharacters) {
        generateFrome = generateFrome.replace(allSpecialChars, "");
      }
    }

    if (allNumbers.includes(generatedLetter)) {
      numCount++;
      if (numCount == numbers) {
        generateFrome = generateFrome.replace(allNumbers, "");
      }
    }
    password += generatedLetter;

    //delete some letter from the string if it is more than 100 and we need more numbers and special characters
    if (password.length >= 100) {
      password = password.replace(/[a-zA-Z]/g, "");
    }
  }

  return password;
};

module.exports = { generatePassword };
