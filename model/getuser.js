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
    experts_buy: function (req, callback) {
        sql = 'SELECT investment_amount*updated_price AS current_price,investment_amount*buy_price AS value,buy_or_sell,com_name,buyer_id FROM transaction WHERE buy_role =\'expert\' ORDER BY buyer_id,com_name';
        return connection.query(sql, callback);
    },
    experts_sell: function (req, callback) {
        sql = 'SELECT SUM(buy_price),SUM(updated_price) FROM transaction WHERE buy_or_sell = \'sell\' AND buy_role =\'expert\' GROUP BY buyer_id';
        //sql = mysql.format('SELECT * FROM accounts WHERE id = ?', [req.params.id]);
        return connection.query(sql, callback);
    },
    
                        
};