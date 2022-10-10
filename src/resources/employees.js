const express = require('express');

const router = express.Router();
const fs = require('fs');
const employees = require('../data/employees.json');

module.exports = router;

router.post('/createEmployee', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employee.jsno', JSON.stringify(employees), (err) => {
    if (err) {
      res.send('Cannot create new employee');
    } else {
      res.send('New employee created successfully');
    }
  });
});
