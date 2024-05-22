import { Router } from 'express';

import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const transferRouter = Router();

// Get all transfers
transferRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).json('Get all transfers');
});

transferRouter.post('/', async (req: Request, res: Response) => {
  const { amount, from_account_id, to_account_id, transaction_type_id } = req.body;
  console.log(req.body)
  if (!amount || !from_account_id || !to_account_id || !transaction_type_id) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  const query = 'INSERT INTO transaction_tb (amount, from_account_id, to_account_id, transaction_type_id) VALUES (?, ?, ?, ?)';
  try {
    const [rows] = await connection.execute(query, [amount, from_account_id, to_account_id, transaction_type_id]);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(400).json(error);
  }

  

})