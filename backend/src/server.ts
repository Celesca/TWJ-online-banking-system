import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import mysql, { PoolOptions } from "mysql2"

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: false }))

const access: PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'bank_db',
}

const conn = mysql.createPool(access)

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
