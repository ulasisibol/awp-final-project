const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Projeleri Listele
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Proje Ekle
router.post('/projects', async (req, res) => {
    const project = new Project({
        imageLink: req.body.imageLink,
        cardTitle: req.body.cardTitle,
        projectName: req.body.projectName,
        description: req.body.description,
        liveLink: req.body.liveLink,
        githubLink: req.body.githubLink
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Proje Detayını Getir
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send({ message: "Project not found!" });
        }
        res.json(project);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Proje Güncelle
router.patch('/projects/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).send({ message: "Project not found!" });
        }
        res.json(updatedProject);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Proje Sil
router.delete('/projects/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).send({ message: "Project not found!" });
        }
        res.status(200).send({ message: "Project deleted successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;