import mysql from "mysql2";

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: process.env.DB_PASS,
    database: "bank_db",
  });

export default con;