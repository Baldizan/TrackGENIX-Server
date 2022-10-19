import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  employees: [
    {
      id: mongoose.SchemaTypes.ObjectId,
      role: { type: String, require: true, enum: ['DEV', 'QA', 'TL', 'PM'] },
      rate: { type: Number, require: true },
    }],
  name: { type: String, require: true },
  description: { type: String, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
  clientName: { type: String, require: true },
});

export default mongoose.model('Project', projectSchema);
