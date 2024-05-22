import { Router } from 'express';

import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const transferRouter = Router();

// Get all transfers
transferRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).json('Get all transfers');
});

const transferInBank = async (from_account_id: string, to_account_id: string, amount: number) => {
  connection.beginTransaction;
  try {
    const query = 'UPDATE account SET balance = balance - ? WHERE account_id = ?';
    await connection.execute(query, [amount, from_account_id]);

    const query2 = 'UPDATE account SET balance = balance + ? WHERE account_id = ?';
    await connection.execute(query2, [amount, to_account_id]);
    connection.commit;
  } catch (error) {
    connection.rollback;
    return error;
  }
  return;
};

const transferOutsideBank = async (from_account_id: string, to_account_id: string, amount: number) => {
  connection.beginTransaction;
  try {
    const query = 'UPDATE account SET balance = balance - ? WHERE account_id = ?';
    await connection.execute(query, [amount, from_account_id]);
    connection.commit;
  } catch (error) {
    connection.rollback;
    return error;
  }
  return;
};

transferRouter.post('/', async (req: Request, res: Response) => {
  const { amount, from_account_id, to_account_id, transaction_type_id } = req.body;
  if (!amount || !from_account_id || !to_account_id || !transaction_type_id) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  const query =
    'INSERT INTO transaction_tb (amount, from_account_id, to_account_id, transaction_type_id) VALUES (?, ?, ?, ?)';
  try {
    if (transaction_type_id === 3) {
      await transferInBank(from_account_id, to_account_id, amount);
    } else if (transaction_type_id === 2) {
      await transferOutsideBank(from_account_id, to_account_id, amount);
    }

    const [rows] = await connection.execute(query, [amount, from_account_id, to_account_id, transaction_type_id]);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(400).json(error);
  }
});
