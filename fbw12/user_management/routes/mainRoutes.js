const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// setup Multer
const path = require('path');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, res) { res(null, 'public/uploads') },
    filename: function (req, file, res) {
        res(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
});
var upload = multer({
    storage: storage
})

router.get('/', mainController.homePage);// Run Home page 
router.get('/about-us', mainController.aboutUs);// Run about-us page 
router.get('/our-courses', mainController.ourCourses);// Run our-courses page 
router.get('/contact-us', mainController.contactUs);// Run contact-us page
router.post('/contact/send-email', mainController.contactSendEmail);// send email

router.get('/log-in', mainController.logInPage)// Run log-in page 
router.get('/log-out', mainController.logOutPage)// log out button
router.get('/sign-up', mainController.signUpPage)// Run sign-up page
router.post('/log-in', mainController.findUser, mainController.wrongLogIN)// log in button
router.post('/sign-up', upload.single('myfile'), mainController.createUser)// sign up button
router.post('/reset-password',mainController.resetPassword)// reset user password
router.get('/confirm/:id', mainController.confirmEmail)// confirm email address
  

router.get('/addLoopUsers', mainController.createUserLoop)// sign up button

module.exports = router;