var mysql = require('mysql');
var db = {
    host: "localhost",
    user: "root",
    password: "654321",
    database: "user",
    port: 3306
};
var connection = mysql.createConnection(db);
module.exports = {
    getuser_paytime : function (req, callback){
        
    }
}