import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/SuperAdmins';
import superAdminsSeed from '../seeds/superAdmins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

const superAdminsSeedWithIdStringified = superAdminsSeed.map((superAdmin) => ({
  ...superAdmin,
  // eslint-disable-next-line no-underscore-dangle
  _id: superAdmin._id.toString(),
}));

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
    expect(response.body.message).toEqual('Super admins found');
    expect(response.body.data).toEqual(superAdminsSeedWithIdStringified);
  });
});

describe('GET /superAdmins/:id', () => {
  test('Should return status code 200 if found Id', async () => {
    const response = await request(app).get(`/super-admins/${correctId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    const superAdminWithCorrectId = superAdminsSeedWithIdStringified.find(
      // eslint-disable-next-line no-underscore-dangle
      (superAdmin) => superAdmin._id === correctId,
    );
    expect(response.body.data).toEqual(superAdminWithCorrectId);
    expect(response.body.message).toEqual(`Super admin with id: ${correctId} found`);
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).get(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('CastError: Cast to ObjectId failed for value "x" (type string) at path "_id" for model "SuperAdmin"');
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).get(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Error: Super admin not found');
  });
});

describe('POST /superAdmins', () => {
  test('Should create an super admin', async () => {
    const response = await request(app).post('/super-admins').send(dataSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Super admin created succesfully');
    expect(response.body.data).toMatchObject(dataSuperAdmin);
  });
  test('Should not create an super admin if has no data', async () => {
    const response = await request(app).post('/super-admins').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "name" is required. "lastName" is required. "email" is required. "password" is required');
  });
  test('Should not create an super admin if data is invalid', async () => {
    const response = await request(app).post('/super-admins').send(invalidDataSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "name" must be a string. "lastName" is required. "email" is required. "password" is required');
  });
});

describe('DELETE /superAdmins/:id', () => {
  test('Should delete an super super admin', async () => {
    const response = await request(app).delete(`/super-admins/${correctId}`).send();
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).delete(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual(`CastError: Cast to ObjectId failed for value "${incorrectId}" (type string) at path "_id" for model "SuperAdmin"`);
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).delete(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual("Error: Super admin doesn't exist");
  });
});

describe('PUT /superAdmins', () => {
  test('Should update an super admin', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const response = await request(app).put(`/super-admins/${superAdminsSeed[2]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Super admin updated');
    expect(response.body.data).toMatchObject(superAdminsSeed[2]);
  });
  test('Should return status code 400 if the super admin Id is incorrect', async () => {
    const response = await request(app).put(`/super-admins/${incorrectId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual(`CastError: Cast to ObjectId failed for value "${incorrectId}" (type string) at path "_id" for model "SuperAdmin"`);
  });
  test('Should return status code 404 if not found super admin Id', async () => {
    const response = await request(app).put(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual("Error: Super admin doesn't exist");
  });
  test('Should return status code 400 if data is invalid', async () => {
    const response = await request(app).put(`/super-admins/${correctId}`).send(invalidDataSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('There was an error: "name" must be a string');
  });
});
