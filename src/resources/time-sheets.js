import express from 'express';

import fs from 'fs';

const router = express.Router();
const timeSheets = require('../data/time-sheets.json');

router.get('/all', (req, res) => {
  res.send(timeSheets);
});

router.delete('/delete/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const findTimeSheet = timeSheets.find((ts) => ts.id === timeSheetId);
  if (findTimeSheet) {
    const filteredTimeSheet = timeSheets.filter((ts) => ts.id !== timeSheetId);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimeSheet), (err) => {
      if (err) {
        res.send('Time-Sheet cannot be deleted.');
      } else {
        res.send('Time-Sheet deleted.');
      }
    });
  } else {
    res.send('Time-Sheet cannot be deleted.');
  }
});

export default router;
