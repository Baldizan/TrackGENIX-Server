import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Tasks' },
  hours: { type: Number, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  employee: { type: Schema.Types.ObjectId, ref: 'Employees' },
});

export default mongoose.model('timeSheets', timeSheetsSchema);
