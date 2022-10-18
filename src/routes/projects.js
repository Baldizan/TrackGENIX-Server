import express from 'express';
import { deleteProject, updateProject, assignEmployee } from '../controllers/projects';
import { validateUpdate, validateEmployee } from '../validations/projects';

const router = express.Router();

router.delete('/:id', deleteProject);

router.put('/:id', validateUpdate, updateProject);

router.put('/:id/assignEmployee', validateEmployee, assignEmployee);

export default router;
