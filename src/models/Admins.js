import mongoose from 'mongoose';

const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    firebaseUid: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  },
);

export default mongoose.model('admin', adminSchema);
