import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import conn from './db/dbconnection';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: false }))

app.get('/attractions', (req: Request, res: Response) => {
  conn.query('SELECT * FROM attractions = ?', req.params.id, (_err, rows) => {
    res.send(rows)
  })
})

app.get('/', (req: Request, res: Response) => {
  res.status(201).send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
