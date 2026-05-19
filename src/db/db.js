import { Pool } from "pg";
// import path from 'node:path'
// import dotenv from 'dotenv';

// const dirname = import.meta.dirname;

// dotenv.config({path:path.join(dirname,'../../.env'),quiet:true})


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

pool.query(`select now()`, (err, res) => {
  if (err) return console.log(`Database connetion failed ${err.message}`);
  console.log(`Database connected at:${res.rows[0].now}`);
});


export default pool