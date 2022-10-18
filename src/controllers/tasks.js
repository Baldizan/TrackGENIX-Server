import Tasks from '../models/Tasks';

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tasks.findByIdAndDelete(id);

    return res.status(204).json({
      message: `Task with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
      error: true,
    });
  }
};

// router.put('/edit/:id', (req, res) => {
//   const taskId = req.params.id;
//   const foundTask = tasks.find((task) => task.id === taskId);
//   if (foundTask) {
//     const updateTask = req.body;
//     tasks.forEach((task) => {
//       if (task.id === taskId) {
//         foundTask.name = updateTask.name ?? task.name;
//         foundTask.description = updateTask.description ?? task.description;
//         foundTask.project_id = updateTask.project_id ?? task.project_id;
//         foundTask.hours = updateTask.hours ?? task.hours;

//         res.json({ msg: 'Task updated', task });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: 'No tasks with the id' });
//   }
//   fs.writeFile('src/data/tasks.json', JSON.stringify(tasks, null, 2), (err) => {
//     if (err) {
//       res.send('Cannot update');
//     } else {
//       res.send('Task updated');
//     }
//   });
// });

export default{
  deleteTask,
};
