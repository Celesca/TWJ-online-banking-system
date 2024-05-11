import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import conn from './db/dbconnection';
import { personRouter } from './routes/personRouter';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/persons', personRouter);



app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('Express + TypeScript Server');
});

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;