import express from 'express';
import { getAllTasks, getTaskById, createTask } from '../controllers/tasks';
import validateCreation from '../validations/tasks';

const router = express.Router();

router.get('/', getAllTasks);

router.get('/:id', getTaskById);

router.post('/', validateCreation, createTask);

export default router;
