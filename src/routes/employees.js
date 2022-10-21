import express from 'express';
import { getAllEmployees, getEmployeeById, createEmployees } from '../controllers/employees';
import validateCreation from '../validations/employees';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', validateCreation, createEmployees);

export default router;
