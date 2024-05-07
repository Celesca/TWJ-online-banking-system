import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';

dotenv.config();

const app: Application = express();
app.use(json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(201).send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
