const express = require('express');

const router = express.Router();
const fs = require('fs');
const admins = require('../data/admins.json');

module.exports = router;

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

router.get('/getById/:id', (req, res) => {
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
  if (foundAdmin) {
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
