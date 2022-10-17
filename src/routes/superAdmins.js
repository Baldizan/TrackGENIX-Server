import express from 'express';
import superAdminsController from '../controllers/superAdmins';
import superAdminsValidation from '../validations/superAdmins';

const router = express.Router();
router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getAdminById)
  .post('/', superAdminsValidation.validateCreation, superAdminsController.createSuperAdmin)
  .delete('/:id')
  .put('/:id');

export default router;
