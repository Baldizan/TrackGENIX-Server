const express = require('express');

const router = express.Router();
const fs = require('fs');
const admins = require('../data/admins.json');

module.exports = router;

router.post('/add', (req, res) => {
  const adminParam = req.body;
  const newAdmin = {
    id: adminParam.id = new Date().getTime().toString().substring(6),
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
  const adminId = Number(editAdmin.id);
  const foundAdmin = admins.find((adminFilter) => adminFilter.id === adminId);
  if (!foundAdmin) {
    res.send('Admin not found');
  } else if (JSON.stringify(editAdmin) === JSON.stringify(foundAdmin)) {
    res.send('Admin not have data to change');
  } else {
    const filterAdmin = admins.filter((adminFilter) => adminFilter.id !== editAdmin.id);
    filterAdmin.push(editAdmin);
    fs.writeFile('src/data/admins.json', JSON.stringify(filterAdmin), (err) => {
      if (err) {
        res.send('Cannot edit Admin');
      } else {
        res.send('Admin edited successfully');
      }
    });
  }
});
