const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'react_express_db',
  password: '6692222610', // Pon la que elegiste al instalar Postgres
  port: 5432,
});

module.exports = pool;