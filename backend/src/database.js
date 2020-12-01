const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: 'db_fenlalista'
})

// Check database
mysqlConnection.connect((err) => {
    if (err) console.error('DB is down')
    console.log('DB is running')
})


module.exports = mysqlConnection
