import express from 'express';
import {
  getAllTasks, getTaskById, createTask, deleteTask, editTask,
} from '../controllers/tasks';
import checkAuth from '../middlewares/authMiddlewares';
import { validateCreation, validateEdit } from '../validations/tasks';

const router = express.Router();

router.get('/', checkAuth(['ADMIN', 'EMPLOYEE']), getAllTasks);
router.get('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), getTaskById);
router.post('/', checkAuth(['ADMIN']), validateCreation, createTask);
router.delete('/:id', checkAuth(['ADMIN']), deleteTask);
router.put('/:id', checkAuth(['ADMIN']), validateEdit, editTask);

export default router;
