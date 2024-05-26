import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const transactionRouter = Router();

transactionRouter.get('/', async (req: Request, res: Response) => {
  const sql_query = `SELECT t_tb.transaction_id, t_tb.amount, t_tb.transaction_date, t_type.transaction_type_name, t_type.update_bank_balance, a.customer_email AS Payee, t_tb.from_account_id, t_tb.to_account_id
  FROM transaction_tb t_tb JOIN transaction_type t_type ON t_tb.transaction_type_id = t_type.transaction_type_id
  JOIN account a ON t_tb.from_account_id = a.account_id`;
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
  const sql_query = `SELECT t_tb.transaction_id, t_tb.amount, t_tb.transaction_date, t_type.transaction_type_name, t_type.update_bank_balance, a.customer_email AS Payee, t_tb.from_account_id, t_tb.to_account_id
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

// Get transactions by transaction_id
transactionRouter.get('/summary/:transaction_id', async (req: Request, res: Response) => {
  const { transaction_id } = req.params;
  const sql_query = `SELECT t_tb.transaction_id, t_tb.amount, t_tb.transaction_date, 
  t_type.associated_fee, t_tb.from_account_id, t_tb.to_account_id
  FROM transaction_tb t_tb 
  JOIN transaction_type t_type ON 
  t_tb.transaction_type_id = t_type.transaction_type_id
  JOIN account a ON t_tb.from_account_id = a.account_id
  WHERE t_tb.transaction_id = ?`;
  try {
    const [rows] = await connection.query(sql_query, [transaction_id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET count of transactions by account_id
transactionRouter.get('/count/:account_id', async (req: Request, res: Response) => {
  const { account_id } = req.params;
  const sql_query = `SELECT COUNT(*) AS count FROM transaction_tb WHERE from_account_id = ? OR to_account_id = ?`;
  try {
    const [rows] = await connection.query(sql_query, [account_id, account_id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});