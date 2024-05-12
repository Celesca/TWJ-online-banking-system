import mysql, { PoolOptions } from 'mysql2/promise';

const access: PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'bank_db',
};

const connection = mysql.createPool(access);

export default connection;
