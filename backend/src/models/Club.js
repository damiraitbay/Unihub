const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: String,
    description: String,
    rating: Number
});

module.exports = mongoose.model('Club', clubSchema);