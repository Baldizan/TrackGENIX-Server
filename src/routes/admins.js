import express from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  editAdmin,
} from '../controllers/admins';
import checkAuth from '../middlewares/authMiddlewares';
import { validateCreation, validateUpdate } from '../validations/admins';

const router = express.Router();

router.get('/', checkAuth(['SUPERADMIN']), getAllAdmins);
router.get('/:id', checkAuth(['SUPERADMIN']), getAdminById);
router.post('/', checkAuth(['SUPERADMIN']), validateCreation, createAdmin);
router.delete('/:id', checkAuth(['SUPERADMIN']), deleteAdmin);
router.put('/:id', checkAuth(['SUPERADMIN']), validateUpdate, editAdmin);

export default router;
