import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

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

const createEmployees = async (req, res) => {
  try {
    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      error,
    });
  }
};

export {
  getAllEmployees,
  getEmployeesById,
  createEmployees,
};
