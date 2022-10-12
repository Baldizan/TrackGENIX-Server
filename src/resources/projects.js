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

router.put('/edit/:id', (req, res) => {
  const upProject = req.body;
  projects.forEach((project) => {
    if (parseInt(project.id, 10) === parseInt(req.params.id, 10)) {
      const proj = project;
      proj.project_name = upProject.project_name ?? project.project_name;
      proj.start_date = upProject.start_date ?? project.start_date;

      if (upProject.employees) {
        proj.employees = upProject.employees;
      }

      if (upProject.tasks) {
        proj.tasks = upProject.tasks;
      }

      res.send('The projects was updated');
    } else {
      res.send(`The project with id:${req.params.id} does not exists`);
    }
  });
  fs.writeFileSync('src/da/* edit the name and the start_date of a project */ta/projects.json', JSON.stringify(projects, null, 4));
  res.end();
});

router.put('/assignEmployee/:id', (req, res) => {
  const foundProject = projects.find((project) => project.id.toString() === req.params.id);

  if (!foundProject) {
    return res.send('Not project found');
  }

  const { employees } = foundProject;

  const PMExists = employees.find((employee) => employee.rol.includes('PM'));
  const employeeExists = employees.find((employee) => employee.id.toString() === req.body.id);

  if (employeeExists) {
    return res.send('The employee already exist');
  }

  if (req.body.rol.includes('PM') && PMExists) {
    return res.send('Employee with rol PM already exist');
  }

  employees.push(req.body);

  fs.writeFileSync('src/data/projects.json', JSON.stringify(projects, null, 4));
  return res.send('The employee was assigned');
});

export default router;
