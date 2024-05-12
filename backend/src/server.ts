import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import { personRouter } from './routes/personRouter';
import { customerRouter } from './routes/customerRouter';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(json());
app.use(urlencoded({ extended: false }));

// Routes
app.use('/api/persons', personRouter);
app.use('/api/customers', customerRouter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('Express + TypeScript Server');
});

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
