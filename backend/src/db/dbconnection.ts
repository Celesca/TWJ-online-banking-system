import mysql, { PoolOptions } from "mysql2";

const access:PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: "root",
  password: process.env.DB_PASS,
  database: "bank_db",
}

const connection = mysql.createPool(access);

export default connection;