import express from 'express';
import { deleteAdmin, editAdmin } from '../controllers/admins';
import validateUpdate from '../validations/admins';

const router = express.Router();

router.delete('/:id', deleteAdmin);

router.put('/:id', validateUpdate, editAdmin);

export default router;
