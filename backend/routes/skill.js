const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

// Get all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one skill
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json(skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new skill
router.post('/', async (req, res) => {
    const skill = new Skill({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a skill
router.put('/:id', async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
        res.json(updatedSkill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a skill
router.delete('/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json({ message: 'Deleted Skill' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;