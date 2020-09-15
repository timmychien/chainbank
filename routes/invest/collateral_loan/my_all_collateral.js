//Jason
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        var pool = req.connection;
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM transaction WHERE buyer_id=?',[req.session.user_id], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                } 
                if(rows.length==0){
                    res.render('invest/collateral_loan/collateral_redirect',{
                       
                    })
                }
                else {
                    var data = rows;
                    res.render('invest/collateral_loan/my_all_collateral', {
                        session: req.session.user_id,
                        user:req.session.user_id,
                        data: data,
                    });
                }
            });
            connection.release();
        })
    }
});








module.exports = router;