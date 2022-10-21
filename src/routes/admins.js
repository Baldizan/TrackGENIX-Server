import express from 'express';
import { deleteAdmin, editAdmin } from '../controllers/admins';

const router = express.Router();

router.delete('/:id', deleteAdmin);

router.put('/:id', editAdmin);

export default router;
