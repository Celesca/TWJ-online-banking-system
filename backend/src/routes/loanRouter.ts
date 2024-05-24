import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const loanRouter = Router();

loanRouter.put('/:loan_id', async (req: Request, res: Response) => {
  const { loan_id } = req.params;
  const { interest_rate_change, npl } = req.body;
  const sql_query = `UPDATE loan SET interest_rate_change = ?, npl = ? WHERE loan_id = ?`;
  try {
    const [rows] = await connection.query(sql_query, [interest_rate_change, npl, loan_id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

loanRouter.get('/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  const sql_query = `SELECT l.loan_id, lt.loan_type_name, l.current_loan, lt.interest_rate, lt.interest_period,
  l.created_at, l.customer_email, l.npl, l.interest_rate_change
  FROM loan l
  JOIN loan_type lt ON l.loan_type_id = lt.loan_type_id
  WHERE l.customer_email = ?`;
  try {
    const [rows] = await connection.query(sql_query, [email]);
    return res.status(200).json({
      loanData: rows,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

loanRouter.get('/', async (req: Request, res: Response) => {
  const sql_query = `SELECT * FROM loan_type`;
  try {
    const [rows] = await connection.query(sql_query);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});
