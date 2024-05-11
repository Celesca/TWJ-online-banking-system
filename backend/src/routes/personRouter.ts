import { Router } from 'express';
import { Request, Response } from 'express';

export const personRouter = Router();

// Importing connection from mysql database
import conn from '../db/dbconnection';

personRouter.post('/checkid', (req: Request, res: Response) => {
  const national_card_id: string = req.body.national_card_id;
  console.log(national_card_id);
  if (!national_card_id) {
    return res.status(400).json({ message: 'Please provide a national card id' });
  }

  const sql_query = `SELECT * FROM person WHERE national_card_id = ?`;

  conn.query(sql_query, [national_card_id], (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(rows);
    if (Array.isArray(rows) && rows.length === 0) {
      throw new Error('No person found with this national card id');
      // return res.status(404).send({ message : 'No person found with this national card id'});
    }
    return res.status(200).send(rows);
  });

  return;
});
