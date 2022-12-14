import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
} from '../controllers/projects';
import checkAuth from '../middlewares/authMiddlewares';
import { validateCreation, validateUpdate } from '../validations/projects';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), getProjectById);
router.post('/', checkAuth(['ADMIN']), validateCreation, createProject);
router.delete('/:id', checkAuth(['ADMIN']), deleteProject);
router.put('/:id', validateUpdate, updateProject);

export default router;
