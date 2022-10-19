import Admins from '../models/Admins';

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      message: `Admin whit id ${admin.id} deleted successfully`,
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Admin not found',
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    );
    return res.status(201).json({
      message: `Admin whit id ${admin.id} edited successfully`,
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Admin not found',
      error: true,
    });
  }
};

export default {
  deleteAdmin,
  editAdmin,
};
