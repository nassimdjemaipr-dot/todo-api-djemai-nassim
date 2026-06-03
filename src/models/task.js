const { pool } = require('../db');

const COLS = 'id, title, description, status, created_at AS "createdAt", updated_at AS "updatedAt"';

async function getAll() {
  const result = await pool.query(`SELECT ${COLS} FROM tasks ORDER BY created_at DESC`);
  return result.rows;
}

async function getById(id) {
  const result = await pool.query(`SELECT ${COLS} FROM tasks WHERE id = $1`, [id]);
  return result.rows[0];
}

async function create({ title, description, status }) {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, status)
     VALUES ($1, $2, $3)
     RETURNING ${COLS}`,
    [title, description || '', status || 'pending']
  );
  return result.rows[0];
}

async function update(id, data) {
  const existing = await getById(id);
  if (!existing) return null;
  const title = data.title !== undefined ? data.title : existing.title;
  const description = data.description !== undefined ? data.description : existing.description;
  const status = data.status !== undefined ? data.status : existing.status;
  const result = await pool.query(
    `UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING ${COLS}`,
    [title, description, status, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return result.rowCount > 0;
}

module.exports = { getAll, getById, create, update, remove };
