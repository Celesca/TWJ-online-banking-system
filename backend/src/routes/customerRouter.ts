import { Router } from 'express';
import { Request, Response } from 'express';
import connection from 'db/dbconnection';

export const customerRouter = Router();

// customerRouter.post('/register', async (req: Request, res: Response) => {

//   })

customerRouter.get('/', async (req: Request, res: Response) => {
  const sql_query = `SELECT * FROM customer`;

  try {
    const [rows] = await connection.query(sql_query);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(500).send(err);
  }
});

customerRouter.get('/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  const sql_query = `SELECT * FROM customer WHERE username = ${username}`;

  try {
    const [rows] = await connection.query(sql_query);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(500).send(err);
  }
});
