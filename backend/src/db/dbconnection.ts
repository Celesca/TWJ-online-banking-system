import mysql from "mysql2";

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

export default con;