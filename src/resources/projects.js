const express = require('express');

const router = express.Router();
const projects = require('../data/projects.json');

//  Get All porjects list
router.get('/getAll', (req, res) => {
  res.send(projects);
});

module.exports = router;
