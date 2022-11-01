import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  active: { type: Boolean },
});

export default mongoose.model('Employee', employeeSchema);
