import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, (error) => {
  if (error) {
    // eslint-disable-next-line
    console.log('Fail conection to database 🔴 ', error);
  } else {
    // eslint-disable-next-line
    console.log('Connected to database 🟢');
    app.listen(port, () => {
      // eslint-disable-next-line
      console.log(`App listening on port ${port}`);
    });
  }
});
