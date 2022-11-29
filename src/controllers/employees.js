import Employees from '../models/Employees';
import Projects from '../models/Projects';
import firebase from '../helpers/firebase';

const deleteEmployees = async (req, res) => {
  try {
    const employeeUid = await Employees.findById(req.params.id);
		await firebase.auth().deleteUser(employeeUid.firebaseUid);
    const employee = await Employees.findByIdAndDelete(req.params.id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return res.status(200).json({
      message: `Employee with id ${req.params.id} successfully deleted!`,
      data: employee,
      error: false,
    });
  } catch (error) {
    const statusCode = error.message.includes('Employee not found') ? 404 : 400;
    return res.status(statusCode).json({
      message: error.toString(),
      error: true,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query).populate('project');
    if (Object.keys(req.query).length !== 0 && employees.length === 0) {
      throw new Error('Employees not found');
    }

    const message = employees.length
      ? 'Employee found'
      : 'There are no employees';
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

const updateEmployees = async (req, res) => {
  try {
    if (req.body.project) {
      const project = await Projects.findById(req.body.project);
      if (!project) {
        throw new Error('Project not found');
      }
    }
    const employeeUid = await Employees.findById(req.params.id);
    await firebase.auth().updateUser(employeeUid.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });
    const employee = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    if (!employee) {
      throw new Error('Employee not found');
    }
    return res.status(200).json({
      message: `Employee with id ${req.params.id} edited`,
      data: employee,
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (error.message.includes('Employee not found')) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employees = await Employees.findById(req.params.id).populate('project');
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
  let newFirebaseUser;
  let employee;
  try {
    if (req.body.project) {
      const project = await Projects.findById(req.body.project);
      if (!project) {
        throw new Error('Project not found');
      }
    }
    newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });
    employee = await Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      project: req.body.project,
      active: false,
      firebaseUid: newFirebaseUser.uid,
    }).save();

    return res.status(201).json({
      message: 'Employee successfully created',
      data: employee,
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
  deleteEmployees,
  updateEmployees,
  getAllEmployees,
  getEmployeeById,
  createEmployees,
};
