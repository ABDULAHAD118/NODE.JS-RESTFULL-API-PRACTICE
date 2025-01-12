const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String
    },
    job_title: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.model('users', userSchema);

module.exports = User;