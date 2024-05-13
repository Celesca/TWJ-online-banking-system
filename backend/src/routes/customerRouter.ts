import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';
import bcrypt from 'bcrypt';
import { CreateCustomerDto } from 'dto/create-customer-dto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const customerRouter = Router();

const secret = process.env.JWT_SECRET || 'mysecret';

customerRouter.get('/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  const sql_query = `SELECT * FROM customer WHERE username = ${username}`;

  try {
    const [rows] = await connection.query(sql_query);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(500).send(err);
  }
});

customerRouter.post('/register', async (req: Request, res: Response) => {
  const body: CreateCustomerDto = req.body;
  const { username, password, salary, national_card_id } = body;
  if (!username || !password || !salary || !national_card_id) {
    return res.status(400).json({ message: 'username, password and national_card_id are required' });
  }

  const username_check_query = `SELECT * FROM customer WHERE customer_username = ?`;
  try {
    const [rows] = await connection.query(username_check_query, [username]);
    // Convert rows to array
    const usernameCheck = Array.from(Object.values(rows));
    if (usernameCheck.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const customerData = [username, passwordHash, salary, national_card_id];

    const sql_query = `INSERT INTO customer (customer_username, password, salary, national_card_id) VALUES (?, ?, ?, ?)`;
    const results = await connection.query(sql_query, customerData);
    return res.status(201).json({ message: 'Customer created successfully', results });
  } catch (err) {
    return res.status(500).send(err);
  }
});

customerRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }
  try {
    const [result] = await connection.query(`SELECT * FROM customer WHERE customer_username = ?`, [username]);
    const customer = Array.from(Object.values(result))[0];
    const match: boolean = await bcrypt.compare(password, customer.password);
    if (!match) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // create token jwt token
    const token = jwt.sign({ username: customer.customer_username }, secret, { expiresIn: '1h' });
    return res.json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL customers
customerRouter.get('/', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    let authToken = '';
    if (authHeader) {
      authToken = authHeader.split(' ')[1];
    }
    const user: JwtPayload | string = jwt.verify(authToken, secret);
    if (typeof user !== 'string' && 'username' in user) {
      const [checkResults] = await connection.query(`SELECT * FROM customer WHERE customer_username = ?`, [
        user.username,
      ]);
      const checkResultsArray = Array.from(Object.values(checkResults));
      if (!checkResultsArray[0]) {
        throw { meesage: 'user not found' };
      }
    }

    const [results] = await connection.query(`SELECT * FROM customer`);
    res.json({
      users: results,
    });
  } catch (err) {
    console.log('error', err);
    res.status(403).json({ message: 'authentication fail', error: err });
  }
});
