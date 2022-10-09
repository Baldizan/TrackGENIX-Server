const express = require('express');

const router = express.Router();
const fs = require('fs');
const employee = require('../data/employees.json');

router.get('/getEmployee/:id', (req, res) => {
  const employeeId = req.params.id;
  const findEmployee = employee.find((emp) => emp.id === employeeId);
  if (findEmployee) {
    res.send(findEmployee);
  } else {
    res.send('User not found.');
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
