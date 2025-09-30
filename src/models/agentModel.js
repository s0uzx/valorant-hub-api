const pool = require("../config/database");

const getAgents = async () => {
    const result = await pool.query("SELECT * FROM agents");
    return result.rows;
};

const getAgentById = async (id) => {
    const result = await pool.query("SELECT * FROM agents WHERE id = $1", [id]);
    return result.rows[0];
};

const createAgent = async (name, photo, role, abilities) => {
    const result = await pool.query(
        "INSERT INTO agents (name, photo, function, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, photo, role, abilities]
    );
    return result.rows[0];
};

const updateAgent = async (id, name, photo, role, abilities) => {
    const result = await pool.query(
        "UPDATE agents SET name = $1, photo = $2, function = $3, description = $4 WHERE id = $5 RETURNING *",
        [name, photo, role, abilities, id]
    );
    return result.rows[0];
};

const deleteAgent = async (id) => {
    await pool.query("DELETE FROM agents WHERE id = $1", [id]);
};

module.exports = { getAgents, getAgentById, createAgent, updateAgent, deleteAgent };
