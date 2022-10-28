import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
  clientName: { type: String, require: true },
  status: { type: Boolean, require: true },
  employees:
  [
    {
      employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
      },
      role: { type: String, require: true, enum: ['DEV', 'QA', 'TL', 'PM'] },
      rate: { type: Number, require: true },
    },
  ],
});

export default mongoose.model('Project', projectSchema);
