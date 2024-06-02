// models/FunFact.js
const mongoose = require('mongoose');

const funFactSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false // Açıklama isteğe bağlı olabilir.
    }
});

module.exports = mongoose.model('FunFact', funFactSchema);