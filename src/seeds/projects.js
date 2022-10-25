import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('63580774bc5b0634809b67d5'),
  name: 'Zara',
  description: 'nullam orci pede venenatis non stodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
  startDate: '4/30/2022',
  endDate: '6/13/2022',
  employees: [{
    employee: {
      _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000005'),
    },
  }, {
    employee: {
      _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000006'),
    },
  }, {
    employee: {
      _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000007'),
    },
  }, {
    employee: {
      _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000008'),
    },
  }, {
    employee: {
      _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000009'),
    },
  }],
}, {
  _id: mongoose.Types.ObjectId('6357ee1efc13ae37e7000aa6'),
  name: 'Barthel',
  description: 'ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu',
  startDate: '12/5/2021',
  endDate: '5/7/2022',
  employees: [
    {
      employee: {
        _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000008'),
      },
    }, {
      employee: {
        _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000009'),
      },
    },
  ],
}, {
  _id: {
    _id: '6357ee1efc13ae37e7000aa7',
  },
  name: 'Sansone',
  description: 'sit amet turpis elementum ligula vehicula consequat morbi a ipsum',
  startDate: '9/24/2022',
  endDate: '11/24/2021',
  employees: [
    {
      employee: {
        _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000008'),
      },
    }, {
      employee: {
        _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000009'),
      },
    },
  ],
}, {
  _id: {
    _id: '6357ee1efc13ae37e7000aa8',
  },
  name: 'Grazia',
  description: 'aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum',
  startDate: '9/6/2022',
  endDate: '11/23/2021',
  employees: [
    {
      employee: {
        _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000005'),
      },
    }, {
      employee: {
        _id: mongoose.Types.ObjectId('63575b52fc13ae2eee000006'),
      },
    },
  ],
}];
