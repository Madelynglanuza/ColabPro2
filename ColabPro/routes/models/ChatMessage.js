const db = require('../db');

class ChatMessage {
    constructor(id, project_id, user_id, message) {
        this.id = id;
        this.project_id = project_id;
        this.user_id = user_id;
        this.message = message;
    }

    static async getByProjectId(projectId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('projectId', db.sql.Int, projectId)
            .query('SELECT * FROM chat_messages WHERE project_id = @projectId');
        return result.recordset;
    }

    static async create(project_id, user_id, message) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('project_id', db.sql.Int, project_id)
            .input('user_id', db.sql.Int, user_id)
            .input('message', db.sql.NVarChar, message)
            .query('INSERT INTO chat_messages (project_id, user_id, message) VALUES (@project_id, @user_id, @message)');
        return { project_id, user_id, message }; // Devuelve el nuevo mensaje
    }
}

module.exports = ChatMessage;