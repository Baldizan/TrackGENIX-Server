import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    clientName: { type: String, required: true },
    active: { type: Boolean, required: true },
    projectManager: { type: Schema.Types.ObjectId, ref: 'Employee' },
    employees: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Employee',
        },
        role: { type: String, required: true, enum: ['DEV', 'QA', 'TL'] },
        rate: { type: Number, required: true },
      },
    ],
  },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  },
);

export default mongoose.model('Project', projectSchema);
