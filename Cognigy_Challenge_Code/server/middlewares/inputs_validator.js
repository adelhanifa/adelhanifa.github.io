module.exports = (req, res, next) => {
  // change all types to Numbers
  console.log("🚀 ~ file: inputs_validator.js ~ line 4 ~ req.body", req.body);

  for (const key in req.body) {
    if (typeof req.body[key] !== "number") {
      req.body[key] = parseInt(req.body[key]);
    }
  }

  const { minLength, specialCharacters, numbers, passwords } = req.body;

  if (!minLength || !specialCharacters || !numbers || !passwords) {
    return res.status(400).send({ msg: "some of the inputs is undefined" });
  }
  if (
    Number.isNaN(minLength) ||
    Number.isNaN(specialCharacters) ||
    Number.isNaN(numbers) ||
    Number.isNaN(passwords)
  ) {
    return res.status(400).send({ msg: "some of the inputs is not a number" });
  }
  if (minLength < 8 || minLength > 99) {
    return res
      .status(400)
      .send({ msg: "minimum length should be between 8 and 99" });
  }
  if (specialCharacters < 0 || specialCharacters > 99) {
    return res
      .status(400)
      .send({ msg: "special characters should be between 8 and 99" });
  }
  if (numbers < 0 || numbers > 99) {
    return res.status(400).send({ msg: "numbers should be between 8 and 99" });
  }
  if (minLength < numbers + specialCharacters) {
    if (numbers + specialCharacters > 99) {
      return res
        .status(400)
        .send({
          msg:
            "number of special characters and numbers can not be more than 99",
        });
    }
    req.body.minLength = numbers + specialCharacters;
    console.log(
      "minimum length should be at least equal to number of special characters and numbers, so new minimum length is: ",
      numbers + specialCharacters
    );
  }
  if (passwords < 10 || passwords > 1000) {
    return res
      .status(400)
      .send({ msg: "passwords should be between 10 and 1000" });
  }
  next();
};
