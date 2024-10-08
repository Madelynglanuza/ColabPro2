const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent');

// Obtener eventos del calendario de un proyecto
router.get('/:projectId', async (req, res) => {
    try {
        const calendarEvents = await CalendarEvent.getByProjectId(req.params.projectId);
        res.json(calendarEvents);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear un nuevo evento en el calendario
router.post('/', async (req, res) => {
    const { project_id, title, start_time, end_time, description } = req.body;
    try {
        const newCalendarEvent = await CalendarEvent.create(project_id, title, start_time, end_time, description);
        res.status(201).json(newCalendarEvent);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;