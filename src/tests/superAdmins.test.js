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
  test('Should return status code 200 if found Id', async () => {
    const response = await request(app).get(`/super-admins/${correctId}`).send();
    expect(response.status).toBe(200);
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).get(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).get(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
  });
});

describe('POST /superAdmins', () => {
  test('Should create an super admin', async () => {
    const response = await request(app).post('/super-admins').send(dataSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });
  test('Should not create an super admin', async () => {
    const response = await request(app).post('/super-admins').send();
    expect(response.status).toBe(400);
  });
});

describe('DELETE /superAdmins', () => {
  test('Should delete an super super admin', async () => {
    const response = await request(app).delete(`/super-admins/${correctId}`).send();
    expect(response.status).toBe(204);
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).delete(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).delete(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
  });
});
