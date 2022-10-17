import express from 'express';
import superAdminsController from '../controllers/superAdmins';

const router = express.Router();
router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getAdminById)
  .post('/')
  .delete('/:id')
  .put('/:id');

export default router;
