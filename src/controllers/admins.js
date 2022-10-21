import Admins from '../models/Admins';

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndDelete(req.params.id);
    if (!admin) {
      throw new Error('Admin not found');
    }
    return res.status(204).json({
      message: `Admin with id ${admin.id} deleted successfully`,
      data: admin,
      error: false,
    });
  } catch (error) {
    const statusCode = error.message.includes('Admin not found') ? 404 : 400;
    return res.status(statusCode).json({
      message: error.toString(),
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!admin) {
      throw new Error('Admin not found');
    }
    return res.status(201).json({
      message: `Admin with id ${admin.id} edited successfully`,
      data: admin,
      error: false,
    });
  } catch (error) {
    const statusCode = error.message.includes('Admin not found') ? 404 : 400;
    return res.status(statusCode).json({
      message: error.toString(),
      error: true,
    });
  }
};

export {
  deleteAdmin,
  editAdmin,
};
