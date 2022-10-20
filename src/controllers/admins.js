import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (Object.keys(req.query).length !== 0 && admins.length === 0) {
      throw new Error('Admin not found');
    }
    const message = admins.length ? 'Admin found' : 'There are no admins';
    return res.status(200).json({
      message,
      data: admins,
      error: false,
    });
  } catch (error) {
    const statusCode = error.message.includes('Admin not found') ? 404 : 404;
    return res.status(statusCode).json({
      message: error.toString(),
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    return res.status(200).json({
      message: 'Admin found',
      data: admin,
      error: false,
    });
  } catch (error) {
    const statusCode = error.name === 'CastError' ? 404 : 400;
    return res.status(statusCode).json({
      message: error.toString(),
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      error,
    });
  }
};

export {
  getAllAdmins,
  getAdminById,
  createAdmin,
};
