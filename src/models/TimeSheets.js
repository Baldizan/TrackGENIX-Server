import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  task: { type: Schema.Types.ObjectId, required: true, ref: 'Tasks' },
  hours: { type: Number, required: true },
  project: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  employee: { type: Schema.Types.ObjectId, required: true, ref: 'Employees' },
});

export default mongoose.model('timeSheets', timeSheetsSchema);
