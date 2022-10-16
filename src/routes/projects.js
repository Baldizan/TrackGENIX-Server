import express from 'express';
import projectsControllers from '../controllers/projects';

const router = express.Router();

router
  .get('/', projectsControllers.getAllProjects)
  .get('/:id', projectsControllers.getProjectById);

export default router;
