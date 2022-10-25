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

let timeSheetId;

describe('GET /timesheets', () => {
  test('Should return: status code 200, error false, at least one timesheet ', async () => {
    const response = await request(app).get('/timesheets').send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST /timesheets', () => {
  test('Should return: status code 201, error false and expected msg, when timesheet is created', async () => {
    const response = await request(app).post('/timesheets').send(mockedTimeSheet);
    // eslint-disable-next-line no-underscore-dangle
    timeSheetId = response.body.default._id;

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
    const response = await request(app).delete(`/timesheets/${timeSheetId}`).send();

    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });
});
