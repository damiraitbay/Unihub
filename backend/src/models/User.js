const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Student', 'Admin'], default: 'Student' },
    interests: [String],
    followedClubs: [{ type: String, ref: 'Club' }],
});
module.exports = mongoose.model('User', UserSchema);