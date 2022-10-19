import express from 'express';
import {
  getAllSuperAdmins, getSuperAdminById, createSuperAdmin, deleteSuperAdmin, updateSuperAdmin,
} from '../controllers/superAdmins';
import { validateCreation, validateEdit } from '../validations/superAdmins';

const router = express.Router();
router.get('/', getAllSuperAdmins);
router.get('/:id', getSuperAdminById);
router.post('/', validateCreation, createSuperAdmin);
router.delete('/:id', deleteSuperAdmin);
router.put('/:id', validateEdit, updateSuperAdmin);

export default router;
