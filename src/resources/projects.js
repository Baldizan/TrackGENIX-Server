import fs from 'fs';
import express from 'express';

const router = express.Router();
const projects = require('../data/projects.json');

// update project
router.put('/edit/:id', (req, res) => {
  const upProject = req.body;
  projects.forEach((project) => {
    if (parseInt(project.id, 10) === parseInt(req.params.id, 10)) {
      /* edit the name and the start_date of a project */
      const proj = project; // this works because it is passed always by reference in js
      proj.project_name = upProject.project_name ? upProject.project_name : project.project_name;
      proj.start_date = upProject.start_date ? upProject.start_date : project.start_date;

      /* edit the array of employees,if the property doesn't exist in the request,
      then it doesn't change. If the property exists and it is an empty array,
      then it changes, and if there are objects in the array, it also changes */

      if (upProject.employees) {
        proj.employees = upProject.employees;
      }

      /* edit the array of tasks,if the property doesn't exist in the request,
      then it doesn't change. If the property exists and it is an empty array,
      then it changes, and if there are objects in the array, it also changes */

      if (upProject.tasks) {
        proj.tasks = upProject.tasks;
      }

      res.send('The projects was updated');
    } else {
      res.send(`The project with id:${req.params.id} does not exists`);
    }
  });
  fs.writeFileSync('src/data/projects.json', JSON.stringify(projects, null, 4));
  res.end();
  /* -------------------------------------------- */
});

/* assign an employee to a project, we get the project id from the url,
and the employee id from the body */
router.put('/assignEmployee/:id', (req, res) => {
  let pmInProject = false;
  // check if exist the project
  projects.forEach((project) => {
    if (parseInt(project.id, 10) === parseInt(req.params.id, 10)) {
      /* check if employee with id in the body already exist,
       if exist then we can't assign the employee */
      project.employees.forEach((employee) => {
        if (parseInt(req.body.id, 10) !== parseInt(employee.id, 10)) {
          /* check if exist an employee in the project with rol PM, if not exist,
           then we can assign the employee */
          employee.rol.forEach((rol) => {
            if (rol === 'PM') {
              pmInProject = true;
            }
          });
        } else {
          res.send('The employee already exist');
        }
      });
      if (pmInProject) {
        res.send('Employee with rol PM already exist');
      } else {
        project.employees.push(req.body);
        res.send('The employee was assigned');
      }
    }
  });
  fs.writeFileSync('src/data/projects.json', JSON.stringify(projects, null, 4));
  res.end();
});

export default router;
