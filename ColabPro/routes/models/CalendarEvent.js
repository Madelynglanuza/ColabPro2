const db = require('../db');

class CalendarEvent {
    constructor(id, project_id, title, start_time, end_time, description) {
        this.id = id;
        this.project_id = project_id;
        this.title = title;
        this.start_time = start_time;
        this.end_time = end_time;
        this.description = description;
    }

    static async getByProjectId(projectId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('projectId', db.sql.Int, projectId)
            .query('SELECT * FROM calendar_events WHERE project_id = @projectId');
        return result.recordset;
    }

    static async create(project_id, title, start_time, end_time, description) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('project_id', db.sql.Int, project_id)
            .input('title', db.sql.NVarChar, title)
            .input('start_time', db.sql.DateTime, start_time)
            .input('end_time', db.sql.DateTime, end_time)
            .input('description', db.sql.NVarChar, description)
            .query('INSERT INTO calendar_events (project_id, title, start_time, end_time, description) VALUES (@project_id, @title, @start_time, @end_time, @description)');
        return { project_id, title, start_time, end_time, description }; // Devuelve el nuevo evento
    }
}

module.exports = CalendarEvent;