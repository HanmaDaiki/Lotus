import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json())

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🚩 GATEWAY runnings on http://localhost:${PORT}`)
});
