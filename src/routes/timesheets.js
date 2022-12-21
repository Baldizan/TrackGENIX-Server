import express from 'express';
import {
  getAllTimeSheets, getTimeSheetsbyId, createTimeSheets, deleteTimeSheet, editTimeSheet,
} from '../controllers/timeSheets';
import checkAuth from '../middlewares/authMiddlewares';
import { validateCreation, validateEdition } from '../validations/timesheets';

const router = express.Router();

router.get('/', checkAuth(['ADMIN', 'EMPLOYEE']), getAllTimeSheets);
router.get('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), getTimeSheetsbyId);
router.post('/', checkAuth(['ADMIN']), validateCreation, createTimeSheets);
router.delete('/:id', checkAuth(['ADMIN']), deleteTimeSheet);
router.put('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), validateEdition, editTimeSheet);

export default router;
