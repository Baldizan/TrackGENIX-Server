import express from 'express';
import {
  getAllTasks, getTaskById, createTask, deleteTask, editTask,
} from '../controllers/tasks';
import { validateCreation, validateEdit } from '../validations/tasks';

const router = express.Router();

router.get('/', getAllTasks);

router.get('/:id', getTaskById);

router.post('/', validateCreation, createTask);

router.delete('/:id', deleteTask);

router.put('/:id', validateEdit, editTask);

export default router;
