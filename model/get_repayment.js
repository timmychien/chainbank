var mysql = require('mysql');
var db = {
    host: "localhost",
    user: "root",
    password: "654321",
    database: "usr",
    port: 3306
};
var connection = mysql.createConnection(db);
module.exports = {  
    getuser_repayment_with_id: function (req, callback) {
        console.log(req.credit);
        sql = 'SELECT * FROM repayment_receipt WHERE payer=\''+req.session.user_id+'\'';
        console.log(sql);
        return connection.query(sql, callback);
    },     
};