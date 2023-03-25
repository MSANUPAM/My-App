const mysql = require("mysql");
const variables = require( "../constants/variables");

const connection = mysql.createConnection({
    host: variables.dbHost,
    user: variables.dbUsername,
    password: variables.dbPassword,
    database: variables.dbDbname,
});
connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected....');
});

module.exports = connection;