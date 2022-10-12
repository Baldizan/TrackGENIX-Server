import express from 'express';
import fs from 'fs';

const router = express.Router();
const timeSheets = require('../data/time-sheets.json');

router.put('/edit/:id', (req, res) => {
  const found = timeSheets.some((timeSheet) => timeSheet.id === (req.params.id));
  if (found) {
    const upTS = req.body;
    timeSheets.forEach((timeSheet) => {
      if (timeSheet.id === req.params.id) {
        const tSheet = timeSheet;
        tSheet.task = upTS.task ? upTS.task : tSheet.task;
        tSheet.date = upTS.date ?? tSheet.date;
        tSheet.description = upTS.description ?? tSheet.description;
        res.json({ msg: 'Time sheet updated', tSheet });
      }
    });
    fs.writeFileSync('src/data/time-sheets.json', JSON.stringify(timeSheets));
  } else {
    res.status(400).json({ msg: `No time sheet with id of ${req.params.id}` });
  }
});

export default router;
