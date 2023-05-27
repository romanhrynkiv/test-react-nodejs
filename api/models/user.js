const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    description: { type: String, required: true },
    avatar: { type: Object, default: null }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
