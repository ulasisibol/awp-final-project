const express = require('express');
const router = express.Router();
const Title = require('../models/Title');

// Başlıkları getirme
router.get('/titles', async (req, res) => {
    try {
        const titles = await Title.find();
        res.json(titles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Başlık güncelleme
router.put('/titles/:id', async (req, res) => {
    try {
        const updatedTitle = await Title.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );
        res.json(updatedTitle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;