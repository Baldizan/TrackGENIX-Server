import express from 'express';
import { getAllProjects, getProjectById, createProject } from '../controllers/projects';
import validateCreation from '../validations/projects';

const router = express.Router();

router.get('/', getAllProjects);

router.get('/:id', getProjectById);

router.post('/', validateCreation, createProject);

export default router;
