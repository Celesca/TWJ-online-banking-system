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
