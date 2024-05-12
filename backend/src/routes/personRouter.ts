import { Router } from 'express';
import { Request, Response } from 'express';
import { CreatePersonDto } from 'dto/create-person-dto';

export const personRouter = Router();

// Importing connection from mysql database
import connection from '../db/dbconnection';

personRouter.post('/checkid', async (req: Request, res: Response) => {
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

  try {
    const [rows] = await connection.query(sql_query, [national_card_id]);
    if (Array.isArray(rows) && rows.length !== 0) {
      return res.status(400).send({ message: 'Person with this national card id already exists' });
    }
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(500).send(err);
  }
});

personRouter.post('/register', async (req: Request, res: Response) => {
  const { national_card_id, first_name, last_name, birth_date, phone_number, email, address }: CreatePersonDto = req.body;
  
  const national_card_id_query = `SELECT * FROM person WHERE national_card_id = ?`;

  try {
    const [rows] = await connection.query(national_card_id_query, [national_card_id])

    if (Array.isArray(rows) && rows.length > 0) {
      return res.status(400).send({ message: 'Person with this national card id already exists' });
    }
  } catch (err) {
      return res.status(500).send(err);
  }

  if (!national_card_id || !first_name || !last_name || !birth_date || !phone_number || !email ||  !address) {
    return res.status(400).json({ message: 'Please provide all the fields' });
  }

  const sql_query = `INSERT INTO person (national_card_id, first_name, last_name, birth_date, phone_number, email, address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  try {
    await connection.query(sql_query, [national_card_id, first_name, last_name, birth_date, phone_number, email, address]);
    return res.status(200).send({ message: 'Person added successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
});

personRouter.post('/remove', async (req: Request, res: Response) => {
  const national_card_id: string = req.body.national_card_id;
  if (!national_card_id) {
    return res.status(400).json({ message: 'Please provide a national card id' });
  }

  const sql_query = `DELETE FROM person WHERE national_card_id = ?`;

  try {
    await connection.query(sql_query, [national_card_id]);
    return res.status(200).send({ message: 'Person removed successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }

});

personRouter.get('/', async (req:Request, res:Response) => {
  const sql_query = 'SELECT * FROM person';
  try {
    const [rows] = await connection.query(sql_query);
    return res.status(200).send(rows)
  } catch (err) {
    return res.status(500).send(err);
  }
});
