import { Pool } from 'pg';

const poolConfig =  {
    connectionString: process.env.DATABASE_URL, // Use connection string for testing
  }


const pool = new Pool(poolConfig);

export default pool