import SuperAdmins from '../models/SuperAdmins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const result = await SuperAdmins.find(req.query);

    if (Object.keys(req.query).length !== 0 && result.length === 0) {
      throw new Error('Super admin not found');
    }

    return res.status(200).json({
      message: 'Super admins found',
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Super admin with')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  const idSuperAdmin = req.params.id;
  try {
    const superAdmin = await SuperAdmins.findById(idSuperAdmin);
    if (superAdmin === null) {
      throw new Error('Super admin not found');
    }
    return res.status(200).json({
      message: `Super admin with id: ${idSuperAdmin} found`,
      data: superAdmin,
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

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super admin created succesfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.toString(),
      error: true,
      data: undefined,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  const idSuperAdmin = req.params.id;
  SuperAdmins.findByIdAndDelete(idSuperAdmin, (err, superAdmin) => {
    if (err) {
      return res.status(404).json({
        message: err,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Super admin with id: ${idSuperAdmin} deleted`,
      data: superAdmin,
      error: false,
    });
  });
};

const updateSuperAdmin = (req, res) => {
  SuperAdmins.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: err.message,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Super admin updated',
      data: result,
      error: false,
    });
  });
};

export {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  deleteSuperAdmin,
  updateSuperAdmin,
};
