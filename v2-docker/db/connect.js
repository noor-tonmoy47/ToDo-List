// const db = require('mysql2');
// require('dotenv').config('./.env');

// const pool = db.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// })

// module.exports = pool.promise();


const mysql2 = require('mysql2');
require('dotenv').config('./.env');

const db = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

module.exports = db;

