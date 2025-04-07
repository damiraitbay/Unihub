const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    clubId: mongoose.Schema.Types.ObjectId,
    content: String,
    date: Date,
    likes: Number,
    comments: [String]
});

module.exports = mongoose.model('Post', postSchema);