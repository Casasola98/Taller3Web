const mysql = require("mysql");
const config = require("../config");
const rutas = require('./rutas');
const puntos = require('./puntos');

console.log(config);
const connection = mysql.createConnection(config.default.mysql);
module.exports.connection = connection

connection.connect(function(err){
    (err) ? console.log(err) : console.log(connection);
});

module.exports.default = {
    rutas,
    puntos
}  