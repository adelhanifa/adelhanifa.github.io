const { generatePassword } = require("../helper/password_generator");

// get all passwords
exports.getPasswords = (req, res) => {
  // passwords is how many passwords need to generate
  const { passwords } = req.body;
  const passwordsArr = [];

  for (let index = 0; index < passwords; index++) {
    const password = generatePassword(req.body);
    passwordsArr.push(password);
  }

  res.status(200).send({ msg: "all passwords are generate", passwordsArr });
};
