import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';
import bcrypt from 'bcrypt';
import { CreateCustomerDto } from 'dto/create-customer-dto';

export const customerRouter = Router();

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

customerRouter.post('/register', async (req: Request, res: Response) => {
  const body: CreateCustomerDto = req.body;
  const { username, password, salary, national_card_id } = body;
  if (!username || !password || !salary || !national_card_id) {
    return res.status(400).json({ message: 'username, password and national_card_id are required' });
  }

  const username_check_query = `SELECT * FROM customer WHERE customer_username = ?`;
  try {
    const [rows] = await connection.query(username_check_query, [username]);
    // Convert rows to array
    const usernameCheck = Array.from(Object.values(rows));
    if (usernameCheck.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const customerData = [username, passwordHash, salary, national_card_id];

    const sql_query = `INSERT INTO customer (customer_username, password, salary, national_card_id) VALUES (?, ?, ?, ?)`;
    const results = await connection.query(sql_query, customerData);
    return res.status(201).json({ message: 'Customer created successfully', results });
  } catch (err) {
    return res.status(500).send(err);
  }
});
