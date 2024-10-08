const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Obtener notificaciones para un usuario
router.get('/:userId', async (req, res) => {
    try {
        const notifications = await Notification.getByUserId(req.params.userId);
        res.json(notifications);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear una nueva notificación
router.post('/', async (req, res) => {
    const { user_id, message } = req.body;
    try {
        const newNotification = await Notification.create(user_id, message);
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;