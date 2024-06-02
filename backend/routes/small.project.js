const express = require('express');
const router = express.Router();
const SmallProject = require('../models/small.project');

// Küçük projeleri listele
router.get('/smallProjects', async (req, res) => {
    try {
        const smallProjects = await SmallProject.find();
        res.json(smallProjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Küçük proje ekle
router.post('/smallProjects', async (req, res) => {
    const smallProject = new SmallProject({
        cardTitle: req.body.cardTitle,
        projectName: req.body.projectName,
        description: req.body.description,
        githubLink: req.body.githubLink
    });

    try {
        const newSmallProject = await smallProject.save();
        res.status(201).json(newSmallProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Küçük projeyi güncelle
router.patch('/smallProjects/:id', async (req, res) => {
    try {
        const updatedSmallProject = await SmallProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSmallProject) {
            return res.status(404).json({ message: "Small project not found" });
        }
        res.json(updatedSmallProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Küçük projeyi sil
router.delete('/smallProjects/:id', async (req, res) => {
    try {
        const deletedSmallProject = await SmallProject.findByIdAndDelete(req.params.id);
        if (!deletedSmallProject) {
            return res.status(404).json({ message: "Small project not found" });
        }
        res.status(200).json({ message: "Small project deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;