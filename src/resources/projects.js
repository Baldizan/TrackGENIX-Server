import express from 'express';
import fs from 'fs';

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

//  Get projects by name
router.get('/getByName/:name', (req, res) => {
  const projectName = req.params.name;
  const foundProject = projects.find((project) => project.project_name === projectName);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project with the name of: ${req.params.name}` });
  }
});

//  Get projects by start date
router.get('/getByDate/:date', (req, res) => {
  const projectStartDate = req.params.date;
  const foundProject = projects.find((project) => project.start_date === projectStartDate);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project iniciated on ${req.params.date}. The date format must be (dd-mm-yyyy)` });
  }
});

//  Create new project
router.post('/add', (req, res) => {
  const bodys = req.body;
  const idNewProject = new Date().getTime().toString().substring(6);
  const newEmployees = [];
  const newTasks = [];
  bodys.employees.forEach((employee) => {
    let emp = employee;
    emp = {
      id: employee.id,
      name: employee.name,
      rol: employee.rol,
      rate: employee.rate,
    };
    newEmployees.push(emp);
  });

  bodys.tasks.forEach((task) => {
    let ts = task;
    ts = {
      id: task.id,
      name: task.name,
      description: task.description,
    };
    newTasks.push(ts);
  });

  const newProject = {
    id: idNewProject,
    project_name: bodys.project_name,
    start_date: bodys.start_date,
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

//  Delete a project
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

// Filter a list of projects before a date
router.get('/getProjectsBefore/:date', (req, res) => {
  const projectStartDate = req.params.date;
  const filteredProjectsByDate = projects
    .filter((project) => project.start_date <= projectStartDate);
  if (filteredProjectsByDate) {
    res.send(filteredProjectsByDate);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project iniciated before ${req.params.date}. The date format must be (dd-mm-yyyy)` });
  }
});

// Filter a list of projects after a date
router.get('/getProjectsAfter/:date', (req, res) => {
  const projectStartDate = req.params.date;
  const filteredProjectsByDate = projects
    .filter((project) => project.start_date >= projectStartDate);
  if (filteredProjectsByDate) {
    res.send(filteredProjectsByDate);
  } else {
    res
      .status(400)
      .json({ msg: `There is no project iniciated after ${req.params.date}. The date format must be (dd-mm-yyyy)` });
  }
});

export default router;
