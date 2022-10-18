import express from 'express';
import { getAllEmployees, getEmployeesById, createEmployees } from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeesById);
router.post('/', employeesValidations.validateCreation, createEmployees);

export default router;
