import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  project_id: mongoose.SchemaTypes.ObjectId,
  hours: { type: Number, required: true },
});

export default mongoose.model('Tasks', taskSchema);
