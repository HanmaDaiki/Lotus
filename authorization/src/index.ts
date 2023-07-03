import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { cors } from './midlleware/cors';
import { errorHandler } from './midlleware/errorHandler';
import usersRoutes from './routes/usersRoutes';

dotenv.config();

const { PORT, DB_URL } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/lotus-auth', {
  useNewUrlParser: true
} as ConnectOptions)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.use(express.json());
app.use(cors);

app.use(usersRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`👋 AUTHORIZATION runnings on http://localhost:${PORT}`)
});
