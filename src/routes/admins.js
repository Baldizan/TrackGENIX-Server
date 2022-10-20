import express from 'express';
import { getAllAdmins, getAdminById, createAdmin } from '../controllers/admins';
import validateCreation from '../validations/admins';

const router = express.Router();

router.get('/', getAllAdmins);

router.get('/:id', getAdminById);

router.post('/', validateCreation, createAdmin);

export default router;
