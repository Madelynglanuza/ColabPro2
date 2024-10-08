const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');

// Obtener miembros del equipo de un proyecto
router.get('/:projectId', async (req, res) => {
    try {
        const teamMembers = await TeamMember.getByProjectId(req.params.projectId);
        res.json(teamMembers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Agregar un miembro al equipo
router.post('/', async (req, res) => {
    const { project_id, user_id, role } = req.body;
    try {
        const newTeamMember = await TeamMember.addMember(project_id, user_id, role);
        res.status(201).json(newTeamMember);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;