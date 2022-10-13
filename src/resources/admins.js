import express from 'express';
import fs from 'fs';

const router = express.Router();
const admins = require('../data/admins.json');

router.get('/get', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

router.get('/get/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((adminFilter) => adminFilter.id === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found');
  }
});

router.get('/filter/:filterValue', (req, res) => {
  const filterParam = req.params.filterValue;
  const foundAdmin = admins.filter((adminFilter) => adminFilter.firstName === filterParam
    || adminFilter.lastName === filterParam
    || adminFilter.email === filterParam);
  if (foundAdmin.length > 0) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found');
  }
});

router.delete('/delete/:id', (req, res) => {
  const adminId = req.params.id;
  const filterAdmin = admins.filter((adminFilter) => adminFilter.id !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filterAdmin), (err) => {
    if (err) {
      res.send('Cannon delete Admin');
    } else {
      res.send('Admin delete successfully');
    }
  });
});

router.post('/add', (req, res) => {
  const adminParam = req.body;
  const newAdmin = {
    id: new Date().getTime().toString().substring(6),
    first_name: adminParam.first_name ?? 'name undefined',
    last_name: adminParam.last_name ?? 'last name undefined',
    email: adminParam.email ?? 'email undefined',
    password: adminParam.password ?? 'password undefined',
    create_employee_id: adminParam.create_employee_id ?? 'not employees created',
    delete_employee_id: adminParam.delete_employee_id ?? 'not employees delete',
    edit_employee_id: adminParam.edit_employee_id ?? 'not employees edited',
  };
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Cannot create new Admin');
    } else {
      res.send('Admin created successfully');
    }
  });
});

router.put('/edit', (req, res) => {
  const editAdmin = req.body;
  const adminId = editAdmin.id;
  const adminIndex = admins.findIndex((index) => index.id === adminId);
  if (adminIndex === -1) {
    res.send('Admin not found');
  } else if (JSON.stringify(admins[adminIndex]) === JSON.stringify(editAdmin)) {
    res.send('Admin does not have data to change');
  } else {
    if (admins[adminIndex].firstName !== editAdmin.firstName) {
      admins[adminIndex].firstName = editAdmin.firstName;
    }
    if (admins[adminIndex].lastName !== editAdmin.lastName) {
      admins[adminIndex].lastName = editAdmin.lastName;
    }
    if (admins[adminIndex].email !== editAdmin.email) {
      admins[adminIndex].email = editAdmin.email;
    }
    if (admins[adminIndex].password !== editAdmin.password) {
      admins[adminIndex].password = editAdmin.password;
    }
    if (admins[adminIndex].createEmployeeId !== editAdmin.createEmployeeId) {
      admins[adminIndex].createEmployeeId = editAdmin.createEmployeeId;
    }
    if (admins[adminIndex].deleteEmployeeId !== editAdmin.deleteEmployeeId) {
      admins[adminIndex].deleteEmployeeId = editAdmin.deleteEmployeeId;
    }
    if (admins[adminIndex].editEmployeeId !== editAdmin.editEmployeeId) {
      admins[adminIndex].editEmployeeId = editAdmin.editEmployeeId;
    }
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
      if (err) {
        res.send('Cannot edit Admin');
      } else {
        res.send('Admin edited successfully');
      }
    });
  }
});

export default router;
