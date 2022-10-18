import express from 'express';
import {
  getAllTimeSheets, getTimeSheetsbyId, createTimeSheets, deleteTimeSheet, editTimeSheet,
} from '../controllers/timeSheets';
import { validateCreation, validateEdition } from '../validations/timesheets';

const router = express.Router();

router.get('/', getAllTimeSheets);
router.get('/:id', getTimeSheetsbyId);
router.post('/', validateCreation, createTimeSheets);
router.delete('/:id', deleteTimeSheet);
router.put('/:id', validateEdition, editTimeSheet);

export default router;
