const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.checkUserLogIN, userController.profilePage)// Show user profile page 
router.post('/save-changes', userController.editProfile)//edit user Profile

router.get('/teachers-list', userController.checkAdmin, userController.teachersList)// Show list of teachers page 
router.get('/students-list', userController.checkAdmin, userController.studentsList)// Show list of students page 
router.get('/classes-page', userController.checkAdmin, userController.classesList)// Show list of classes page 

router.post('/teacher-list-find', userController.checkAdmin, userController.teachersListFind)// find one from list of teachers page
router.post('/student-list-find', userController.checkAdmin, userController.studentsListFind)// find one from list of students page
router.get('/delete-user-by-admin/:id', userController.checkAdmin, userController.deleteUserByAdmin)// Delete user by ADMIN 
router.post('/edit-user-by-admin', userController.checkAdmin, userController.editUserByAdmin)// edit user by ADMIN 
router.get('/teacher-list-find', userController.checkAdmin, userController.teachersListAfterFind)// redirect to teachers list when the ADMIN edit or delete one of them
router.get('/student-list-find', userController.checkAdmin, userController.studentsListAfterFind)// redirect to students list when the ADMIN edit or delete one of them

router.post('/add-class', userController.checkAdmin, userController.addNewClass)// save new class in DB  by ADMIN
router.get('/class-page/:id', userController.checkAdmin, userController.takeClassIdToShow)// Show one class information page part /1/
router.get('/class-info', userController.checkAdmin, userController.showOneClassInfo)// Show one class information page part /2/
  

module.exports = router;