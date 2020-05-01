const mysql = require('mysql2/promise');

async function initDb(){
    return await mysql.createConnection({
        host: 'db',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'mediatracker'
    })
}

async function closeDb(db){
    await db.close();
}

exports.initDb = initDb;
exports.closeDb = closeDb;