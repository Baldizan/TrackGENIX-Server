import express from 'express';
import { deleteEmployees, updateEmployees } from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router.delete('/:id', deleteEmployees);
router.put('/:id', employeesValidations.validateUpdate, updateEmployees);

export default router;
