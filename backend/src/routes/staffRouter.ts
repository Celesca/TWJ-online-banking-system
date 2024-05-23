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
    console.log(staff);
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
      role: 'staff',
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
