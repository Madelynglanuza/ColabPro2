// routes/projectRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    // Ruta para crear un nuevo proyecto
    router.post('/', async (req, res) => {
        const { title, description, owner_id } = req.body;

        try {
            const result = await pool.request()
                .input('title', sql.VarChar, title)
                .input('description', sql.VarChar, description)
                .input('owner_id', sql.VarChar, owner_id)
                .query('INSERT INTO Projects (title, description, owner_id) VALUES (@title, @description, @owner_id)');

            res.status(201).json({ message: 'Proyecto creado', projectId: result.rowsAffected });
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            res.status(500).json({ message: 'Error al crear el proyecto' });
        }
    });

    return router;
};