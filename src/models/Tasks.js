import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    description: { type: String, required: true },
  },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  },
);

export default mongoose.model('Tasks', taskSchema);
