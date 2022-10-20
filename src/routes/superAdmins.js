import express from 'express';
import { deleteSuperAdmin, updateSuperAdmin } from '../controllers/superAdmins';
import { validateEdit } from '../validations/superAdmins';

const router = express.Router();
router.delete('/:id', deleteSuperAdmin);
router.put('/:id', validateEdit, updateSuperAdmin);

export default router;
