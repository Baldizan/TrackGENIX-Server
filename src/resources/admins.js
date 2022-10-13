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

export default router;
