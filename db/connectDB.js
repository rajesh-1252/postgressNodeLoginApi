import pg from "pg";
import env from "dotenv";
env.config();

const { Pool } = pg;
const pool = new Pool();

const query = (text, params) => pool.query(text, params);
export default query;
