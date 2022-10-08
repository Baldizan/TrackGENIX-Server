const express = require('express');

const router = express.Router();
const projects = require('../data/projects.json');

//  Get All projects list
router.get('/getAll', (req, res) => {
  res.send(projects);
});

//  Get projects by id
router.get('/getById/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project with the id of ${req.params.id}` });
  }
});

module.exports = router;
