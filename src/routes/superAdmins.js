import express from 'express';
import { getAllSuperAdmins, getSuperAdminById, createSuperAdmin } from '../controllers/superAdmins';
import validateCreation from '../validations/superAdmins';

const router = express.Router();
router.get('/', getAllSuperAdmins);
router.get('/:id', getSuperAdminById);
router.post('/', validateCreation, createSuperAdmin);

export default router;
