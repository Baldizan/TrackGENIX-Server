const express = require('express');

const router = express.Router();
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

module.exports = router;
