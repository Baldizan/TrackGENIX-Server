import fs from 'fs';
import express from 'express';

const router = express.Router();
const tasks = require('../data/tasks.json');

router.get('/get', (req, res) => {
  res.send(tasks);
});

router.get('/get/:id', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.send('Task not found');
  }
});

router.post('/add', (req, res) => {
  const newTask = {
    id: new Date().getTime().toString().substring(6),
    name: req.body.name,
    description: req.body.description,
    project_id: req.body.project_id,
    hours: req.body.hours,
  };
  tasks.push(newTask);
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      res.send('Cannot save new task');
    } else {
      res.send('Task created');
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const filteredTask = tasks.filter((task) => task.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTask, null, 2), (err) => {
    if (err) {
      res.send('Cannot delete task');
    } else {
      res.send('Task deleted');
    }
  });
});

router.get('/filter/:name', (req, res) => {
  const taskFilter = req.params.name;
  const filteredTask = tasks.filter(
    (task) => task.name === taskFilter
     || task.description === taskFilter,
  );
  if (filteredTask.length) {
    res.send(filteredTask);
  } else {
    res.send(tasks);
  }
});

router.put('/edit/:id', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    const updateTask = req.body;
    tasks.forEach((task) => {
      if (task.id === taskId) {
        foundTask.name = updateTask.name ?? task.name;
        foundTask.description = updateTask.description ?? task.description;
        foundTask.project_id = updateTask.project_id ?? task.project_id;
        foundTask.hours = updateTask.hours ?? task.hours;

        res.json({ msg: 'Task updated', task });
      }
    });
  } else {
    res.status(400).json({ msg: 'No tasks with the id' });
  }
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      res.send('Cannot update');
    } else {
      res.send('Task updated');
    }
  });
});

export default router;
