import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const historyRouter = Router();

// Query histories by staff email
historyRouter.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM
      interest_rate_change_history h JOIN staff s ON h.staff_email = s.email
      WHERE h.entity_type IN ('account', 'loan') ORDER BY h.change_id DESC`);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Query histories by manager
historyRouter.get('/manager', async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM
      interest_rate_change_history h JOIN staff s ON h.staff_email = s.email
      ORDER BY h.change_id DESC`);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});