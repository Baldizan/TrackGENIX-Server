import express from 'express';
// import superAdmins from './superAdmins';
import admins from './admins';
// import timesheets from './timesheets';
// import employees from './employees';
import projects from './projects';
// import tasks from './tasks';
// import projects from './projects';
import tasks from './tasks';

const router = express.Router();

// router.use('/super-admins', superAdmins);
router.use('/admins', admins);
// router.use('/timesheets', timesheets);
// router.use('/employees', employees);
router.use('/projects', projects);
// router.use('/tasks', tasks);
// router.use('/projects', projects);
router.use('/tasks', tasks);

export default router;
