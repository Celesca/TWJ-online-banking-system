import { Request, Response } from 'express';
import { Router } from 'express';
import connection from '../db/dbconnection';

export const accountRouter = Router();

accountRouter.get('/', async (req: Request, res: Response) => {
  const sql_query = `SELECT * FROM account`;
  try {
    const [rows] = await connection.query(sql_query);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET account by username
accountRouter.get('/:username', async (req: Request, res: Response) => {
  const { username } = req.params;
  const sql_query = `SELECT account.account_id, account.customer_username, account.balance, account_type.account_type_name, person.first_name, person.last_name
  FROM account
  JOIN account_type ON account.account_type_id = account_type.account_type_id
  JOIN customer ON customer.customer_username = account.customer_username
  JOIN person ON customer.national_card_id = person.national_card_id
   WHERE account.customer_username = ?`;
  try {
    const [rows] = await connection.query(sql_query, [username]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create account
accountRouter.post('/create-account', async (req: Request, res: Response) => {
  const { account_type_id, username } = req.body;
  if (!account_type_id || !username) {
    return res.status(400).json({ message: 'account_type_id and username are required' });
  }
  console.log('account_type_id:', account_type_id, 'username:', username);
  try {
    const accountData = [account_type_id, username];
    const sql_query = `INSERT INTO account (account_type_id, customer_username) VALUES (?, ?)`;
    const results = await connection.query(sql_query, accountData);
    return res.status(201).json({ message: 'Account created successfully', results });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Deposit to account
accountRouter.post('/deposit', async (req: Request, res: Response) => {
  const { amount, account_id } = req.body;
  if (!amount || !account_id) {
    return res.status(400).json({ message: 'amount and account_id are required' });
  }
  try {
    const accountData = [amount, account_id];
    const sql_query = `UPDATE account SET balance = balance + ? WHERE account_id = ?`;
    const results = await connection.query(sql_query, accountData);
    return res.status(201).json({ message: 'Deposit successful', results });
  } catch (err) {
    return res.status(500).json(err);
  }
});
