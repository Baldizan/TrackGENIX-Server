import express from 'express';
import {
  deleteSuperAdmin, updateSuperAdmin, createSuperAdmin, getAllSuperAdmins, getSuperAdminById,
} from '../controllers/superAdmins';
import { validateEdit, validateCreation } from '../validations/superAdmins';

const router = express.Router();
router.delete('/:id', deleteSuperAdmin);
router.put('/:id', validateEdit, updateSuperAdmin);
router.get('/', getAllSuperAdmins);
router.get('/:id', getSuperAdminById);
router.post('/', validateCreation, createSuperAdmin);

export default router;
