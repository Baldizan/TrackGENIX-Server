import express from 'express';
import {
  deleteSuperAdmin,
  updateSuperAdmin,
  createSuperAdmin,
  getAllSuperAdmins,
  getSuperAdminById,
} from '../controllers/superAdmins';
import checkAuth from '../middlewares/authMiddlewares';
import { validateEdit, validateCreation } from '../validations/superAdmins';

const router = express.Router();

router.get('/', checkAuth(['SUPERADMIN']), getAllSuperAdmins);
router.get('/:id', checkAuth(['SUPERADMIN']), getSuperAdminById);
router.post('/', checkAuth(['SUPERADMIN']), validateCreation, createSuperAdmin);
router.delete('/:id', checkAuth(['SUPERADMIN']), deleteSuperAdmin);
router.put('/:id', checkAuth(['SUPERADMIN']), validateEdit, updateSuperAdmin);

export default router;
