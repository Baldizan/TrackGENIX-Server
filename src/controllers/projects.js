import Projects from '../models/Projects';

const deleteProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      message: `Project with id ${result.id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    return res.status(201).json({
      message: `Project with id ${id} updated.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const assignEmployee = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { employees: req.body } },
      { new: true },
    );
    return res.status(201).json({
      message: 'Employee was created',
      data: result,
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

export {
  deleteProject,
  updateProject,
  assignEmployee,
};
