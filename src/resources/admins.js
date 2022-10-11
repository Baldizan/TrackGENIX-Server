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
