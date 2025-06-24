const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reportpres_bd',
  password: 'Sistemas2025',
  port: 5432,
});

module.exports = pool;
