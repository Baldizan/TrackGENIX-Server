import Projects from '../models/Projects';

const deleteProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndDelete(req.params.id);
    if (!result) {
      throw new Error('Project not found');
    }
    return res.status(204).json({
      message: `Project with Id ${result.id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
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
      req.body,
      { new: true },
    );
    if (!result) {
      throw new Error('Project not found');
    }
    return res.status(201).json({
      message: `Project with Id ${id} updated.`,
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
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
    if (!result) {
      throw new Error('Project not found');
    }
    return res.status(201).json({
      message: 'Employee was created',
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
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
  deleteProject,
  updateProject,
  assignEmployee,
};
