import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeeds from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeeds);
});

const validMocked = {
  name: 'Jhon',
  lastName: 'Doe',
  email: 'jhon.doe@gmail.com',
  password: 'blabla123',
};

const invalidMocked = {
  name: 'J',
  lastName: 'D',
  email: 'jhon.doe@gmail.com',
  password: 'blabla123',
};

const emptyMocked = {
  name: 'J',
};

const deleteId = '635693feaf6c44edd6a63f94';
const validId = '6356aa7c571bd6a8b0486a3b';
const notFoundId = '6356b89974af15f3e427ea43';
const incorrectId = 'x';

describe('GET /admins', () => {
  test('Should return status code 200', async () => {
    const res = await request(app).get('/admins').send();
    expect(res.status).toBe(200);
    expect(res.body.error).toBeFalsy();
    expect(res.body.data.length).toBeGreaterThan(0);
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).get('/admin').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('GETbyID /admins', () => {
  test('Should return status code 200 and return Admin by Id', async () => {
    const res = await request(app).get(`/admins/${validId}`).send();
    expect(res.status).toBe(200);
    expect(res.body.error).toBeFalsy();
    expect(res.body.data).toBeDefined();
  });
  test('Should return status code 400 if the Admin Id is incorrect', async () => {
    const res = await request(app).get(`/admins/${incorrectId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
  });
  test('Should return status code 404 if not found Admin Id', async () => {
    const res = await request(app).get(`/admins/${notFoundId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).get(`/admin/${validId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('DELETE /admins', () => {
  test('Should return status code 204 and delete an Admin', async () => {
    const res = await request(app).delete(`/admins/${deleteId}`).send();
    expect(res.status).toBe(204);
    expect(res.body.error).toBeFalsy();
  });
  test('Should return status code 400 if the Admin Id is incorrect', async () => {
    const res = await request(app).delete(`/admins/${incorrectId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
  });
  test('Should return status code 404 if not found Admin Id', async () => {
    const res = await request(app).delete(`/admins/${notFoundId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
  });
  test('Should return status code 404 if endpoint Admin Id', async () => {
    const res = await request(app).delete('/admin').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('POST /admins', () => {
  test('Should return status code 201 and create new Admin', async () => {
    const res = await request(app).post('/admins').send(validMocked);
    expect(res.status).toBe(201);
    expect(res.body.error).toBeFalsy();
    expect(res.body.data).toMatchObject(validMocked);
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).post('/admin').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
  test('Should return status code 400 if has no data', async () => {
    const res = await request(app).post('/admins').send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
  test('Should return status code 400 if data is wrong', async () => {
    const res = await request(app).post('/admins').send(invalidMocked);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
  test('Should return status code 400 if data is empty', async () => {
    const res = await request(app).post('/admins').send(emptyMocked);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
});

describe('PUT /admins', () => {
  test('Should return status code 204 and update an Admin', async () => {
    const res = await request(app).put(`/admins/${validId}`).send(validMocked);
    expect(res.status).toBe(201);
    expect(res.body.error).toBeFalsy();
  });
  test('Should return status code 400 if the Admin Id is incorrect', async () => {
    const res = await request(app).put(`/admins/${incorrectId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
  test('Should return status code 404 if not found Admin Id', async () => {
    const res = await request(app).put(`/admins/${notFoundId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
  });
  test('Should return status code 404 if endpoint Admin Id', async () => {
    const res = await request(app).put('/admin').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});
