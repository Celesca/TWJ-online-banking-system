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

// Get transactions by account_id
transactionRouter.get('/:account_id', async (req: Request, res: Response) => {
  const { account_id } = req.params;
  const sql_query = `SELECT t_tb.transaction_id, t_tb.amount, t_tb.transaction_date, t_type.transaction_type_name, t_type.update_bank_balance, a.customer_username AS Payee, t_tb.from_account_id, t_tb.to_account_id
  FROM transaction_tb t_tb JOIN transaction_type t_type ON t_tb.transaction_type_id = t_type.transaction_type_id
  JOIN account a ON t_tb.from_account_id = a.account_id
  WHERE t_tb.from_account_id = ? OR t_tb.to_account_id = ?`;
  try {
    const [rows] = await connection.query(sql_query, [account_id, account_id]);
    console.log(rows);
    return res.status(200).json(rows);
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
    await connection.beginTransaction;

    const accountData = [amount, account_id];
    const sql_query = `UPDATE account SET balance = balance + ? WHERE account_id = ?`;
    const results = await connection.query(sql_query, accountData);
    const transaction_query = `INSERT INTO transaction_tb (transaction_type_id, amount, from_account_id, to_account_id) VALUES (1, ?, ?, ?)`;
    const transactionData = [amount, account_id, account_id];
    await connection.query(transaction_query, transactionData);

    await connection.commit;

    return res.status(201).json({ message: 'Deposit successful', results });
  } catch (err) {
    connection.rollback;
    return res.status(500).json(err);
  }
});
