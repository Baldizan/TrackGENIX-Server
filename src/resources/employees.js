const express = require('express');

const router = express.Router();
const fs = require('fs');
const employees = require('../data/employees.json');

module.exports = router;

router.post('/createEmployee', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send('Cannot create new employee');
    } else {
      res.send('New employee created successfully');
    }
  });
});

router.put('/editEmployee', (req, res) => {
  const employeeId = req.params.id;
  const employeeToBeEdited = req.body;
  let newEmployeesList = employees;
  newEmployeesList = newEmployeesList.map((employee) => {
    if (employee.id === employeeId) {
      return employeeToBeEdited;
    }
    return employee;
  });
  fs.writeFile('src/data/employee.json', JSON.stringify(newEmployeesList), (err) => {
    if (err) {
      res.send('Cannot update employee');
    } else {
      res.send('Employee updated successfully');
    }
  });
});
