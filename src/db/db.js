require('dotenv').config();
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

module.exports = sql;