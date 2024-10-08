const db = require('../db');

class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static async getAll() {
        const pool = await db.poolPromise;
        const result = await pool.request().query('SELECT * FROM users');
        return result.recordset;
    }

    static async create(username, email, password) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('username', db.sql.NVarChar, username)
            .input('email', db.sql.NVarChar, email)
            .input('password', db.sql.NVarChar, password)
            .query('INSERT INTO users (username, email, password) VALUES (@username, @email, @password)');
        return { username, email }; // Devuelve el nuevo usuario (sin la contraseña)
    }

    // Puedes agregar más métodos para actualizar y eliminar usuarios
}

module.exports = User;