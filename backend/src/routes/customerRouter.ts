import { Router } from 'express';
import { Request, Response } from 'express';
import connection from 'db/dbconnection';
import { QueryResult } from 'mysql2';

export const customerRouter = Router();

customerRouter.get('/customers/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  await connection.query(
    `SELECT * FROM customer WHERE customer_username = '${username}'`,
    (err: Error, results: QueryResult) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length === 0) {
        return res.status(404).send('No customer found with this username');
      }
      return res.status(200).send(results);
    },
  );
});
