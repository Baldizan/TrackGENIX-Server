import request from 'supertest';
import app from '../app';
import Task from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Task.collection.insertMany(tasksSeed);
});

const mockedTask = {
  description: 'App development',
};
const taskLessThanMinDescription = {
  description: 'Ap',
};
const taskMoreThanMaxDescription = {
  description: 'Apasjalaskndlaskdjadlasdaldkjadljsladjsljdljadslajkal',
};
const correctId = '63572d9ddaa20935d72f7f1a';
const idNotFound = '63572d9ddaa20123d72f7f1a';
const wrongId = '623333';

describe('GET /tasks', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('Should not get anything because URL is wrong', async () => {
    const response = await request(app).get('/tasks1').send();
    console.log(response.error.message);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.error.message).toMatch('cannot GET');
  });

  test('Should return at least one task', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET (byId) /tasks', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get(`/tasks/${correctId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('Should not find a task because wrong id', async () => {
    const response = await request(app).get(`/tasks/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not find a task because id wasnt found', async () => {
    const response = await request(app).get(`/tasks/${idNotFound}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /tasks', () => {
  test('Should create a task', async () => {
    const response = await request(app).post('/tasks').send(mockedTask);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  test('Should not create a task', async () => {
    const response = await request(app).post('/tasks').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not create a task because desciption validation (less)', async () => {
    const response = await request(app).post('/tasks').send(taskLessThanMinDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not create a task because desciption validation (more)', async () => {
    const response = await request(app).post('/tasks').send(taskMoreThanMaxDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not create a task because URL is wrong', async () => {
    const response = await request(app).post('/tasks1').send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('PUT /tasks', () => {
  test('Should edit a task', async () => {
    const response = await request(app).put(`/tasks/${correctId}`).send(mockedTask);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('Should not edit a task', async () => {
    const response = await request(app).put(`/tasks/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not edit a task because id wasnt found', async () => {
    const response = await request(app).put(`/tasks/${idNotFound}`).send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not edit a task because desciption validation (less)', async () => {
    const response = await request(app).put(`/tasks/${correctId}`).send(taskLessThanMinDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not edit a task because desciption validation (more)', async () => {
    const response = await request(app).put(`/tasks/${correctId}`).send(taskMoreThanMaxDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not edit a task because URL is wrong', async () => {
    const response = await request(app).put(`/tasks1/${correctId}`).send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /tasks', () => {
  test('Should delete a task', async () => {
    const response = await request(app).delete(`/tasks/${correctId}`).send();
    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });

  test('Should not delete a task', async () => {
    const response = await request(app).delete(`/tasks/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Should not delete the task because id wasnt found', async () => {
    const response = await request(app).delete(`/tasks/${idNotFound}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toMatch('not ');
  });

  test('Should not delete a task because URL is wrong', async () => {
    const response = await request(app).delete(`/tasks1/${correctId}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.error.message).toMatch('cannot');
  });
});
