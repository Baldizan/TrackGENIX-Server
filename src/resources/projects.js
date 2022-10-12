import express from 'express';
import fs from 'fs';

const router = express.Router();
const projects = require('../data/projects.json');

router.get('/get', (req, res) => {
  res.send(projects);
});

router.get('/get/:id', (req, res) => {
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

router.get('/getByName/:name', (req, res) => {
  const projectName = req.params.name;
  const foundProject = projects.find((project) => project.projectName === projectName);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project with the name of: ${req.params.name}` });
  }
});

router.get('/getByDate/:date', (req, res) => {
  const projectStartDate = req.params.date;
  const foundProject = projects.find((project) => project.startDate === projectStartDate);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project iniciated on ${req.params.date}. The date format must be (dd-mm-yyyy)` });
  }
});

router.post('/add', (req, res) => {
  const bodys = req.body;
  const idNewProject = new Date().getTime().toString().substring(6);
  const newEmployees = [];
  const newTasks = [];
  bodys.employees.forEach((employee) => {
    newEmployees.push({
      id: employee.id,
      name: employee.name,
      rol: employee.rol,
      rate: employee.rate,
    });
  });

  bodys.tasks.forEach((task) => {
    newTasks.push({
      id: task.id,
      name: task.name,
      description: task.description,
    });
  });

  const newProject = {
    id: idNewProject,
    projectName: bodys.projectName,
    startDate: bodys.startDate,
    employees: newEmployees,
    tasks: newTasks,
  };
  projects.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('Cannot save new project');
    } else {
      res.send('Project created correctly');
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProject = projects.filter((project) => project.id.toString() !== projectId);
  fs.writeFile('src/data/projects.json', JSON.stringify(filteredProject), (err) => {
    if (err) {
      res.send('Cannot delete that project');
    } else {
      res.send('Project deleted');
    }
  });
});

router.get('/getProjectsBefore/:date', (req, res) => {
  const projectStartDate = req.params.date;
  const filteredProjectsByDate = projects
    .filter((project) => project.startDate <= projectStartDate);
  if (filteredProjectsByDate) {
    res.send(filteredProjectsByDate);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project iniciated before ${req.params.date}. The date format must be (dd-mm-yyyy)` });
  }
});

router.get('/getProjectsAfter/:date', (req, res) => {
  const projectStartDate = req.params.date;
  const filteredProjectsByDate = projects
    .filter((project) => project.startDate >= projectStartDate);
  if (filteredProjectsByDate) {
    res.send(filteredProjectsByDate);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project iniciated after ${req.params.date}. The date format must be (dd-mm-yyyy)` });
  }
});

export default router;
