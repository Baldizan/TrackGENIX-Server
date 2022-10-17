import express from 'express';
import timeSheetsControllers from '../controllers/timeSheets';
import timeSheetsValidations from '../validations/timesheets';

const router = express.Router();

router
  .get('/', timeSheetsControllers.getAllTimeSheets)
  .get('/:id', timeSheetsControllers.getTimeSheetsbyId)
  .post('/', timeSheetsValidations.validateCreation, timeSheetsControllers.createTimeSheets)
  .delete('/:id', timeSheetsControllers.deleteTimeSheet)
  .put('/:id', timeSheetsValidations.validateCreation, timeSheetsControllers.editTimeSheet);

export default router;
