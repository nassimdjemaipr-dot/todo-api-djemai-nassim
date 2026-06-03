const { pool, initDb } = require('../../src/db');
const Task = require('../../src/models/task');

beforeAll(async () => {
  await initDb();
});

afterAll(async () => {
  await pool.end();
});

describe('Modele Task (test unitaire)', () => {
  test('create() cree une tache avec un id et les bons champs', async () => {
    const task = await Task.create({ title: 'Tache test', description: 'desc', status: 'pending' });
    expect(task.id).toBeDefined();
    expect(task.title).toBe('Tache test');
    expect(task.description).toBe('desc');
    expect(task.status).toBe('pending');
    expect(task.createdAt).toBeDefined();
  });

  test('getById() retourne la bonne tache', async () => {
    const created = await Task.create({ title: 'A retrouver' });
    const found = await Task.getById(created.id);
    expect(found).toBeDefined();
    expect(found.title).toBe('A retrouver');
  });

  test('remove() supprime une tache', async () => {
    const created = await Task.create({ title: 'A supprimer' });
    const deleted = await Task.remove(created.id);
    expect(deleted).toBe(true);
    expect(await Task.getById(created.id)).toBeUndefined();
  });
});
