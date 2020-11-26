const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
    title: String,
    start: String,
    end: String,
    teacher: { type: Schema.Types.ObjectId, ref: 'User'},
    students: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

const Class = mongoose.model('Class', classSchema)

module.exports = Class;