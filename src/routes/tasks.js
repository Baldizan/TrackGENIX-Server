import express from 'express';
import { deleteTask } from '../controllers/tasks';
// import tasksValidation from '../validations/tasks';

const router = express.Router();

router.delete('/:id', deleteTask);

export default router;
