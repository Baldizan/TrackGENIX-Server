import express from 'express';
import fs from 'fs';

const router = express.Router();
const timeSheets = require('../data/time-sheets.json');

router.get('/get', (req, res) => {
  res.send(timeSheets);
});

router.get('/get/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const findTimeSheet = timeSheets.find((ts) => ts.id === timeSheetId);
  if (findTimeSheet) {
    res.send(findTimeSheet);
  } else {
    res.send('Time-Sheet not found.');
  }
});

router.get('/getDate/:date', (req, res) => {
  const timeSheetsDate = req.params.date;
  const findTimeSheet = timeSheets.filter((d) => d.date === timeSheetsDate);
  if (findTimeSheet.length > 0) {
    res.send(findTimeSheet);
  } else {
    res.send('Time-sheet not found');
  }
});

router.post('/create', (req, res) => {
  const newTask = req.body.task;
  const newDate = req.body.date;
  const newDescription = req.body.description;
  const newTimeSheet = {
    id: new Date().getTime().toString().substring(6),
    task: newTask,
    date: newDate,
    description: newDescription,
  };
  timeSheets.push(newTimeSheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets, null, 2), (err) => {
    if (err) {
      res.send('Error! cannot create Time-sheet');
    } else {
      res.send('Time-sheet was created');
    }
  });
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
    res.send(`Time-Sheet with id ${timeSheetId} not found.`);
  }
});

export default router;
