import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  startDate: { type: Date, default: () => Date.now() },
  endDate: { type: Date, default: () => Date.now() },
  clientName: { type: String },
  employees: [
    {
      id: mongoose.SchemaTypes.ObjectId,
      role: { type: String, enum: ['DEV', 'QA', 'TL', 'PM'] },
      rate: { type: Number },
    }],
});

export default mongoose.model('Project', projectSchema);
