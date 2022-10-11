const express = require('express');

const router = express.Router();
const fs = require('fs');
const tasks = require('../data/tasks.json');

// GET ALL TASK
router.get('/getAll', (req, res) => {
  res.send(tasks);
});

// GET TASK BY ID
router.get('/getById/:id', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.send('Task not found');
  }
});

// ADD TASK
router.post('/add', (req, res) => {
  const newTask = req.body;
  // req.body.name
  tasks.push(newTask);
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.send('Cannot save new task');
    } else {
      res.send('Task created');
    }
  });
});

// DELETE TASK
router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const filteredTask = tasks.filter((task) => task.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTask), (err) => {
    if (err) {
      res.send('Cannot delete task');
    } else {
      res.send('Task deleted7');
    }
  });
});

// FILTER BY NAME
router.get('/filter/:name', (req, res) => {
  const taskName = req.params.name;
  const foundTaskName = tasks.find((task) => task.name === taskName);
  const filteredTaskName = tasks.filter((task) => task.name === taskName);
  if (foundTaskName) {
    res.send(filteredTaskName);
  } else {
    res.send(tasks);
  }
});

// FILTER BY DESCRIPTION
router.get('/filter/:description', (req, res) => {
  const taskDes = req.params.description;
  const foundTaskDes = tasks.find((task) => task.description === taskDes);
  const filteredTaskDes = tasks.filter((task) => task.description === taskDes);
  if (foundTaskDes) {
    res.send(filteredTaskDes);
  } else {
    res.send(tasks);
  }
});

// EDIT TASK
router.put('/edit/:id', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    const updateTask = req.body;
    tasks.forEach((task) => {
      if (task.id === taskId) {
        foundTask.name = updateTask.name ? updateTask.name : task.name;
        foundTask.description = updateTask.description ? updateTask.description : task.description;
        foundTask.proyect_id = updateTask.proyect_id ? updateTask.proyect_id : task.proyect_id;
        foundTask.hours = updateTask.hours ? updateTask.hours : task.hours;

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

module.exports = router;
