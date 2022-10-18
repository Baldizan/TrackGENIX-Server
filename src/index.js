import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import adminRoutes from './routes/admins';

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = 'mongodb+srv://RadiumA:RadiumA@trackgenix.r6u6do6.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use(routes);
app.use('/admins', adminRoutes);

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
