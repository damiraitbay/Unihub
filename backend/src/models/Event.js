const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
    description: String,
    price: Number,
    location: String
});

module.exports = mongoose.model('Event', eventSchema);