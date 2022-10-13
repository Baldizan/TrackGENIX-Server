import express from 'express';
import adminsRouter from './resources/admins';
import taskRouter from './resources/tasks';
import projectRouter from './resources/projects';
import timeSheets from './resources/time-sheets';
import employeeRouter from './resources/employees';

const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', adminsRouter);

app.use('/admins', adminsRouter);
app.use('/timesheets', timeSheets);
app.use('/employees', employeeRouter);
app.use('/projects', projectRouter);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use('/tasks', taskRouter);
