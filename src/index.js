// eslint-disable-next-line import/no-unresolved
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, (error) => {
  if (error) {
    console.log('Fail conection to database 🔴 ', error);
  } else {
    console.log('Connected to database 🟢');
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
});
