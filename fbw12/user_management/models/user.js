const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    birthday: String,
    gender: String,
    country: String,
    addressStreet: String,
    addressNr: String,
    addressPlz: String,
    addressCity: String,
    phoneNumber: String,
    userGroup: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema)

module.exports = User;