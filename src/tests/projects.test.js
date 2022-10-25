import request from 'supertest';
import app from '../app';
import projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

const correctId = '63580774bc5b0634809b67d5';

const mockedProject = {
  name: 'Barthel',
  description: 'ac est lacinia nisi venenatis tristique',
  clientName: 'Maximiliano',
};

const wrongMockedProject = {
  description: 'ac est lacinia nisi venenatis tristique',
  clientName: 'Maximiliano',
};

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

describe('GET /projectById', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/projects/${correctId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});

describe('POST /projects', () => {
  test('should create a project and return 201', async () => {
    const response = await request(app).post('/projects').send(mockedProject);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });
  test('should not create a project and return 400', async () => {
    const response = await request(app).post('/projects').send(wrongMockedProject);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
  });
});
