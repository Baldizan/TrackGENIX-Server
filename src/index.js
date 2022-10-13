import express from 'express';
import taskRouter from './resources/tasks';
import projectRouter from './resources/projects';
import timeSheets from './resources/time-sheets';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import employeeRouter from './resources/employees';

const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employees', employeeRouter);

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
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.use('/tasks', taskRouter);
