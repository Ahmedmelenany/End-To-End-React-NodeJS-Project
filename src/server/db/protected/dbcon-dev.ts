import * as mysql from 'mysql';

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user:  process.env.USER,
    password: process.env.USER_PASS,
    database: process.env.DB_NAME,
    port: 3306,
    connectTimeout: 10000
});

