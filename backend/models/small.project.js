const mongoose = require('mongoose');

const smallProjectSchema = new mongoose.Schema({
    cardTitle: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    githubLink: {
        type: String,
        required: false  // Bu alan isteğe bağlı
    }
}, {
    timestamps: true  // createdAt ve updatedAt alanları otomatik olarak yönetilir
});

const SmallProject = mongoose.model('SmallProject', smallProjectSchema);

module.exports = SmallProject;