const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    subject: String,
    teacher: String,
    date: Date,
    time: String,
    room: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);