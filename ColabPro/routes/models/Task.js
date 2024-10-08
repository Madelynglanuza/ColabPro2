const db = require('../db');

class Task {
    constructor(id, title, description, project_id, assigned_to) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.project_id = project_id;
        this.assigned_to = assigned_to;
    }

    static async getByProjectId(projectId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('projectId', db.sql.Int, projectId)
            .query('SELECT * FROM tasks WHERE project_id = @projectId');
        return result.recordset;
    }

    static async create(project_id, title, description, assigned_to) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('project_id', db.sql.Int, project_id)
            .input('title', db.sql.NVarChar, title)
            .input('description', db.sql.NVarChar, description)
            .input('assigned_to', db.sql.Int, assigned_to)
            .query('INSERT INTO tasks (project_id, title, description, assigned_to) VALUES (@project_id, @title, @description, @assigned_to)');
        return { project_id, title, description, assigned_to }; // Devuelve la nueva tarea
    }

    // Puedes agregar más métodos para actualizar y eliminar tareas
}

module.exports = Task;