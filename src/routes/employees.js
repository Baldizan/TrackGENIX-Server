import express from 'express';
import {
  deleteEmployees,
  updateEmployees,
  getAllEmployees,
  getEmployeeById,
  createEmployees,
} from '../controllers/employees';
import checkAuth from '../middlewares/authMiddlewares';
import { validateCreation, validateUpdate } from '../validations/employees';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', checkAuth(['ADMIN']), getEmployeeById);
router.post('/', validateCreation, createEmployees);
router.delete('/:id', checkAuth(['ADMIN']), deleteEmployees);
router.put('/:id', validateUpdate, updateEmployees);

export default router;
