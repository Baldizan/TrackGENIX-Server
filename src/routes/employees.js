import express from 'express';
import {
  deleteEmployees, updateEmployees, getAllEmployees, getEmployeeById, createEmployees,
} from '../controllers/employees';
import { validateCreation, validateUpdate } from '../validations/employees';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', validateCreation, createEmployees);
router.delete('/:id', deleteEmployees);
router.put('/:id', validateUpdate, updateEmployees);

export default router;
