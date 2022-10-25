import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheets from '../models/TimeSheets';
import timeSheetSeed from '../seeds/timeSheets';

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheetSeed);
});

const mockedTimeSheet = {
  description: 'Mocked timesheet with test prouposes',
  date: '2022-10-25',
  task: mongoose.Types.ObjectId('6350c2fc3ffdd3ec77f6a2ac'),
  hours: 24,
  project: mongoose.Types.ObjectId('631c973322e3ae91f635cf8f'),
  employee: mongoose.Types.ObjectId('63271eb19298965ae634f74d'),
};

const goodTimeSheetId = '63573e59ca9eab60e9e9519e';
const badTimeSheetId = 'bla';
const notFoundTimeSheetId = '63582bbafc6d0eb186ca16e8';

describe('GET /timesheets', () => {
  test('Should return: status code 200, error false, at least one timesheet', async () => {
    const response = await request(app).get('/timesheets').send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Should return: status code 404, error true, undefined data and expected msg with timesheets not found', async () => {
    await TimeSheets.deleteMany();
    const response = await request(app).get('/timesheets').send();

    expect(response.status).toBe(404);
    expect(response.body.message).toMatch('Time sheet not found');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();

    await TimeSheets.collection.insertMany(timeSheetSeed);
  });
});

describe('GETbyID /timesheets', () => {
  test('Should return: status code 200, error false and timesheet data with correct id passed', async () => {
    const response = await request(app).get(`/timesheets/${goodTimeSheetId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe(`Timesheet with id ${goodTimeSheetId} found`);
  });
  test('Should return: status code 404, error true, undefined data and expected msg with timesheet id not found', async () => {
    const response = await request(app).get(`/timesheets/${notFoundTimeSheetId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toMatch(`Time sheet with id ${notFoundTimeSheetId} not found`);
  });
  test('Should return: status code 400, error true, undefined data and expected msg when id passed is wrong', async () => {
    const response = await request(app).get(`/timesheets/${badTimeSheetId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toMatch('CastError: Cast to ObjectId failed for value');
  });
});

describe('POST /timesheets', () => {
  test('Should return: status code 201, error false and expected msg, when timesheet is created', async () => {
    const response = await request(app).post('/timesheets').send(mockedTimeSheet);

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Timesheet created succesfully');
  });

  test('Should return: status code 400, error true, and expected msg, when timesheet is not created', async () => {
    const response = await request(app).post('/timesheets').send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /timesheets', () => {
  test('Should return: status code 204, error false and expected msg, when timesheet is deleted', async () => {
    const response = await request(app).delete(`/timesheets/${goodTimeSheetId}`).send();

    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });
});
