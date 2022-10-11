const express = require('express');

const router = express.Router();
const fs = require('fs');
const admins = require('../data/admins.json');

module.exports = router;

// Add admins
router.post('/admins/add', (req, res) => {
  const newAdmin = req.body;
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Cannot create new Admin');
    } else {
      res.send('Admin created successfully');
    }
  });
});

// Edit admins
router.put('/admins/edit', (req, res) => {
  const editAdmin = req.body;
  const adminId = Number(editAdmin.id);
  const foundAdmin = admins.find((adminFilter) => adminFilter.id === adminId);
  if (!foundAdmin) {
    res.send('Admin not found');
  } else if (JSON.stringify(editAdmin) === JSON.stringify(foundAdmin)) {
    res.send('Admin not change, es igual pete');
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
