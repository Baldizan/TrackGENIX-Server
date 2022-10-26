import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/SuperAdmins';
import superAdminsSeed from '../seeds/superAdmins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

const dataSuperAdmin = {
  name: 'superADM',
  lastName: 'adminLn',
  email: 'adminl@gmail.com',
  password: 'aksdm122',
};

const invalidDataSuperAdmin = {
  name: 123456789,
};

const correctId = '63519b632b611499e4a21401';
const incorrectId = 'x';
const notFoundId = '6357f056457ff7c72b2374d0';

describe('GET /superAdmins', () => {
  test('Should return status code 200, error false and more than one super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /superAdmins/:id', () => {
  test('Should return status code 200 if found Id', async () => {
    const response = await request(app).get(`/super-admins/${correctId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).get(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).get(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /superAdmins', () => {
  test('Should create an super admin', async () => {
    const response = await request(app).post('/super-admins').send(dataSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });
  test('Should not create an super admin if has no data', async () => {
    const response = await request(app).post('/super-admins').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('Should not create an super admin if data is invalid', async () => {
    const response = await request(app).post('/super-admins').send(invalidDataSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('DELETE /superAdmins', () => {
  test('Should delete an super super admin', async () => {
    const response = await request(app).delete(`/super-admins/${correctId}`).send();
    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).delete(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).delete(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('PUT /superAdmins', () => {
  test('Should update an super admin', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const response = await request(app).put(`/super-admins/${superAdminsSeed[2]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).put(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).put(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
  test('Should return status code 400 if data is invalid', async () => {
    const response = await request(app).put(`/super-admins/${correctId}`).send(invalidDataSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});
