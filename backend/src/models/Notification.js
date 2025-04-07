const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    text: String,
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);