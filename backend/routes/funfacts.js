const express = require('express');
const router = express.Router();
const FunFact = require('../models/funfacts');

// Get all fun facts
router.get('/', async (req, res) => {
    try {
        const funFacts = await FunFact.find();
        res.json(funFacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one fun fact by ID
router.get('/:id', async (req, res) => {
    try {
        const funFact = await FunFact.findById(req.params.id);
        if (!funFact) {
            return res.status(404).json({ message: "Fun fact not found" });
        }
        res.json(funFact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new fun fact
router.post('/', async (req, res) => {
    const funFact = new FunFact({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newFunFact = await funFact.save();
        res.status(201).json(newFunFact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a fun fact
router.put('/:id', async (req, res) => {
    try {
        const updatedFunFact = await FunFact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFunFact) {
            return res.status(404).json({ message: "Fun fact not found" });
        }
        res.json(updatedFunFact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a fun fact
router.delete('/:id', async (req, res) => {
    try {
        const funFact = await FunFact.findByIdAndDelete(req.params.id);
        if (!funFact) {
            return res.status(404).json({ message: "Fun fact not found" });
        }
        res.json({ message: "Fun fact deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;