import { Pool } from "pg";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } from "../utils/index.js";


const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  database: DB_DATABASE,
  password: DB_PASSWORD,
});

pool.query(`select now()`, (err, res) => {
  if (err) return console.log(`Database connetion failed ${err.message}`);
  console.log(`Database connected at:${res.rows[0].now}`);
});

export default pool;
