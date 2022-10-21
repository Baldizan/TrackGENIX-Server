import Tasks from '../models/Tasks';

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findByIdAndDelete(id);

    if (!tasks) {
      throw new Error('No task found');
    }

    return res.status(204).json({
      message: `Task with id ${tasks.id} deleted`,
      data: tasks,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('No task found')) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true },
    );

    if (!tasks) {
      throw new Error('No task found');
    }

    return res.status(200).json({
      message: `Task with id ${id} edited.`,
      data: tasks,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('No task found')) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export {
  deleteTask,
  editTask,
};
