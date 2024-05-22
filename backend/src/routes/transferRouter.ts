import { Router } from 'express';

import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const transferRouter = Router();

// Get all transfers
transferRouter.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query('SELECT * FROM transfer');
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});
