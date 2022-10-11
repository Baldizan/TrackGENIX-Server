const express = require('express');

const router = express.Router();
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
