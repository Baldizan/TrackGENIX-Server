import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';
import employeeSeed from '../seeds/employees';
import Employees from '../models/Employees';

const { _id: correctIdToGet } = projectsSeed[0];
const { _id: correctIdToDelete } = projectsSeed[1];
const { _id: correctIdToEdit } = projectsSeed[2];
const { _id: correctEmployeeToAssign } = employeeSeed[0];
const wrongId = 'thisIsAWrongId';

const mockedProject = {
  name: 'Barthel',
  description: 'ac est lacinia nisi venenatis tristique',
  clientName: 'Maximiliano',
};

const wrongMockedProject = {
  description: 'ac est lacinia nisi venenatis tristique',
  clientName: 'Maximiliano',
};

const notValidMockedProject = {
  clientName: '',
};

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
  await Employees.collection.insertMany(employeeSeed);
});

describe('GET /projects', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toEqual('Project found');
    response.body.data.forEach((project, index) => {
      expect(project).toMatchObject(projectsSeed[index]);
    });
  });
  test('should return 404 if endpoint was not found', async () => {
    const response = await request(app).get('/projs').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
});

describe('GET /projectById/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/projects/${correctIdToGet}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Project ${correctIdToGet} found.`);
    expect(response.body.data).toMatchObject(projectsSeed[0]);
  });
  test('should return satus 400, so the request is wrong', async () => {
    const response = await request(app).get(`/projects/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual(`CastError: Cast to ObjectId failed for value "${wrongId}" (type string) at path "_id" for model "Project"`);
  });
  test('should return satus 404, so the object not exists', async () => {
    const response = await request(app).get('/projects/63575b52fc13ae2eee000000').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('Error: Project not found');
  });
});

describe('POST /projects', () => {
  test('should create a project and return 201', async () => {
    const response = await request(app).post('/projects').send(mockedProject);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Project created.');
    expect(response.body.data).toMatchObject(mockedProject);
  });
  test('should not create a project and return 400', async () => {
    const response = await request(app).post('/projects').send(wrongMockedProject);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('"name" is required');
  });
});

describe('DELETE /projects/:id', () => {
  test('should delete a project and return status 204', async () => {
    const response = await request(app).delete(`/projects/${correctIdToDelete}`).send();
    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBeUndefined();
  });
  test('should not delete a project and return status 400', async () => {
    const response = await request(app).delete(`/projects/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual(`CastError: Cast to ObjectId failed for value "${wrongId}" (type string) at path "_id" for model "Project"`);
  });
  test('should not delete a project and return status 404', async () => {
    const response = await request(app).delete('/projects/63575b52fc13ae2eee000000').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('Error: Project not found');
  });
});

describe('PUT /projects/:id', () => {
  test('should edit a project and return status 201', async () => {
    const response = await request(app).put(`/projects/${correctIdToEdit}`).send(mockedProject);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Project with Id ${correctIdToEdit} updated.`);
    expect(response.body.data).toMatchObject({
      _id: correctIdToEdit,
      ...mockedProject,
    });
  });
  test('should not edit a project and return status 400', async () => {
    const response = await request(app).put(`/projects/${wrongId}`).send(mockedProject);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual(`CastError: Cast to ObjectId failed for value "{ _id: '${wrongId}' }" (type Object) at path "_id" for model "Project"`);
  });
  test('should not edit a project because it was deleted', async () => {
    const response = await request(app).put(`/projects/${correctIdToDelete}`).send(mockedProject);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('Error: Project not found');
  });
  test('should not edit a project because is not valid', async () => {
    const response = await request(app).put(`/projects/${correctIdToEdit}`).send(notValidMockedProject);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('"clientName" is not allowed to be empty');
  });
});

describe('PUT /projects/:id/assignEmployee', () => {
  test('should assign an employee to a project and return status 201', async () => {
    const employee = {
      employee: correctEmployeeToAssign.toString(),
      role: 'QA',
      rate: 30,
    };
    const response = await request(app).put(`/projects/${correctIdToEdit}/assignEmployee`).send(employee);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Employee was assigned');
    expect(response.body.data.employees).toContainEqual(employee);
  });
  test('should not assign an employee, missing data', async () => {
    const wrongEmployee = {
      employee: correctEmployeeToAssign,
      role: 'QA',
    };
    const response = await request(app).put(`/projects/${correctIdToEdit}/assignEmployee`).send(wrongEmployee);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('"rate" is required');
  });
  test('should not assign an employee, the employee already exist in the project', async () => {
    const employee = {
      employee: correctEmployeeToAssign,
      role: 'QA',
      rate: 30,
    };
    const response = await request(app).put(`/projects/${correctIdToEdit}/assignEmployee`).send(employee);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('Error: Employee already exist in project');
  });
});
