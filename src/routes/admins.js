import express from 'express';
import {
  getAllAdmins, getAdminById, createAdmin, deleteAdmin, editAdmin,
} from '../controllers/admins';
import { validateCreation, validateUpdate } from '../validations/admins';

const router = express.Router();

router.get('/', getAllAdmins);

router.get('/:id', getAdminById);

router.post('/', validateCreation, createAdmin);

router.delete('/:id', deleteAdmin);

router.put('/:id', validateUpdate, editAdmin);
export default router;
