import { Router } from 'express';
import { Request, Response } from 'express';
import { CreatePersonDto } from 'dto/create-person-dto';

export const personRouter = Router();

// Importing connection from mysql database
import conn from '../db/dbconnection';

personRouter.post('/checkid', (req: Request, res: Response) => {
  const national_card_id: string = req.body.national_card_id;

  if (!national_card_id) {
    return res.status(400).json({ message: 'Please provide a national card id' });
  }

  // Check whether it's string
  if (typeof national_card_id !== 'string') {
    return res.status(400).json({ message: 'National card id should be a string' });
  }

  if (national_card_id.length !== 13) {
    return res.status(400).json({ message: 'National card id should be 13 digits' });
  }

  const sql_query = `SELECT * FROM person WHERE national_card_id = ?`;

  conn.query(sql_query, [national_card_id], (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(rows);
    if (Array.isArray(rows) && rows.length === 0) {
      return res.status(404).send({ message: 'No person found with this national card id' });
    }
    return res.status(200).send(rows);
  });
  return;
});

personRouter.post('/add', async (req: Request, res: Response) => {
  const { national_card_id, first_name, last_name, birth_date, phone_number, address }: CreatePersonDto = req.body;
  if (!national_card_id || !first_name || !last_name || !birth_date || !phone_number || !address) {
    return res.status(400).json({ message: 'Please provide all the fields' });
  }

  const sql_query = `INSERT INTO person (national_card_id, first_name, last_name, birth_date, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)`;

  await conn.query(
    sql_query,
    [national_card_id, first_name, last_name, birth_date, phone_number, address],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send({ message: 'Person added successfully' });
    },
  );
  return;
});

personRouter.post('/remove', async (req: Request, res: Response) => {
  const national_card_id: string = req.body.national_card_id;
  if (!national_card_id) {
    return res.status(400).json({ message: 'Please provide a national card id' });
  }

  const sql_query = `DELETE FROM person WHERE national_card_id = ?`;

  await conn.query(sql_query, [national_card_id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send({ message: 'Person removed successfully' });
  });
  return;
});
