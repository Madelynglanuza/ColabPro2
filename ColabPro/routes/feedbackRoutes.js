const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Obtener feedback de un proyecto
router.get('/:projectId', async (req, res) => {
    try {
        const feedback = await Feedback.getByProjectId(req.params.projectId);
        res.json(feedback);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Dejar feedback para un proyecto
router.post('/', async (req, res) => {
    const { project_id, user_id, rating, comments } = req.body;
    try {
        const newFeedback = await Feedback.create(project_id, user_id, rating, comments);
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;