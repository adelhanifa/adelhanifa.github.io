const User = require('../models/user');
const Class = require('../models/class');
const jwt = require('jsonwebtoken');

// access Token Secret 
const accessTokenSecret = process.env.TOKEN_SECRET;

// show profile 
exports.profilePage = (req, res) => {
    User.findById(req.userId, (err, data) => {
        if (err) { console.log(err) }
        req.session.myPageTitle = data.userGroup + ' page - ' + data.firstName + ' ' + data.lastName;
        if (data.userGroup == "Admin") {
            console.log('*********************Admin user-page*********************');
            res.render('user', {
                pageTitle: req.session.myPageTitle,
                myUser: data,
                adminsButton: 'admin',
            });
        }
        else {
            console.log('*********************Teacher or Student user-page*********************');
            res.render('user', {
                pageTitle: req.session.myPageTitle,
                myUser: data,
            });
        }

    })
}

//edit Profile
exports.editProfile = (req, res) => {
    User.updateOne({ _id: req.body._id }, req.body, (err, data) => {
        if (err) { console.log(err) }
        res.redirect('/user/profile');
    })
}

//check if user loged in 
exports.checkUserLogIN = (req, res, next) => {
    let token = req.session.token
    if (token) {

        jwt.verify(token, accessTokenSecret, (err, payload) => {
            if (err) throw err.message;
            req.userId = payload.id;
            console.log('********************take user id from token to show profile*************')
            console.log({ user_id: req.userId })
        })
        next();
    }
    else {
        console.log('*********************no user is loged in redirect to log-in*********************');
        res.redirect('/log-in');
    }
}

// Show list of teachers page 
exports.teachersList = (req, res) => {
    User.find({ userGroup: 'Teacher' }, (err, data) => {
        if (err) { console.log(err); }
        // console.log(data);
        res.render('teachersList', {
            pageTitle: req.session.myPageTitle,
            dataUSERS: data
        });
    })
}

// Show list of students page 
exports.studentsList = (req, res) => {
    User.find({ userGroup: 'Student' }, (err, data) => {
        if (err) { console.log(err); }
        //console.log(data);
        res.render('studentsList', {
            pageTitle: req.session.myPageTitle,
            dataUSERS: data
        });
    })
}

// Show list of classes page 
exports.classesList = (req, res) => {
    Class.find((err, data) => {
        if (err) { console.log(err) }
        res.render('classes', { pageTitle: req.session.myPageTitle, clsses: data });
    })
}

//middleware check if ADMIN loged in
exports.checkAdmin = (req, res, next) => {
    jwt.verify(req.session.token, accessTokenSecret, (err, payload) => {
        if (err) throw err.message;
        req.userId = payload.id;
        console.log('********************take user id from token to check ADMIN*************')
        console.log({ user_id: req.userId })
    })
    User.findById(req.userId, (err, data) => {
        if (err) { console.log(err) }
        if (data.userGroup == "Admin") {
            next()
        }
        else {
            res.redirect('/user/profile');
        }
    })
}

// find one user from list of students page 
exports.studentsListFind = (req, res) => {
    let string = capitalizeFirstLetter(req.body.firstName); //ADEL  //adel  // aDEl
    console.log('*********************what to search student-list-find*********************');
    console.log(string);
    User.aggregate([
        {
            $match: {
                $and: [
                    { userGroup: 'Student' },
                    {
                        $or: [
                            { firstName: string },
                            { lastName: string }
                        ]
                    }
                ]
            }
        }
    ], (err, data) => {
        if (err) throw err;
        if (data.length == 0) {
            res.render('studentsList', {
                pageTitle: req.session.myPageTitle,
                dataUSERS: data,
                msg: 'Student not found or this is not a student'
            });
        }
        else {
            res.render('studentsList', {
                pageTitle: req.session.myPageTitle,
                dataUSERS: data
            });
        }
    })
}

// find one user from list of teatchers page 
exports.teachersListFind = (req, res) => {
    let string = capitalizeFirstLetter(req.body.firstName); //ADEL  //adel  // aDEl
    console.log('*********************what to search teacher-list-find*********************');
    console.log(string);
    User.aggregate([
        {
            $match: {
                $and: [
                    { userGroup: 'Teacher' },
                    {
                        $or: [
                            { firstName: string },
                            { lastName: string }
                        ]
                    }
                ]
            }
        }
    ], (err, data) => {
        if (err) throw err;
        if (data.length == 0) {
            res.render('teachersList', {
                pageTitle: req.session.myPageTitle,
                dataUSERS: data,
                msg: 'Teacher not found or this is not a student'
            });
        }
        else {
            res.render('teachersList', {
                pageTitle: req.session.myPageTitle,
                dataUSERS: data
            });
        }
    })
}

// make just the first char capital 
function capitalizeFirstLetter(x) {
    x = x.toLowerCase(); //adel
    return x.charAt(0).toUpperCase() + x.slice(1);//Adel
}

// Delete user by ADMIN 
exports.deleteUserByAdmin = (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err, result) => {
        res.redirect('back');
    })
}

// Edit user by ADMIN 
exports.editUserByAdmin = (req, res) => {
    User.updateOne({ _id: req.body._id }, req.body, (err, data) => {
        if (err) { console.log(err); }
        res.redirect('back');
    })
}

// redirect to teachers list when the ADMIN edit or delete one of them
exports.teachersListAfterFind = (req, res) => {
    res.redirect('/user/teachers-list')
}

// redirect to students list when the ADMIN edit or delete one of them
exports.studentsListAfterFind = (req, res) => {
    res.redirect('/user/students-list')
}

// Show one class information page 
let classID = '';
exports.takeClassIdToShow = (req, res) => {
    classID = req.params.id;
    res.redirect('/user/class-info')
}
exports.showOneClassInfo = (req, res) => {
    Class.findById(classID, (err, data) => {
        if (err) throw err;
        console.log('*********************find a class in class-info*********************');
        // console.log(data);
        res.render('classInfo', {
            pageTitle: req.session.myPageTitle,
            class: data,
        });
    }).populate('teacher').populate('students')
}

// Get add class data and save new class in DB 
exports.addNewClass = (req, res) => {
    console.log('*********************check inputs for add-class*********************');
    console.log(req.body);
    let newClass = new Class(req.body);
    newClass.save(() => {
        console.log('Data is saved......')
        res.redirect('/user/classes-page');
    });
}