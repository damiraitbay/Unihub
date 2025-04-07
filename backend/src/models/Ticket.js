const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    eventId: mongoose.Schema.Types.ObjectId,
    qrCode: String,
    status: { type: String, default: 'unpaid' }
});

module.exports = mongoose.model('Ticket', ticketSchema);