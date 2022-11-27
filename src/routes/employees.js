import express from 'express';
import {
  deleteEmployees, updateEmployees, getAllEmployees, getEmployeeById, createEmployees,
} from '../controllers/employees';
import checkAuth from '../middlewares/authMiddlewares';
import { validateCreation, validateUpdate } from '../validations/employees';

const router = express.Router();

router.get('/', checkAuth(['ADMIN']), getAllEmployees);
router.get('/:id', checkAuth(['ADMIN']), getEmployeeById);
router.post('/', validateCreation, createEmployees);
router.delete('/:id', checkAuth(['ADMIN']), deleteEmployees);
router.put('/:id', checkAuth(['ADMIN']), validateUpdate, updateEmployees);

export default router;
