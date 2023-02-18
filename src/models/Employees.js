import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    firebaseUid: { type: String, required: true },
    project: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Project',
        },
      },
    ],
    active: { type: Boolean, required: true },
  },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  },
);

export default mongoose.model('Employee', employeeSchema);
