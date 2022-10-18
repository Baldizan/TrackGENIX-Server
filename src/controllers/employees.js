import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = Employees.find();

    return res.status(200).json({
      message: 'Employee found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const getEmployeesById = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employees.findById(id);

    return res.status(200).json({
      message: 'Employee found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeesById,
};
