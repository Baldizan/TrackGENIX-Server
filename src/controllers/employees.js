import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);
    if (Object.keys(req.query).length !== 0 && employees.length === 0) {
      throw new Error('Employees not found');
    }

    const message = employees.length ? 'Employee found' : 'There are no employees';
    return res.status(200).json({
      message,
      data: employees,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Employees not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employees.findById(id);
    if (!employees) {
      throw new Error('Employee not found');
    }
    return res.status(200).json({
      message: 'Employee found',
      data: employees,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Employee not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
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
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  createEmployees,
};
