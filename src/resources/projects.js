const express = require('express');

const router = express.Router();
const projects = require('../data/projects.json');
const fs = require('fs')

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

//  Create new project
router.post('/add', (req, res) =>{
  const newProject = req.body;
  projects.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('Cannot save new project');
    } else {
      res.send('Project created correctly');
    }
  })
});

module.exports = router;
