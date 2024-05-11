import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import conn from './db/dbconnection';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }))

app.get('/customers/:username', (req: Request, res: Response) => {
  const username = req.params.username;
  conn.query(`SELECT * FROM customer WHERE customer_username = '${username}'`, (err: Error, results: any) => {
    
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('No customer found with this username');
    }
    return res.status(200).send(results);
  })
})

app.get('/', (req: Request, res: Response) => {
  res.status(201).send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
