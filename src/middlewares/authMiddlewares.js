import firebase from '../helpers/firebase';

const checkAuth = (roles) => async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }
    const user = await firebase.auth().verifyIdToken(token);
    const URL = {
      SUPERADMIN: '/super-admins/',
      ADMIN: '/admins/',
      EMPLOYEE: '/employees/',
    };
    const isSelfSearch = Boolean(
      req.route.methods.get || req.route.methods.put,
      req.originalUrl === URL[user.role],
      req.query.email === user.email,
    );
    if (!roles.includes(user.role) && !isSelfSearch) {
      return res.status(403).json({ message: 'Invalid role.' });
    }
    req.firebaseUid = user.uid;
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

export default checkAuth;
