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

export default {
  getAllEmployees,
};
