import express from 'express';
import { deleteAdmin, editAdmin } from '../controllers/admins';
import validateAdmin from '../validations/admins';

const router = express.Router();

router.delete('/:id', deleteAdmin);

router.put('/:id', validateAdmin, editAdmin);

export default router;
