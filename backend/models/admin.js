const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    homeTitle1: {
        type: String,
        required: true
    },
    currentlyWork: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Admin', AdminSchema);