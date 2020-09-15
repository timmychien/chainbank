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
    get_repay_status_with_id: function (req, callback) {
        console.log(req.credit);
        sql = 'SELECT * FROM credit WHERE borrower_id=\''+req.session.user_id+'\' ORDER BY requirementID';
        console.log(sql);
        return connection.query(sql, callback);
    },     
};