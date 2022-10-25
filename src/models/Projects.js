import mongoose from 'mongoose';

const { Schema } =  mongoose ;

const projectSchema = new Schema({
  employees: [
    {
      role: { type: String, require: true, enum: ['DEV', 'QA', 'TL', 'PM'] },
      rate: { type: Number, require: true },
      _id:false,
      employee: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Employee'
      }
    },
  ],
  name: { type: String, require: true },
  description: { type: String, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
  clientName: { type: String, require: true },
});

export default mongoose.model('Project', projectSchema);
