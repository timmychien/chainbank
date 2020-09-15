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
    
    get_keep_rate: function (req, callback) {
    
        sql='SELECT c.creditID, t.requirement_id,f.creditID,c.margin,f.funding_need,t.updated_price FROM funding_requirement f INNER JOIN credit_list c on c.creditID = f.creditID INNER JOIN transaction t on t.requirement_id = f.requirementID WHERE f.borrower_id=\''+req.session.user_id+'\' ';
        console.log(sql);
        return connection.query(sql, callback);
    
    }, 

    get_all_keep_rate: function (req, callback) {
        
        sql='SELECT c.creditID, t.requirement_id,f.creditID,c.margin,f.funding_need,t.updated_price FROM funding_requirement f INNER JOIN credit_list c on c.creditID = f.creditID INNER JOIN transaction t on t.requirement_id = f.requirementID ';
        console.log(sql);
        return connection.query(sql, callback);
    
    }, 
};