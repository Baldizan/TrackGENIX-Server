import Admins from '../models/Admins';
import firebase from '../helpers/firebase';

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
    const statusCode = error.message.includes('Admin not found') ? 404 : 400;
    return res.status(statusCode).json({
      message: error.toString(),
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      throw new Error('Admin not found');
    }
    return res.status(200).json({
      message: 'Admin found',
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

const createAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    const admin = await Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      active: req.body.active,
      firebaseUid: newFirebaseUser.uid,
    }).save();
    if (!admin) {
      firebase.auth().newFirebaseUser.uid.delete();
    }

    return res.status(201).json({
      message: 'Admin successfully created',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminUid = await Admins.findById(req.params.id);
    await firebase.auth().deleteUser(adminUid.firebaseUid);
    const admin = await Admins.findByIdAndDelete(req.params.id);
    if (!admin) {
      throw new Error('Admin not found');
    }
    return res.status(200).json({
      message: `Admin with id ${req.params.id} successfully deleted!`,
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
    const adminUid = await Admins.findById(req.params.id);
    await firebase.auth().updateUser(adminUid.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    const admin = await Admins.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        active: req.body.active,
      },
      {
        new: true,
      },
    );
    if (!admin) {
      throw new Error('Admin not found');
    }
    return res.status(200).json({
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
  getAllAdmins, getAdminById, createAdmin, deleteAdmin, editAdmin,
};
