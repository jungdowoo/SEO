import mysql from 'mysql2/promise';

export const db = mysql.createPool ({
    host: 'localhost',
    user:'root',
    password:'rlagksthf1!',
    database: 'coupang'
});