const db = require('../db');

class Comment {
    constructor(id, project_id, task_id, user_id, comment) {
        this.id = id;
        this.project_id = project_id;
        this.task_id = task_id;
        this.user_id = user_id;
        this.comment = comment;
    }

    static async getByTaskId(taskId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('taskId', db.sql.Int, taskId)
            .query('SELECT * FROM comments WHERE task_id = @taskId');
        return result.recordset;
    }

    static async create(project_id, task_id, user_id, comment) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('project_id', db.sql.Int, project_id)
            .input('task_id', db.sql.Int, task_id)
            .input('user_id', db.sql.Int, user_id)
            .input('comment', db.sql.NVarChar, comment)
            .query('INSERT INTO comments (project_id, task_id, user_id, comment) VALUES (@project_id, @task_id, @user_id, @comment)');
        return { project_id, task_id, user_id, comment }; // Devuelve el nuevo comentario
    }
}

module.exports = Comment;