import SuperAdmins from '../models/SuperAdmins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const result = await SuperAdmins.find(req.query);
    const message = result.length
      ? 'Super admins found'
      : 'There are no super admins';

    if (Object.keys(req.query).length !== 0 && result.length === 0) {
      throw new Error('Super admin not found');
    }

    return res.status(200).json({
      message,
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Super admin not found')) {
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
    let statusCode = 400;
    if (error.message.includes('Super admin not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
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
      message: 'Super admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      error: true,
      data: undefined,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmins.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Super admin not found');
    }
    return res.status(200).json({
      message: `Super admin with id ${id} successfully deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    const statusCode = error.message.includes('Super admin not found')
      ? 404
      : 400;
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    const result = await SuperAdmins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (result === null) {
      throw new Error("Super admin doesn't exist");
    }
    return res.status(200).json({
      message: 'Super admin updated',
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes("Super admin doesn't exist")) {
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
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  deleteSuperAdmin,
  updateSuperAdmin,
};
