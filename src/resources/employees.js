import express from 'express';
import fs from 'fs';
export default router;

const router = express.Router();
const employees = require('../data/employees.json');

router.post('/create', (req, res) => {
  const employeeName = req.body.first_name;
  const employeeLastName = req.body.last_name;
  const employeeEmail = req.body.email;
  const employeePassword = req.body.password;
  const employeeTask = req.body.task;
  const employeeProject = req.body.projects;
  const newEmployee = {
    id: new Date().getTime().toString().substring(6),
    first_name: employeeName,
    last_name: employeeLastName,
    email: employeeEmail,
    task: employeeTask,
    password: employeePassword,
    projects: employeeProject,
  };
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees, null, 2), (err) => {
    if (err) {
      res.send('Cannot create new employee');
    } else {
      res.send('New employee created successfully');
    }
  });
});

router.put('/edit', (req, res) => {
  const employeeId = req.body.id;
  const employeeName = req.body.first_name;
  const employeeLastName = req.body.last_name;
  const employeeEmail = req.body.email;
  const employeePassword = req.body.password;
  const employeeTask = req.body.task;
  const employeeProject = req.body.projects;
  const employeeToBeEdited = {
    id: employeeId,
    first_name: employeeName,
    last_name: employeeLastName,
    email: employeeEmail,
    task: employeeTask,
    password: employeePassword,
    projects: employeeProject,
  };
  const newEmployeesList = employees.map((employee) => {
    if (employee.id === employeeId) {
      return employeeToBeEdited;
    }
    return employee;
  });
  fs.writeFile('src/data/employees.json', JSON.stringify(newEmployeesList, null, 2), (err) => {
    if (err) {
      res.send('Cannot update employee');
    } else {
      res.send('Employee updated successfully');
    }
  });
  const employee = require('../data/employees.json');

router.get('/get', (req, res) => {
  res.send(employee);
});

router.get('/get/:id', (req, res) => {
  const employeeId = req.params.id;
  const findEmployee = employee.find((emp) => emp.id === employeeId);
  if (findEmployee) {
    res.send(findEmployee);
  } else {
    res.send('User not found.');
  }
});

router.get('/getTask/:task', (req, res) => {
  const taskParam = req.params.task;
  const filteredTask = employee.filter((t) => t.task === taskParam);
  if (filteredTask.length > 0) {
    res.send(filteredTask);
  } else {
    res.send('Task not found');
  }
});

router.get('/getName/:firstName', (req, res) => {
  const nameParam = req.params.firstName;
  const filteredName = employee.filter((fn) => fn.firstName === nameParam);
  if (filteredName.length > 0) {
    res.send(filteredName);
  } else {
    res.send('First Name not found');
  }
});

router.get('/getLastName/:lastName', (req, res) => {
  const lastNameParam = req.params.lastName;
  const filteredLastName = employee.filter((ln) => ln.lastName === lastNameParam);
  if (filteredLastName.length > 0) {
    res.send(filteredLastName);
  } else {
    res.send('Last Name not found');
  }
});

router.get('/getProject/:projectId', (req, res) => {
  const EmployeeProjectId = req.params.projectId;
  const filteredProject = [];
  employee.forEach((e) => {
    if (e.projects.find((p) => p.projectId === EmployeeProjectId)) {
      filteredProject.push(e);
    }
  });
  if (filteredProject.length > 0) {
    res.send(filteredProject);
  } else {
    res.send('Project not found');
  }
});

router.get('/getRole/:role', (req, res) => {
  const roleParam = req.params.role;
  const filteredRole = [];
  employee.forEach((e) => {
    if (e.projects.find((r) => r.role === roleParam)) {
      filteredRole.push(e);
    }
  });
  if (filteredRole.length > 0) {
    res.send(filteredRole);
  } else {
    res.send('Role not found');
  }
});

router.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const findEmployee = employee.find((emp) => emp.id === employeeId);
  if (findEmployee) {
    const filteredEmployee = employee.filter((emp) => emp.id !== employeeId);
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployee), (err) => {
      if (err) {
        res.send('Employee cannot be deleted.');
      } else {
        res.send('Employee deleted.');
      }
    });
  } else {
    res.send(`Employee with id ${employeeId} not found.`);
  }
});