const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'mediatracker'
});

db.connect()

module.exports = db;