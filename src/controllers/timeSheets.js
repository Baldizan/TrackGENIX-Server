// import express from 'express';
// import fs from 'fs';
// import timeSheets from '../models/Timesheets';

// const router = express.Router();

// router.put('/edit/:id', (req, res) => {
//   const found = timeSheets.some((timeSheet) => timeSheet.id === (req.params.id));
//   if (found) {
//     const updateTimeSheet = req.body;
//     timeSheets.forEach((timeSheet) => {
//       if (timeSheet.id === req.params.id) {
//         const tSheet = timeSheet;
//         tSheet.task = updateTimeSheet.task ?? tSheet.task;
//         tSheet.date = updateTimeSheet.date ?? tSheet.date;
//         tSheet.description = updateTimeSheet.description ?? tSheet.description;
//         res.json({ msg: 'Time sheet updated', tSheet });
//       }
//     });
//     fs.writeFileSync('src/data/time-sheets.json', JSON.stringify(timeSheets));
//   } else {
//     res.status(400).json({ msg: `No time sheet with id of ${req.params.id}` });
//   }
// });

// router.get('/get', (req, res) => {
//   res.send(timeSheets);
// });

// router.get('/get/:id', (req, res) => {
//   const timeSheetId = req.params.id;
//   const findTimeSheet = timeSheets.find((ts) => ts.id === timeSheetId);
//   if (findTimeSheet) {
//     res.send(findTimeSheet);
//   } else {
//     res.send('Time-Sheet not found.');
//   }
// });

// router.get('/getDate/:date', (req, res) => {
//   const timeSheetsDate = req.params.date;
//   const findTimeSheet = timeSheets.filter((d) => d.date === timeSheetsDate);
//   if (findTimeSheet.length > 0) {
//     res.send(findTimeSheet);
//   } else {
//     res.send('Time-sheet not found');
//   }
// });

// router.post('/create', (req, res) => {
//   const newTask = req.body.task;
//   const newDate = req.body.date;
//   const newDescription = req.body.description;
//   const newTimeSheet = {
//     id: new Date().getTime().toString().substring(6),
//     task: newTask,
//     date: newDate,
//     description: newDescription,
//   };
//   timeSheets.push(newTimeSheet);
//   fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets, null, 2), (err) => {
//     if (err) {
//       res.send('Error! cannot create Time-sheet');
//     } else {
//       res.send('Time-sheet was created');
//     }
//   });
// });

// router.delete('/delete/:id', (req, res) => {
//   const timeSheetId = req.params.id;
//   const findTimeSheet = timeSheets.find((ts) => ts.id === timeSheetId);
//   if (findTimeSheet) {
//     const filteredTimeSheet = timeSheets.filter((ts) => ts.id !== timeSheetId);
//     fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimeSheet), (err) => {
//       if (err) {
//         res.send('Time-Sheet cannot be deleted.');
//       } else {
//         res.send('Time-Sheet deleted.');
//       }
//     });
//   } else {
//     res.send(`Time-Sheet with id ${timeSheetId} not found.`);
//   }
// });

// export default router;
