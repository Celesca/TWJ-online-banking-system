import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'mysecret';

export const staffRouter = Router();

// Staff Login
staffRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }
  try {
    const [result] = await connection.query(`SELECT * FROM staff WHERE email = ?`, [email]);
    const staff = Array.from(Object.values(result))[0];
    console.log(staff.position);
    if (!staff) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    if (password !== staff.password) {
      return res.status(400).send({ message: 'Password does not match' });
    }
    // create token jwt token
    const token = jwt.sign({ username: staff.customer_username }, secret, { expiresIn: '1h' });
    return res.json({
      message: 'Login successful',
      firstname: staff.first_name,
      role: staff.position,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Get Customers by Staff Email
staffRouter.get('/customers/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const [results] = await connection.query(
      `SELECT email, first_name, last_name, phone_number, national_card_id FROM customer WHERE staff_email = ?`,
      [email],
    );
    res.json({
      users: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get Insight by Customer Email
staffRouter.get('/customers/insight/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const [results] = await connection.query(
      `SELECT a.account_id, a_t.account_type_name, a.balance, a.status, a_t.interest_rate, a.interest_rate_change
      FROM account a 
      JOIN account_type a_t 
      ON a_t.account_type_id = a.account_type_id
      WHERE a.customer_email = ?`,
      [email],
    );
    const [sumResults] = await connection.query(
      `SELECT SUM(balance) as total_balance
            FROM account
            WHERE customer_email = ?`,
      [email],
    );
    const totalBalance = Array.from(Object.values(sumResults))[0].total_balance;
    const [loanResults] = await connection.query(
      `SELECT l.loan_id, lt.loan_type_name, l.npl, lt.interest_rate, l.interest_rate_change, l.current_loan 
            FROM loan l
            JOIN loan_type lt
            ON l.loan_type_id = lt.loan_type_id
            WHERE customer_email = ?`,
      [email],
    );
    res.status(200).json({
      accounts: results,
      total_balance: totalBalance,
      loans: loanResults,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get staff Info with customer email
staffRouter.get('/:customer_email', async (req: Request, res: Response) => {
  const { customer_email } = req.params;
  const sql_query = `SELECT s.email, s.first_name, s.last_name, s.phone_number 
  FROM staff s JOIN customer c ON s.email = c.staff_email WHERE c.email = ?`;
  try {
    const [rows] = await connection.query(sql_query, [customer_email]);
    return res.status(200).json({
      staffData: rows,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get all staffs
staffRouter.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM staff`);
    return res.status(200).json({
      staffs: rows,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});