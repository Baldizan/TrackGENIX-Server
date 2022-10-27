import request from 'supertest';
import app from '../app';
import employees from '../models/Employees';
import employeesSeeds from '../seeds/employees';

beforeAll(async () => {
  await employees.collection.insertMany(employeesSeeds);
});

const foundId = '63585a24fc13ae5116000064';
const notFoundId = '63585a24fc13ae5116000010';
const invalidId = 'Id';

const validBody = {
  name: 'Maxi',
  lastName: 'Gonzalez',
  phone: 1234567890,
  email: 'test@gmail.com',
  password: 'BaSP2022',
};

const invalidBody = {
  name: 'M',
  lastName: 'G',
  phone: 1,
  email: '.com',
  password: '1',
};

const incompleteBody = {
  password: '1',
};

describe('GET /employees', () => {
  test('Should return status code 200', async () => {
    const res = await request(app).get('/employees').send();
    expect(res.status).toBe(200);
    expect(res.body.error).toBeFalsy();
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.message).toEqual('Employee found');
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).get('/employee').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('GET /employees/:id', () => {
  test('Should return status code 200 and employee', async () => {
    const res = await request(app).get(`/employees/${foundId}`).send();
    expect(res.status).toBe(200);
    expect(res.body.error).toBeFalsy();
    expect(res.body.data).toBeDefined();
    expect(res.body.message).toEqual('Employee found');
  });
  test('Should return status code 404 if employee id is not found', async () => {
    const res = await request(app).get(`/employees/${notFoundId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
    expect(res.body.message).toEqual('Error: Employee not found');
  });
  test('Should return status code 400 if employee id is not valid', async () => {
    const res = await request(app).get(`/employees/${invalidId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
    expect(res.body.message).toEqual('CastError: Cast to ObjectId failed for value "Id" (type string) at path "_id" for model "Employee"');
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).get('/employee').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('POST /employees', () => {
  test('Should return status code 201 and create new employee', async () => {
    const res = await request(app).post('/employees').send(validBody);
    expect(res.status).toBe(201);
    expect(res.body.error).toBeFalsy();
    expect(res.body.data).toMatchObject(validBody);
    expect(res.body.message).toEqual('Employee created');
  });
  test('Should return status code 400 if data is wrong', async () => {
    const res = await request(app).post('/employees').send(invalidBody);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message).toEqual('"name" length must be at least 3 characters long. "lastName" length must be at least 3 characters long. "phone" must be greater than or equal to 10. "email" must be a valid email. "password" length must be at least 8 characters long');
  });
  test('Should return status code 400 if data is incomplete', async () => {
    const res = await request(app).post('/employees').send(incompleteBody);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message).toEqual('"name" is required. "lastName" is required. "phone" is required. "email" is required. "password" length must be at least 8 characters long');
  });
  test('Should return status code 400 if has no data', async () => {
    const res = await request(app).post('/employees').send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message).toEqual('"name" is required. "lastName" is required. "phone" is required. "email" is required. "password" is required');
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).post('/employee').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('PUT /employees/:id', () => {
  test('Should return status code 201 and update the employee', async () => {
    const res = await request(app).put(`/employees/${foundId}`).send(validBody);
    expect(res.status).toBe(201);
    expect(res.body.error).toBeFalsy();
    expect(res.body.message).toEqual(`Employee with id ${foundId} edited`);
  });
  test('Should return status code 404 if employee id is not found', async () => {
    const res = await request(app).put(`/employees/${notFoundId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message).toEqual('Error: Employee not found');
  });
  test('Should return status code 400 if employee id is not valid', async () => {
    const res = await request(app).put(`/employees/${invalidId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message).toEqual('CastError: Cast to ObjectId failed for value "Id" (type string) at path "_id" for model "Employee"');
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).put('/employee').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('DELETE /employees/:id', () => {
  test('Should return status code 204 and delete the employee', async () => {
    const res = await request(app).delete(`/employees/${foundId}`).send();
    expect(res.status).toBe(204);
    expect(res.body.error).toBeFalsy();
  });
  test('Should return status code 404 if employee id is not found', async () => {
    const res = await request(app).delete(`/employees/${notFoundId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
    expect(res.body.message).toEqual('Error: Employee not found');
  });
  test('Should return status code 400 if employee id is not valid', async () => {
    const res = await request(app).delete(`/employees/${invalidId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
    expect(res.body.message).toEqual('CastError: Cast to ObjectId failed for value "Id" (type string) at path "_id" for model "Employee"');
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).delete('/employee').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});
