import express from 'express';
import { deleteTask, editTask } from '../controllers/tasks';
import { validateEdit } from '../validations/tasks';

const router = express.Router();

router.delete('/:id', deleteTask);

router.put('/:id', validateEdit, editTask);

export default router;
