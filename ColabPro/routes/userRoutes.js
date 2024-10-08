// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const sql = require('mssql'); // Asegúrate de que esto esté importado
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO Users (username, password) VALUES (@username, @password)');

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Obtener el usuario de la base de datos
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        const user = result.recordset[0];

        if (user && await bcrypt.compare(password, user.password)) {
            // Aquí puedes generar un token JWT si lo deseas
            res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user.id });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

module.exports = router;