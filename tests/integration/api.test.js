const request = require('supertest');
const app = require('../../src/app');
const { pool, initDb } = require('../../src/db');

beforeAll(async () => {
  await initDb();
});

afterAll(async () => {
  await pool.end();
});

describe('API Tasks (test d integration)', () => {
  test('GET /health retourne 200 et status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/tasks retourne un tableau', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks cree une tache (201)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Tache integration', description: 'test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Tache integration');
  });

  test('POST /api/tasks sans title retourne 400', async () => {
    const res = await request(app).post('/api/tasks').send({ description: 'sans titre' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/tasks/:id inexistant retourne 404', async () => {
    const res = await request(app).get('/api/tasks/00000000-0000-0000-0000-000000000000');
    expect(res.statusCode).toBe(404);
  });
});
