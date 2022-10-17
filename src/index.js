import express from 'express';
import mongoose from 'mongoose';
import superAdminRoute from './routes/superAdmins';

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URL = 'mongodb+srv://RadiumA:RadiumA@trackgenix.r6u6do6.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use('/superAdmins', superAdminRoute);

app.get('/', async (req, res) => {
  res.send('Welcome to TrackGenix!');
});

mongoose.connect(MONGO_URL, (error) => {
  if (error) {
    console.log('Fail conection to database 🔴 ', error);
  } else {
    console.log('Connected to database 🟢');
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
});
