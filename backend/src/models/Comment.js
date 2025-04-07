const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    postId: mongoose.Schema.Types.ObjectId,
    text: String,
    date: Date
});

module.exports = mongoose.model('Comment', commentSchema);