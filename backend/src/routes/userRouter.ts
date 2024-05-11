import { Router } from 'express';
import { Request, Response } from 'express';

export const userRouter = Router();

// Importing connection from mysql database
import conn from '../db/dbconnection';

userRouter.post('/checkid', (req: Request, res: Response) => {
  const national_card_id: string = req.body.national_card_id;
  console.log(national_card_id)
  if (!national_card_id) {
    return res.status(400).json({ message: 'Please provide a national card id' });
  }

  const sql_query = `SELECT * FROM user WHERE nation_card_id = ?`;

  conn.query(sql_query, [national_card_id], (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(rows);
  });

  return;
});
