const express = require('express');

const router = express.Router();
const fs = require('fs');
const admins = require('../data/admins.json');

module.exports = router;

// Get all admins
router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

// Filter admins by id
router.get('/getById/:id', (req, res) => {
  const adminId = Number(req.params.id);
  const foundAdmin = admins.find((adminFilter) => adminFilter.id === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found');
  }
});

// Delete admins
router.delete('/delete/:id', (req, res) => {
  const adminId = Number(req.params.id);
  const filterAdmin = admins.filter((adminFilter) => adminFilter.id !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filterAdmin), (err) => {
    if (err) {
      res.send('Cannon delete Admin');
    } else {
      res.send('Admin delete successfully');
    }
  });
});
