const db = require('../db');

class TeamMember {
    constructor(id, project_id, user_id, role) {
        this.id = id;
        this.project_id = project_id;
        this.user_id = user_id;
        this.role = role;
    }

    static async getByProjectId(projectId) {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('projectId', db.sql.Int, projectId)
            .query('SELECT * FROM team_members WHERE project_id = @projectId');
        return result.recordset;
    }

    static async addMember(project_id, user_id, role) {
        const pool = await db.poolPromise;
        await pool.request()
            .input('project_id', db.sql.Int, project_id)
            .input('user_id', db.sql.Int, user_id)
            .input('role', db.sql.NVarChar, role)
            .query('INSERT INTO team_members (project_id, user_id, role) VALUES (@project_id, @user_id, @role)');
        return { project_id, user_id, role }; // Devuelve el nuevo miembro del equipo
    }
}

module.exports = TeamMember;