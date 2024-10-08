const db = require('../db');

class File {
    constructor(id, project_id, user_id, file_name, file_path) {
        this.id = id;
        this.project_id = project_id;
        this.user_id = user_id;
        this.file_name = file_name;
        this.file_path = file_path;
    }

    static async getByProjectId(projectId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('projectId', db.sql.Int, projectId)
            .query('SELECT * FROM files WHERE project_id = @projectId');
        return result.recordset;
    }

    static async create(project_id, user_id, file_name, file_path) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('project_id', db.sql.Int, project_id)
            .input('user_id', db.sql.Int, user_id)
            .input('file_name', db.sql.NVarChar, file_name)
            .input('file_path', db.sql.NVarChar, file_path)
            .query('INSERT INTO files (project_id, user_id, file_name, file_path) VALUES (@project_id, @user_id, @file_name, @file_path)');
        return { project_id, user_id, file_name, file_path }; // Devuelve el nuevo archivo
    }
}

module.exports = File;