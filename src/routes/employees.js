import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeesController.getAllEmployees)
  .get('/:id', employeesController.getEmployeesById)
  .post('/', employeesValidations.validateCreation, employeesController.createEmployees)
  .delete('/:id', employeesController.deleteEmployees)
  .put('/:id', employeesController.editEmployees);

export default router;
