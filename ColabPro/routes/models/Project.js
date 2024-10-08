const db = require('../db');

class Project {
    constructor(id, title, description, owner_id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.owner_id = owner_id;
    }

    static async getAll() {
        const pool = await db.poolPromise;
        const result = await pool.request().query('SELECT * FROM projects');
        return result.recordset;
    }

    static async create(title, description, owner_id) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('title', db.sql.NVarChar, title)
            .input('description', db.sql.NVarChar, description)
            .input('owner_id', db.sql.Int, owner_id)
            .query('INSERT INTO projects (title, description, owner_id) VALUES (@title, @description, @owner_id); SELECT SCOPE_IDENTITY() AS id;');
        return {id: result.recordset[0].id, title, description, owner_id }; // Devuelve el nuevo proyecto
    }

    // Puedes agregar más métodos para actualizar y eliminar proyectos
}

module.exports = Project;