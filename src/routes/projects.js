import express from 'express';
import {
  getAllProjects, getProjectById, createProject, deleteProject, updateProject,
} from '../controllers/projects';
import { validateCreation, validateUpdate } from '../validations/projects';

const router = express.Router();

router.get('/', getAllProjects);

router.get('/:id', getProjectById);

router.post('/', validateCreation, createProject);

router.delete('/:id', deleteProject);

router.put('/:id', validateUpdate, updateProject);

export default router;
