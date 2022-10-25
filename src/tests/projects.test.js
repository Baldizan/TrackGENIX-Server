import request from 'supertest';
import app from '../app';
import projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await projects.collection.insertMany(projectsSeed);
});

// el describe permite agrupar conjunto de test relacionados
describe('GET /projects', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('should return 404 if endpoint was not found', async () => {
    const response = await request(app).get('/projs').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
});
