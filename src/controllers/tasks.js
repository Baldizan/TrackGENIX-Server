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
      data: undefined,
      error: true,
    });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tasks.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Task with id ${id} edited.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export {
  deleteTask,
  editTask,
};
