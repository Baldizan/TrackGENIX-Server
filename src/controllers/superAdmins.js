import SuperAdmins from '../models/SuperAdmins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find();
    return res.status(200).json({
      message: 'Super admins found',
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const getAdminById = async (req, res) => {
  const idAdmin = req.params.id;
  try {
    const superAdmin = await SuperAdmins.findById(idAdmin);
    return res.status(200).json({
      message: `Admin with id: ${idAdmin} found`,
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.lastName,
      password: req.body.password,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super admin created succesfully',
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

export default {
  getAllSuperAdmins,
  getAdminById,
  createSuperAdmin,
};
