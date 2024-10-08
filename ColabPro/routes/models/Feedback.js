const db = require('../db');

class Feedback {
    constructor(id, project_id, user_id, rating, comments) {
        this.id = id;
        this.project_id = project_id;
        this.user_id = user_id;
        this.rating = rating;
        this.comments = comments;
    }

    static async getByProjectId(projectId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('projectId', db.sql.Int, projectId)
            .query('SELECT * FROM feedback WHERE project_id = @projectId');
        return result.recordset;
    }

    static async create(project_id, user_id, rating, comments) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('project_id', db.sql.Int, project_id)
            .input('user_id', db.sql.Int, user_id)
            .input('rating', db.sql.Int, rating)
            .input('comments', db.sql.NVarChar, comments)
            .query('INSERT INTO feedback (project_id, user_id, rating, comments) VALUES (@project_id, @user_id, @rating, @comments)');
        return { project_id, user_id, rating, comments }; // Devuelve el nuevo feedback
    }
}

module.exports = Feedback;