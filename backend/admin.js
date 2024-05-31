const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
});

const adminSchema = new Schema({
    homeTitle1: {
        type: String,
        required: true
    },
    currentlyWork: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { User, Admin };