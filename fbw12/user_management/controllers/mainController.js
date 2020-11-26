const fs = require('fs');
const mustache = require('mustache');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.EmailAPI);

// access Token Secret 
const accessTokenSecret = process.env.TOKEN_SECRET;


// Run Home page 
exports.homePage = (req, res) => {
    let msg;
    if (!req.session.viewCount) {
        req.session.viewCount = 1;
        msg = 'Welcome to this page for the first time!';
    }
    else {
        req.session.viewCount += 1;
        msg = 'you visited this page ' + req.session.viewCount + ' times';
    }
    console.log('*********************home page test*********************');
    console.log(req.session, msg);
    res.render('index', { pageTitle: 'Home Page', count: msg });
}

// Run about-us page 
exports.aboutUs = (req, res) => {
    res.render('about', { pageTitle: 'About us' });
}

// Run our-courses page 
exports.ourCourses = (req, res) => {
    res.render('courses', { pageTitle: 'Courses Page' });
}

// Run contact-us page 
exports.contactUs = (req, res) => {
    res.render('contact', { pageTitle: 'Contact Us' });
}

// Send Email Contact form
exports.contactSendEmail = (req, res) => {
    let date = new Date()
    req.body.dateFormat = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    console.log('*********************contactSendEmail*********************');
    console.log('data', req.body);

    var content = fs.readFileSync("emailForms/form.html", "utf-8");
    var view = { data: req.body };

    const msg = {
        to: 'adelhanifh@gmail.com',
        from: 'adelhanifh@gmail.com',
        subject: req.body.subject + ' | ' + req.body.name,
        html: mustache.render(content, view)
    }
    //console.log('msg', msg);
    sgMail.send(msg, (err, info) => {
        if (err) {
            // throw err
            console.log('Email not Sent')
            res.send('Email not Sent')
        } else {
            console.log('Your message has been sent. Thank you!')
            res.send('Your message has been sent. Thank you!')
        }
    })
}

// Run log-in page 
exports.logInPage = (req, res) => {
    res.render('login', {
        pageTitle: 'Log in page',
        msg: req.flash('MSGlogIn')
    });
}

// log out button 
exports.logOutPage = (req, res) => {
    //req.session.thisUser.destroy();
    delete req.session.token;
    delete req.session.myPageTitle;
    console.log('*********************check session after log-out*********************');
    console.log(req.session);
    res.redirect('/');
}

// Run sign-up page 
exports.signUpPage = (req, res) => {
    res.render('signup', { pageTitle: 'Sign up page' });
}

// wrong log in data
exports.wrongLogIN = (req, res) => {
    res.render('login', {
        pageTitle: 'Log in page',
        msg2: req.flash('MSGlogIn')
    });

}

//middleware find user to log in
exports.findUser = (req, res, next) => {
    console.log('*********************show info for log-in*********************');
    console.log(req.body);
    let userFound = false, userActive = false;
    User.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            throw err
        }
        else {
            if (data == null) {
                req.flash('MSGlogIn', 'The email or password do not match, please check your inputs again....!')
                next();
            }
            else {
                bcrypt.compare(req.body.password, data.password, function (err, result) {
                    if (result == true) {
                        if (data.activ) {
                            const payload = {
                                id: data._id
                            };
                            const token = jwt.sign(payload, accessTokenSecret, { expiresIn: '1h' });
                            req.session.token = token;
                            console.log('***************Set Token to log in******************')
                            console.log('token', { token });
                            res.redirect('/user/profile');
                        }
                        else {
                            req.flash('MSGlogIn', 'Please go to your email and confirm the registration')
                            res.redirect('/log-in');
                        }
                    }
                    else {
                        req.flash('MSGlogIn', 'Password is wrong! Please check the password again...!')
                        next();
                    }
                })
            }
        }
    })
}

// create user sign up
exports.createUser = (req, res) => {
    const file = req.file;
    console.log('*********************saved file informaition*********************');
    console.log(file);
    req.body.photo = 'uploads/' + file.filename;
    req.body.activ = false;
    // hash Pasword
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) throw err
        console.log('hash Pass:', hash)
        req.body.password = hash;

        console.log('*********************show inputs sign-up*********************');
        console.log(req.body);

        let newUser = new User(req.body);
        newUser.save((err, data) => {
            console.log('*********************Data is saved*********************')
            console.log('after save', data)
            //send Email
            let date = new Date()
            let dateFormat = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

            var content = fs.readFileSync("emailForms/confirm.html", "utf-8");
            var view = {
                data: {
                    id: ` http://localhost:5000/confirm/${data._id} `,
                    date: dateFormat
                }
            };

            const msg = {
                to: 'adelhanifh@gmail.com',
                from: 'adelhanifh@gmail.com',
                subject: data.firstName + ' ' + data.lastName + ' | confirm email address',
                html: mustache.render(content, view)
            }
            console.log('msg', msg);
            sgMail.send(msg, (err, info) => {
                // console.log(info);
                if (err) {
                    //throw err
                    console.log('Email not Sent')
                    res.send('Email not Sent, try again....!')
                } else {
                    console.log('Your message has been sent. Thank you!')
                    req.flash('MSGlogIn', 'Please go to your email and confirm the registration')
                    res.redirect('/log-in');
                }
            })

        });
    });
}

// Send Email reset password
exports.resetPassword = (req, res) => {
    let date = new Date()
    let dateFormat = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    console.log('*********************reset Password*********************');
    console.log('req.body', req.body);

    User.findOne({ email: req.body.email }, (err, data) => {
        if (data == null) {
            req.flash('MSGlogIn', 'No account matches this email: ' + req.body.email);
            res.redirect('/log-in');
        }
        else {
            let newPass = '1234'
            bcrypt.hash(newPass, 10, function (err, hash) {
                if (err) throw err
                console.log('new hash Pass:', hash)
                User.findOneAndUpdate({ email: req.body.email }, { password: hash }, (err, updatedata) => {
                    var content = fs.readFileSync("emailForms/reset.html", "utf-8");
                    var view = {
                        data: {
                            date: dateFormat,
                            email: data.email,
                            password: newPass,
                            firstName: data.firstName,
                            lastName: data.lastName
                        }
                    };

                    const msg = {
                        to: 'adelhanifh@gmail.com',
                        from: 'adelhanifh@gmail.com',
                        subject: 'Reset your Password | ' + data.firstName + ' ' + data.lastName,
                        html: mustache.render(content, view)
                    }
                    console.log('msg', msg);
                    sgMail.send(msg, (err, info) => {
                        // console.log(info);
                        if (err) {
                            //throw err
                            console.log('Email not Sent')
                        } else {
                            console.log('Your message has been sent. Thank you!')
                            req.flash('MSGlogIn', 'New Pasword has been sent to you ber Email');
                            res.redirect('/log-in');
                        }
                    })
                })
            })
        }
    })
}

// confirm email address
exports.confirmEmail = (req, res) => {
    User.updateOne({ _id: req.params.id }, { activ: true }, (err, data) => {
        if (err) { console.log(err) }
        req.flash('MSGlogIn', 'Your account is successfully activated. Log in now to go to your account');
        res.redirect('/log-in');
    })
}

exports.createUserLoop = (req, res) => {
    for (let i = 1; i < 21; i++) {
        let userObj = {
            firstName: 'Testuser' + i,
            lastName: 'Suser' + i,
            birthday: '1987-01-01',
            gender: 'Male',
            country: 'Testcountry',
            addressStreet: 'Teststreet',
            addressNr: 22 + i,
            addressPlz: 42789 + i,
            addressCity: 'Testcity',
            phoneNumber: '0123 456789',
            userGroup: 'Student',
            email: 'Testuser' + i + '@' + 'Suser' + i,
            password: '1234',
            photo: 'uploads/myfile-1606391456980.png',
            activ: true
        }
        // hash Pasword
        bcrypt.hash(userObj.password, 10, function (err, hash) {
            if (err) throw err
            console.log('hash Pass:', hash)
            userObj.password = hash;

            let newUser = new User(userObj);
            newUser.save((err, data) => {
                console.log('*********************Data is saved*********************')
                console.log('after save', data)
            });
        });
    }
}