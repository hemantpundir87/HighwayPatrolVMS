import sql, { config as SQLConfig, ConnectionPool } from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

let pool: ConnectionPool | null = null;

const sqlConfig: SQLConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: (process.env.DB_SERVER || '').trim(),
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
  options: {
    encrypt: (process.env.DB_ENCRYPT || 'false').toLowerCase() === 'true',
    trustServerCertificate: (process.env.DB_TRUST_CERT || 'true').toLowerCase() === 'true'
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export const getPool = async (): Promise<ConnectionPool> => {
  if (pool) return pool;
  pool = await new sql.ConnectionPool(sqlConfig).connect();
  console.log('✅ Connected to SQL Server');
  return pool;
};

export { sql };
