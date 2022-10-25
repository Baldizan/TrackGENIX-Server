import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('63573e59ca9eab60e9e9519e'),
  description: 'Mocked timesheet on seed with test prouposes',
  date: '2022-10-24',
  task: mongoose.Types.ObjectId('6350c0fc3ffdd3ec77f6a2ac'),
  hours: 24,
  project: mongoose.Types.ObjectId('634c973322e3ae91f635cf8f'),
  employee: mongoose.Types.ObjectId('63571eb19298965ae634f74d'),
}];
