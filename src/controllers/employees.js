import Employees from '../models/Employees';

const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndDelete(id);
    if (!result) {
      throw new Error(`Employee with id ${req.query.id} not found`);
    }
    return res.status(200).json({
      message: `Employee with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    let status = 404;
    if (!error.message.includes('Employee not found')) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const updateEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      throw new Error(`Employee ${req.query.id} not found`);
    }
    return res.status(200).json({
      message: `Employee with id ${id} edited`,
      date: result,
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (!error.message.includes('Employee not found')) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export {
  deleteEmployees,
  updateEmployees,
};
