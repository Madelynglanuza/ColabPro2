const db = require('../db');

class Notification {
    constructor(id, user_id, message) {
        this.id = id;
        this.user_id = user_id;
        this.message = message;
    }

    static async getByUserId(userId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('userId', db.sql.Int, userId)
            .query('SELECT * FROM notifications WHERE user_id = @userId');
        return result.recordset;
    }

    static async create(user_id, message) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('user_id', db.sql.Int, user_id)
            .input('message', db.sql.NVarChar, message)
            .query('INSERT INTO notifications (user_id, message) VALUES (@user_id, @message)');
        return { user_id, message }; // Devuelve la nueva notificación
    }
}

module.exports = Notification;