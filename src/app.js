import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', async (req, res) => {
  res.send('Welcome to TrackGenix!');
});

export default app;
