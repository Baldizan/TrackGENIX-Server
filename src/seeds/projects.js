import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('63585a24fc13ae5116000065'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '4/30/2022',
  endDate: '6/13/2022',
  employees: [{
    rol: 'DEV',
    rate: 20,
    employee: mongoose.Types.ObjectId('63585a24fc13ae5116000064'),
  }],
}, {
  _id: mongoose.Types.ObjectId('63585a24fc13ae5116000067'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '4/30/2022',
  endDate: '6/13/2022',
  employees: [{
    rol: 'DEV',
    rate: 20,
    employee: mongoose.Types.ObjectId('63585a24fc13ae5116000066'),
  }],
}];
