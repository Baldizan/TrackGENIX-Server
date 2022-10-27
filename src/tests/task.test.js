import request from 'supertest';
import app from '../app';
import Task from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Task.collection.insertMany(tasksSeed);
});
// eslint-disable-next-line no-underscore-dangle
const tasksSeedWithIdStringified = tasksSeed.map((task) => ({ ...task, _id: task._id.toString() }));
const mockedTask = {
  description: 'App development',
};
const taskLessThanMinDescription = {
  description: 'Ap',
};
const taskMoreThanMaxDescription = {
  description: 'App development App development App development App development',
};
const correctId = '63572d9ddaa20935d72f7f1a';
const idNotFound = '63572d9ddaa20123d72f7f1a';
const wrongId = '623333';

describe('GET /tasks', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Tasks found');
    expect(response.body.data).toEqual(tasksSeedWithIdStringified);
  });

  test('Should not get anything because URL is wrong', async () => {
    const response = await request(app).get('/tasks1').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.error.message).toEqual('cannot GET /tasks1 (404)');
  });
});

describe('GET /tasks/:id', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get(`/tasks/${correctId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Task found');
    // eslint-disable-next-line no-underscore-dangle
    const taskWithCorrectId = tasksSeedWithIdStringified.find((task) => task._id === correctId);
    expect(response.body.data).toEqual(taskWithCorrectId);
  });

  test('Should not find a task because wrong id', async () => {
    const response = await request(app).get(`/tasks/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('CastError: Cast to ObjectId failed for value "623333" (type string) at path "_id" for model "Tasks"');
  });

  test('Should not find a task because id wasn\'t found', async () => {
    const response = await request(app).get(`/tasks/${idNotFound}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Error: Task not found');
  });
});

describe('POST /tasks', () => {
  test('Should create a task', async () => {
    const response = await request(app).post('/tasks').send(mockedTask);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Task created successfully.');
    expect(response.body.data).toMatchObject(mockedTask);
  });

  test('Should not create a task', async () => {
    const response = await request(app).post('/tasks').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "description" is required');
  });

  test('Should not create a task because desciption validation (less)', async () => {
    const response = await request(app).post('/tasks').send(taskLessThanMinDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "description" length must be at least 3 characters long');
  });

  test('Should not create a task because desciption validation (more)', async () => {
    const response = await request(app).post('/tasks').send(taskMoreThanMaxDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "description" length must be less than or equal to 50 characters long');
  });

  test('Should not create a task because Endpoint is wrong', async () => {
    const response = await request(app).post('/tasks1').send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.error.message).toEqual('cannot POST /tasks1 (404)');
  });
});

describe('PUT /tasks', () => {
  test('Should edit a task', async () => {
    const response = await request(app).put(`/tasks/${correctId}`).send(mockedTask);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Task with id ${correctId} edited.`);
    expect(response.body.data).toMatchObject(mockedTask);
  });

  test('Should not edit a task', async () => {
    const response = await request(app).put(`/tasks/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "description" is required');
  });

  test('Should not edit a task because id wasn\'t found', async () => {
    const response = await request(app).put(`/tasks/${idNotFound}`).send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Error: No task found');
  });

  test('Should not edit a task because desciption validation (less)', async () => {
    const response = await request(app).put(`/tasks/${correctId}`).send(taskLessThanMinDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "description" length must be at least 3 characters long');
  });

  test('Should not edit a task because desciption validation (more)', async () => {
    const response = await request(app).put(`/tasks/${correctId}`).send(taskMoreThanMaxDescription);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "description" length must be less than or equal to 50 characters long');
  });

  test('Should not edit a task because Endpoint is wrong', async () => {
    const response = await request(app).put(`/tasks1/${correctId}`).send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot PUT /tasks1/${correctId} (404)`);
  });
});

describe('DELETE /tasks', () => {
  test('Should delete a task', async () => {
    const response = await request(app).delete(`/tasks/${correctId}`).send();
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test('Should not delete a task', async () => {
    const response = await request(app).delete(`/tasks/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('CastError: Cast to ObjectId failed for value "623333" (type string) at path "_id" for model "Tasks"');
  });

  test('Should not delete the task because id wasnt found', async () => {
    const response = await request(app).delete(`/tasks/${idNotFound}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Error: No task found');
  });

  test('Should not delete a task because Endpoint is wrong', async () => {
    const response = await request(app).delete(`/tasks1/${correctId}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot DELETE /tasks1/${correctId} (404)`);
  });
});
