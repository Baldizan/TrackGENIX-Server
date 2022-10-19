import express from 'express';
import adminsControllers from '../controllers/admins';

const router = express.Router();

router.delete('/:id', adminsControllers.deleteAdmin);

router.put('/:id', adminsControllers.editAdmin);

export default router;
