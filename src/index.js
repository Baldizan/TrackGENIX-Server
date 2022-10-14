import express from 'express';
import mongoose from 'mongoose';
import adminsRouter from './controllers/admins';
import taskRouter from './controllers/tasks';
import projectRouter from './controllers/projects';
import timeSheets from './controllers/time-sheets';
import employeeRouter from './controllers/employees';

const admins = require('./models/Admins');

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = 'mongodb+srv://RadiumA:RadiumA@trackgenix.r6u6do6.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use('/admins', adminsRouter);
app.use('/timesheets', timeSheets);
app.use('/employees', employeeRouter);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

mongoose.connect(MONGO_URL, (error) => {
  if (error) {
    console.log('Fail conection to database', error);
  } else {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
});
