import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import EmployeesSeeds from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(EmployeesSeeds);
});

const foundId = '63585a24fc13ae5116000064';
const notFoundId = '63585a24fc13ae5116000010';
const invalidId = 'Id';

describe('GET /employees', () => {
  test('Should return status code 200', async () => {
    const res = await request(app).get('/employees').send();
    expect(res.status).toBe(200);
    expect(res.body.error).toBeFalsy();
    expect(res.body.data.length).toBeGreaterThan(0);
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
  });
  test('Should return status code 404 if employee id is not found', async () => {
    const res = await request(app).get(`/employees/${notFoundId}`).send();
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
  });
  test('Should return status code 400 if employee id is not valid', async () => {
    const res = await request(app).get(`/employees/${invalidId}`).send();
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
    expect(res.body.data).toBeUndefined();
  });
  test('Should return status code 404 if endpoint is wrong', async () => {
    const res = await request(app).get('/employee').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});
