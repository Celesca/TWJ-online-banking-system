import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const managerRouter = Router();

managerRouter.get('/customers', async (req: Request, res: Response) => {
  const sql_query = `SELECT email, first_name, last_name, phone_number, national_card_id FROM customer`;
  try {
    const [results] = await connection.query(sql_query);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

managerRouter.get('/bank-account', async (req: Request, res: Response) => {
  const sql_query = `SELECT * FROM account WHERE account_id = "0000000001"`; // Change account_id as needed
  try {
    const [results] = await connection.query(sql_query);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

managerRouter.get('/account_types', async (req: Request, res: Response) => {
  const sql_query = `SELECT * FROM account_type WHERE account_type_id != 0`;
  try {
    const [results] = await connection.query(sql_query);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

managerRouter.get('/loan_types', async (req: Request, res: Response) => {
  const sql_query = `SELECT * FROM loan_type`;
  try {
    const [results] = await connection.query(sql_query);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

managerRouter.put('/account_types/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { interest_rate, old_interest_rate, email } = req.body;
  const sql_query = `UPDATE account_type SET interest_rate = ? WHERE account_type_id = ?`;
  try {
    const [results] = await connection.query(sql_query, [interest_rate, id]);
    const history_query = `INSERT INTO interest_rate_change_history (entity_type, entity_id, old_interest_rate, new_interest_rate, staff_email) VALUES (?, ?, ?, ?, ?)`;
    const [history_results] = await connection.query(history_query, [
      'account_type',
      id,
      old_interest_rate,
      interest_rate,
      email,
    ]);
    console.log(history_results);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

managerRouter.put('/loan_types/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { old_interest_rate, interest_rate, email } = req.body;
  console.log(req.body);
  const sql_query = `UPDATE loan_type SET interest_rate = ? WHERE loan_type_id = ?`;
  try {
    await connection.query(sql_query, [interest_rate, id]);
    const history_query = `INSERT INTO interest_rate_change_history (entity_type, entity_id, old_interest_rate, new_interest_rate, staff_email) VALUES (?, ?, ?, ?, ?)`;
    const [history_results] = await connection.query(history_query, [
      'loan_type',
      id,
      old_interest_rate,
      interest_rate,
      email,
    ]);
    console.log(history_results);
    res.status(200).json({
      history_results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
