import express from 'express';
import { getAllTasks, getTaskById, createTask } from '../controllers/tasks';
import tasksValidation from '../validations/tasks';

const router = express.Router();

router.get('/', getAllTasks);

router.get('/:id', getTaskById);

router.post('/', tasksValidation.validateCreation, createTask);

export default router;
