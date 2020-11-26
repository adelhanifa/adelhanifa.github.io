const express = require('express');
const router = express.Router();
const User = require('../models/user');


// Send list of teachers when ADMIN adding new class 
router.get('/selectOptions-teacher', (req, res) => {
    User.find({ userGroup: 'Teacher' }, (err, data) => {
        if (err) { console.log(err) }
        //console.log(data);
        res.json(data)
    })
})

// Send list of students when ADMIN adding new class 
router.get('/selectOptions-students', (req, res) => {
    User.find({ userGroup: 'Student' }, (err, data) => {
        if (err) { console.log(err) }
        //console.log(data);
        res.json(data);
    })
})

// Send user informaition when ADMIN need to edit it
router.get('/select-user-id', (req, res) => {
    let id = req.query.id;
    User.findById(id, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
})


module.exports = router;