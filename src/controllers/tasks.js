import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find(req.query);
    if (tasks.length === 0) {
      throw new Error('Task not found');
    }
    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findById(id);

    return res.status(200).json({
      message: 'Task found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Tasks({
      name: req.body.name,
      description: req.body.description,
      project_id: req.body.project_id,
      hours: req.body.hours,
    });

    const result = await task.save();
    return res.status(201).json({
      message: 'Task created successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      error: true,
    });
  }
};

export {
  getAllTasks,
  getTaskById,
  createTask,
};
