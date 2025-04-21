import { Pool } from 'pg';
import dotenv from 'dotenv'
dotenv.config()


const poolConfig =  {
    connectionString: process.env.DATABASE_URL, // Use connection string for testing
  }


const pool = new Pool(poolConfig);

export default pool