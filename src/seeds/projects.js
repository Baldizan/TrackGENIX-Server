import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('63585a24fc13ae511600006d'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '2022-04-19T08:26:02.000Z',
  endDate: '2021-12-06T17:23:41.000Z',
  employees: [{
    rol: 'DEV',
    rate: 20,
    employee: mongoose.Types.ObjectId('63585a24fc13ae511600006c'),
  }],
  clientName: 'Rave',
  status: true,
}, {
  _id: mongoose.Types.ObjectId('63585a24fc13ae511600006f'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '2022-04-19T08:26:02.000Z',
  endDate: '2021-12-06T17:23:41.000Z',
  employees: [{
    rol: 'DEV',
    rate: 20,
    employee: mongoose.Types.ObjectId('63585a24fc13ae511600006e'),
  }],
  clientName: 'Maxi',
  status: false,
}, {
  _id: mongoose.Types.ObjectId('63585a24fc13ae5116000071'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '2022-04-19T08:26:02.000Z',
  endDate: '2021-12-06T17:23:41.000Z',
  employees: [{
    rol: 'DEV',
    rate: 20,
    employee: mongoose.Types.ObjectId('63585a24fc13ae5116000070'),
  }],
  clientName: 'Rave',
  status: true,
}, {
  _id: mongoose.Types.ObjectId('63585a24fc13ae5116000073'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '2022-04-19T08:26:02.000Z',
  endDate: '2021-12-06T17:23:41.000Z',
  employees: [{
    rol: 'DEV',
    rate: 20,
    employee: mongoose.Types.ObjectId('63585a24fc13ae5116000072'),
  }],
  clientName: 'Capi',
  status: true,
}, {
  _id: mongoose.Types.ObjectId('63585a24fc13ae5116000075'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '2022-04-19T08:26:02.000Z',
  endDate: '2021-12-06T17:23:41.000Z',
  employees: [{
    rol: 'DEV',
    rate: 20,
    employee: mongoose.Types.ObjectId('63585a24fc13ae5116000074'),
  }],
  clientName: 'Rave',
  status: false,
}];
