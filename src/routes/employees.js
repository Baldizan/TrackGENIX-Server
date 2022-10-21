import express from 'express';
import { deleteEmployees, updateEmployees } from '../controllers/employees';
import validateUpdate from '../validations/employees';

const router = express.Router();

router.delete('/:id', deleteEmployees);
router.put('/:id', validateUpdate, updateEmployees);

export default router;
