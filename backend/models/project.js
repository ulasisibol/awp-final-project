// models/project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    imageLink: { type: String, required: true },
    cardTitle: { type: String, required: true },
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    liveLink: { type: String, default: '' },
    githubLink: { type: String, default: '' }
}, {
    timestamps: true  // Zaman damgalarını otomatik olarak ekler
});

module.exports = mongoose.model('Project', projectSchema);