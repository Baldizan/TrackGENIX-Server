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

export default {
  getAllSuperAdmins,
  getAdminById,
};
