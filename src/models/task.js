const { randomUUID } = require('crypto');

// Stockage en memoire (local)
let tasks = [];

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find((t) => t.id === id);
}

function create({ title, description, status }) {
  const now = new Date().toISOString();
  const task = {
    id: randomUUID(),
    title,
    description: description || '',
    status: status || 'pending',
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
}

function update(id, data) {
  const task = getById(id);
  if (!task) return null;
  if (data.title !== undefined) task.title = data.title;
  if (data.description !== undefined) task.description = data.description;
  if (data.status !== undefined) task.status = data.status;
  task.updatedAt = new Date().toISOString();
  return task;
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
