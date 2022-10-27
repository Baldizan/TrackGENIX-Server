import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('63573e59ca9eab60e9e9519e'),
  description: 'Mocked timesheet on seed with test prouposes',
  date: '2022-10-24',
  task: mongoose.Types.ObjectId('63572d9ddaa20935d72f7f1a'),
  hours: 24,
  project: mongoose.Types.ObjectId('63585a24fc13ae511600006d'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
},
{
  _id: mongoose.Types.ObjectId('63582b92155f58abf4f3bfb0'),
  description: 'Mocked timesheet on seed with test prouposes v.2',
  date: '2022-10-24',
  task: mongoose.Types.ObjectId('63572d9ddaa20935d72f7f1a'),
  hours: 24,
  project: mongoose.Types.ObjectId('63585a24fc13ae511600006f'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000066'),
},
{
  _id: mongoose.Types.ObjectId('63582b9fabd5e9d0229300ac'),
  description: 'Mocked timesheet on seed with test prouposes v.3',
  date: '2022-10-24',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('63585a24fc13ae5116000071'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae5116000068'),
},
{
  _id: mongoose.Types.ObjectId('63582bae409c42a5b45d5361'),
  description: 'Mocked timesheet on seed with test prouposes v.4',
  date: '2022-10-24',
  task: mongoose.Types.ObjectId('63572efde5172c64cb0e1197'),
  hours: 24,
  project: mongoose.Types.ObjectId('63585a24fc13ae5116000073'),
  employee: mongoose.Types.ObjectId('63585a24fc13ae511600006a'),
},
];
