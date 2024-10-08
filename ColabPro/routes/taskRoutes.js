const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Obtener todas las tareas de un proyecto
router.get('/:projectId', async (req, res) => {
    try {
        const tasks = await Task.getByProjectId(req.params.projectId);
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const { project_id, title, description, assigned_to } = req.body;
    try {
        const newTask = await Task.create(project_id, title, description, assigned_to);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Otras rutas para actualizar y eliminar tareas...

module.exports = router;