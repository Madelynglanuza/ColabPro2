const express = require('express');
const router = express.Router();
const File = require('../models/File');

// Obtener archivos de un proyecto
router.get('/:projectId', async (req, res) => {
    try {
        const files = await File.getByProjectId(req.params.projectId);
        res.json(files);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Subir un nuevo archivo
router.post('/', async (req, res) => {
    const { project_id, user_id, file_name, file_path } = req.body;
    try {
        const newFile = await File.create(project_id, user_id, file_name, file_path);
        res.status(201).json(newFile);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;