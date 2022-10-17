import express from 'express';
import { getAllProjects, getProjectById, createProject } from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router.get('/', getAllProjects);

router.get('/:id', getProjectById);

router.post('/', projectsValidations.validateCreation, createProject);

export default router;
