import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const transactionRouter = Router();

transactionRouter.get('/', async (req: Request, res: Response) => {
  const sql_query = `SELECT * FROM transaction_tb`;
  try {
    const [rows] = await connection.query(sql_query);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Deposit to account
transactionRouter.post('/deposit', async (req: Request, res: Response) => {
  const { amount, account_id } = req.body;
  if (!amount || !account_id) {
    return res.status(400).json({ message: 'amount and account_id are required' });
  }
  try {
    const accountData = [amount, account_id];
    const sql_query = `UPDATE account SET balance = balance + ? WHERE account_id = ?`;
    const results = await connection.query(sql_query, accountData);
    const transaction_query = `INSERT INTO transaction_tb (transaction_type_id, amount, from_account_id, to_account_id) VALUES (1, ?, ?, ?)`;
    const transactionData = [amount, account_id, account_id];
    await connection.query(transaction_query, transactionData);
    return res.status(201).json({ message: 'Deposit successful', results });
  } catch (err) {
    return res.status(500).json(err);
  }
});
