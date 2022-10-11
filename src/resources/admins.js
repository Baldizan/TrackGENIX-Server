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
