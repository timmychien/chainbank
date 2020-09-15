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
    getuser_investment: function (req, callback) {
        sql = 'SELECT * FROM transaction WHERE buyer_id=\''+req.session.user_id+'\' AND buy_role = \'user\'';
        console.log(sql);
        return connection.query(sql, callback);
    },     
    getuser_investment_with_id: function (req, callback) {
        console.log(req.credit);
        sql = 'SELECT * FROM credit WHERE borrower_id=\''+req.session.user_id+'\' AND id= \''+req.session.credit+"\'";
        console.log(sql);
        return connection.query(sql, callback);
    },     
};