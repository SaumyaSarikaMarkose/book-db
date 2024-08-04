import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import "reflect-metadata";
import {AppDataSource} from './data-source';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import cors from 'cors';
import bookRoutes from './routes/book.routes';


dotenv.config({ path: './src/env/.env' });

// const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
const port =  process.env.PORT;

app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

  AppDataSource.initialize()
    .then(() => {
      console.log('Connected to the database');
    })
    .catch(error => console.log('Database connection error:', error));
  
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
