import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import { personRouter } from './routes/personRouter';
import { customerRouter } from './routes/customerRouter';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { accountRouter } from './routes/accountRouter';
import { transactionRouter } from './routes/transactionRouter';
import { transferRouter } from './routes/transferRouter';
import { depositRouter } from './routes/depositRouter';
import { staffRouter } from './routes/staffRouter';
import { loanRouter } from './routes/loanRouter';
import { managerRouter } from './routes/managerRouter';
import { historyRouter } from './routes/historyRouter';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  }),
);
app.use(morgan('tiny'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);

// Routes
app.use('/api/persons', personRouter);
app.use('/api/customers', customerRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/transfers', transferRouter);
app.use('/api/deposits', depositRouter);
app.use('/api/staffs', staffRouter);
app.use('/api/loans', loanRouter);
app.use('/api/manager', managerRouter);
app.use('/api/histories', historyRouter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('Express + TypeScript Server');
});

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
