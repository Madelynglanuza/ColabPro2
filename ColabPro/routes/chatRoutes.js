const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// Obtener mensajes de chat de un proyecto
router.get('/:projectId', async (req, res) => {
    try {
        const messages = await ChatMessage.getByProjectId(req.params.projectId);
        res.json(messages);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Enviar un nuevo mensaje de chat
router.post('/', async (req, res) => {
    const { project_id, user_id, message } = req.body;
    try {
        const newMessage = await ChatMessage.create(project_id, user_id, message);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;