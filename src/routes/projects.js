import express from 'express';
import projectsControllers from '../controllers/projects';

const router = express.Router();

router
  .delete('/:id', projectsControllers.deleteProject)
  .post('/', projectsControllers.createProject);

export default router;
