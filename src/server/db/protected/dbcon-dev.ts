import * as mysql from 'mysql';

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'ahmed',
    password: '1234',
    database: 'testdb',
    port: 3306,
    connectTimeout: 10000
});
