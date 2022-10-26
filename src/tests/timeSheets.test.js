import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

import TimeSheets from '../models/TimeSheets';
import Tasks from '../models/Tasks';
import Employees from '../models/Employees';
import Projects from '../models/Projects';

import timeSheetsSeed from '../seeds/timeSheets';
import tasksSeed from '../seeds/tasks';
import employeesSeed from '../seeds/employees';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheetsSeed);
  await Tasks.collection.insertMany(tasksSeed);
  await Employees.collection.insertMany(employeesSeed);
  await Projects.collection.insertMany(projectsSeed);
});

const mockedTimeSheet = {
  description: 'Mocked timesheet with test prouposes',
  date: '2022-10-25',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};

const descriptionEmptyBadMTS = {
  date: '2022-10-25',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const descriptionShortBadMTS = {
  description: 'Mock',
  date: '2022-10-25',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const descriptionLongBadMTS = {
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been theds',
  date: '2022-10-25',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const dateEmptyBadMTS = {
  description: 'Mocked timesheet with test prouposes',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const dateBadMTS = {
  description: 'Mocked timesheet with test prouposes',
  date: '25 de octubre de 2022',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const taskEmptyBadMTS = {
  description: 'Mocked timesheet with test prouposes',
  date: '2022-10-25',
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const taskBadMTS = {
  description: 'Mocked timesheet with test prouposes',
  date: '2022-10-25',
  task: 'esto no es un id',
  hours: 24,
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const hoursEmptyBadMTS = {
  description: 'Mocked timesheet with test prouposes',
  date: '2022-10-25',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
};
const hoursNotNumberBadMTS = {
  description: 'Mocked timesheet with test prouposes',
  date: '2022-10-25',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 'veintitres',
  project: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa7'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
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
    expect(response.body.data[0].task).not.toBeNull();
    expect(response.body.data[0].project).not.toBeNull();
    expect(response.body.data[0].employee).not.toBeNull();
  });

  test('Should return: status code 404, error true, undefined data and expected msg with timesheets not found', async () => {
    await TimeSheets.deleteMany();
    const response = await request(app).get('/timesheets').send();

    expect(response.status).toBe(404);
    expect(response.body.message).toMatch('Time sheet not found');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();

    await TimeSheets.collection.insertMany(timeSheetsSeed);
  });
});

describe('GET /timesheets/:id', () => {
  test('Should return: status code 200, error false and timesheet data with correct id passed', async () => {
    const response = await request(app).get(`/timesheets/${goodTimeSheetId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe(`Timesheet with id ${goodTimeSheetId} found`);
    expect(response.body.data.task).not.toBeNull();
    expect(response.body.data.project).not.toBeNull();
    expect(response.body.data.employee).not.toBeNull();
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
    expect(response.body.default.task).not.toBeNull();
    expect(response.body.default.employee).not.toBeNull();
    expect(response.body.default.project).not.toBeNull();
  });

  test('Should return: status code 400, error true, and expected msg, with empty data', async () => {
    const response = await request(app).post('/timesheets').send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.default).toBeUndefined();
  });

  test('Empty description in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(descriptionEmptyBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "description" is required ');
  });

  test('Short description in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(descriptionShortBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "description" length must be at least 5 characters long ');
  });

  test('Long description in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(descriptionLongBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "description" length must be less than or equal to 100 characters long ');
  });
  test('Empty date type in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(dateEmptyBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "date" is required ');
  });
  test('Bad date type in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(dateBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "date" must be a valid date ');
  });
  test('Empty task in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(taskEmptyBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toMatch('There was an error: "task" is required ');
  });
  test('Bad task type in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(taskBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toMatch('ValidationError: task: Cast to ObjectId failed');
  });
  test('Empty hours in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(hoursEmptyBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toMatch('There was an error: "hours" is required ');
  });
  test('Bad hours type in timesheets should not be acepted', async () => {
    const response = await request(app).post('/timesheets').send(hoursNotNumberBadMTS);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toMatch('There was an error: "hours" must be a number ');
  });
});

describe('DELETE /timesheets', () => {
  test('Should return: status code 204, error false and expected msg, when timesheet is deleted', async () => {
    const response = await request(app).delete(`/timesheets/${goodTimeSheetId}`).send();

    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });
});
