import express from 'express';
import projectRouter from './resources/projects';
import timeSheets from './resources/time-sheets';
import employeeRouter from './resources/employees';

const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/timesheets', timeSheets);
app.use('/employees', employeeRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use('/projects', projectRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
