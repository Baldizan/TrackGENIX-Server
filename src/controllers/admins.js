import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (Object.keys(req.query).length !== 0 && admins.length === 0) {
      throw new Error('no admins found');
    }
    const message = admins.length ? 'Admin found' : 'No admins found';
    return res.status(200).json({
      message,
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findById(id);
    return res.status(200).json({
      message: 'Admin found',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Admin not found, an error occurred',
      error,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
};
