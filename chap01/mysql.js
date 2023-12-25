import mysql from 'mysql'

const conn = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'nodejs'
}

var connection = mysql.createConnection(conn);
connection.connect();                                                

var testQuery = "insert into test (name) value ('park2');";

connection.query(testQuery, function (err, results, fields){
    if(err){
        console.log(err);
    }
    console.log(results);
})

connection.end();