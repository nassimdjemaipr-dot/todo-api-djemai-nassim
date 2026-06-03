const Task = require('../../src/models/task');

describe('Modele Task (test unitaire)', () => {
  test('create() cree une tache avec un id et les bons champs', () => {
    const task = Task.create({ title: 'Tache test', description: 'desc', status: 'pending' });
    expect(task.id).toBeDefined();
    expect(task.title).toBe('Tache test');
    expect(task.description).toBe('desc');
    expect(task.status).toBe('pending');
    expect(task.createdAt).toBeDefined();
  });

  test('getById() retourne la bonne tache', () => {
    const created = Task.create({ title: 'A retrouver' });
    const found = Task.getById(created.id);
    expect(found).toBeDefined();
    expect(found.title).toBe('A retrouver');
  });

  test('remove() supprime une tache', () => {
    const created = Task.create({ title: 'A supprimer' });
    const deleted = Task.remove(created.id);
    expect(deleted).toBe(true);
    expect(Task.getById(created.id)).toBeUndefined();
  });
});
