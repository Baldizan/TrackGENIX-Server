import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  firebaseUid: { type: String, required: true },
  active: { type: Boolean },
});

export default mongoose.model('SuperAdmin', superAdminSchema);
