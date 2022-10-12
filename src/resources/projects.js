import fs from 'fs';
import express from 'express';

const router = express.Router();
const projects = require('../data/projects.json');

router.put('/edit/:id', (req, res) => {
  const upProject = req.body;
  projects.forEach((project) => {
    if (parseInt(project.id, 10) === parseInt(req.params.id, 10)) {
      const proj = project; // mandatory
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
