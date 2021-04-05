const { assert } = require("chai");
const { generatePassword } = require("../helper/password_generator");

describe("Password Genrator Test", () => {
  const para = {
    minLength: 8,
    specialCharacters: 4,
    numbers: 4,
  };

  //minLength
  it("Minimum length should be a number", () => {
    assert.typeOf(para.minLength, "number");
  });

  it("Minimum length should be between 8 and 99", () => {
    assert.isAtLeast(para.minLength, 8);
    assert.isAtMost(para.minLength, 99);
  });

  //specialCharacters
  it("Number of special characters should be a number", () => {
    assert.typeOf(para.specialCharacters, "number");
  });

  it("Number of special characters should be between 0 and 99", () => {
    assert.isAtLeast(para.specialCharacters, 0);
    assert.isAtMost(para.specialCharacters, 99);
  });

  //Numbers
  it("Number of numbers should be a number", () => {
    assert.typeOf(para.numbers, "number");
  });

  it("Number of numbers should be between 0 and 99", () => {
    assert.isAtLeast(para.numbers, 0);
    assert.isAtMost(para.numbers, 99);
  });

  //specialCharacters + numbers
  it("Minimum length should be at least equal to number of special characters and numbers", () => {
    assert.isAtLeast(para.minLength, para.specialCharacters + para.numbers);
  });

  // run the function
  const result = generatePassword(para);
  // console.log("🚀 ~ file: password_generator_test.js ~ line 49 ~ describe ~ result", result)

  // check the password
  it("Password should be a string", () => {
    assert.typeOf(result, "string");
  });

  it(`Password should be at least ${para.minLength} letters and not more than 99`, () => {
    assert.isAtLeast(result.length, para.minLength);
    assert.isAtMost(result.length, 99);
  });

  it(`Password should have ${para.numbers} Number not more not less`, () => {
    const onlyNum = result.replace(/\D/g, "");
    // console.log("🚀 ~ file: password_generator_test.js ~ line 63 ~ it ~ onlyNum", onlyNum)
    assert.equal(onlyNum.length, para.numbers);
  });

  it(`Password should have ${para.specialCharacters} special characters not more not less`, () => {
    const onlySpecialChars = result.replace(/[a-zA-Z0-9]/g, "");
    // console.log("🚀 ~ file: password_generator_test.js ~ line 69 ~ it ~ onlySpecialChars", onlySpecialChars)
    assert.equal(onlySpecialChars.length, para.specialCharacters);
  });
});
