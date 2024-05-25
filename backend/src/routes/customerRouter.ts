import { Router } from 'express';
import { Request, Response } from 'express';
import connection from '../db/dbconnection';
import { CreateCustomerDto } from 'dto/create-customer-dto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const customerRouter = Router();

const secret = process.env.JWT_SECRET || 'mysecret';

customerRouter.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstname, lastname, dob, national_card_id, phone_number, address } =
    req.body as CreateCustomerDto;
  if (!email || !password || !firstname || !lastname || !dob || !national_card_id || !phone_number || !address) {
    return res.status(400).json({ message: 'field are not fulfilled' });
  }

  const username_check_query = `SELECT * FROM customer WHERE email = '${email}'`;
  const username_staff_check_query = `SELECT * FROM staff WHERE email = '${email}'`;
  try {
    const [rows] = await connection.query(username_check_query);
    // Convert rows to array
    const usernameCheck = Array.from(Object.values(rows));
    if (usernameCheck.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const [rows2] = await connection.query(username_staff_check_query);
    // Convert rows to array
    const usernameStaffCheck = Array.from(Object.values(rows2));
    if (usernameStaffCheck.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const customerData = [email, password, firstname, lastname, dob, national_card_id, phone_number, address];

    const sql_query = `INSERT INTO customer (email, password, first_name, last_name, birth_date, national_card_id, phone_number, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const results = await connection.query(sql_query, customerData);
    return res.status(201).json({ message: 'Customer created successfully', results });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Customer Login
customerRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }
  try {
    const [result] = await connection.query(`SELECT * FROM customer WHERE email = ?`, [email]);
    const customer = Array.from(Object.values(result))[0];
    console.log(customer);
    if (!customer) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    if (password !== customer.password) {
      return res.status(400).send({ message: 'Password does not match' });
    }
    // create token jwt token
    const token = jwt.sign({ username: customer.customer_username }, secret, { expiresIn: '1h' });
    return res.json({
      message: 'Login successful',
      firstname: customer.first_name,
      role: 'customer',
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

// GET customer by email
customerRouter.get('/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const [results] = await connection.query(`SELECT * FROM customer WHERE email = ?`, [email]);
    res.json({
      users: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update customer data
customerRouter.put('/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  const { address, staff_email, black_listed, customer_salary } = req.body;
  console.log('Request body:', req.body);

  if (!address || !staff_email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [currentDataResult] = await connection.query(`SELECT * FROM customer WHERE email = ?`, [email]);
    const currentData = Array.from(Object.values(currentDataResult))[0];
    console.log('Current data:', currentData);

    if (!currentData) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const updateQuery = `UPDATE customer SET address = ?, staff_email = ?, black_listed = ?, customer_salary = ? WHERE email = ?`;
    const [updateResult] = await connection.query(updateQuery, [
      address,
      staff_email,
      black_listed,
      customer_salary,
      email,
    ]);
    const updatedData = Array.from(Object.values(updateResult));
    console.log('Updated data:', updatedData);

    const changed = updatedData[3]?.includes('Changed: 1');
    if (changed) {
      return res.status(200).json({ message: 'Customer updated successfully' });
    } else {
      return res.status(404).json({ message: 'Customer not found or no changes detected' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Failed to update customer', error: err });
  }
});
