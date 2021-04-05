const router = require("express").Router();
const controller = require("../controllers/apiController");
const validator = require("../middlewares/inputs_validator");

router.post("/", validator, controller.getPasswords);

module.exports = router;
