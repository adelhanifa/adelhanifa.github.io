const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    done: {type: Boolean, default: false},
    priority: {type: Boolean, default: false}
});

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;