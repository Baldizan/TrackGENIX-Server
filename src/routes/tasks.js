import express from 'express';
import { deleteTask, editTask } from '../controllers/tasks';
// import tasksValidation from '../validations/tasks';

const router = express.Router();

router.delete('/:id', deleteTask);

router.put('/:id', editTask);

export default router;
