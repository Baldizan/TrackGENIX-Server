const express = require('express');

const router = express.Router();
const fs = require('fs');
const employee = require('../data/employees.json');

router.get('/allEmployees', (req, res) => {
  res.send(employee);
});

router.get('/getEmployee/:id', (req, res) => {
  const employeeId = req.params.id;
  const findEmployee = employee.find((emp) => emp.id === employeeId);
  if (findEmployee) {
    res.send(findEmployee);
  } else {
    res.send('User not found.');
  }
});

router.get('/getByTask/:task', (req, res) => {
  const taskParam = req.params.task;
  const filteredTask = employee.filter((t) => t.task === taskParam);
  if (filteredTask.length > 0) {
    res.send(filteredTask);
  } else {
    res.send('Task not found');
  }
});

router.get('/getByProject/:project_id', (req, res) => {
  const projectId = req.params.project_id;
  const filteredProject = [];
  employee.forEach((e) => {
    if (e.projects.find((p) => p.project_id === projectId)) {
      filteredProject.push(e);
    }
  });
  if (filteredProject.length !== 0) {
    res.send(filteredProject);
  } else {
    res.send('Project not found');
  }
});

router.get('/getByRole/:role', (req, res) => {
  const roleParam = req.params.role;
  const filteredRole = [];
  employee.forEach((e) => {
    if (e.projects.find((r) => r.role === roleParam)) {
      filteredRole.push(e);
    }
  });
  if (filteredRole.length !== 0) {
    res.send(filteredRole);
  } else {
    res.send('Role not found');
  }
});

router.delete('/deleteEmployee/:id', (req, res) => {
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
    res.send('Employee cannot be deleted.');
  }
});

module.exports = router;
