import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://nano:nano@localhost:5432/nano';

export const pool = new Pool({
  connectionString
});


