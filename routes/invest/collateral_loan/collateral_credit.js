//Jason
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        var pool = req.connection;
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM transaction WHERE idtransaction_no=?',[idtransaction_no], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                } 
                else {
                    //var id = rows.idtransaction_no;
                    var walletaddress=req.session.user_wallet_address;
                  
                    res.render('invest/collateral_loan/collateral_credit', {
                        session: req.session.user_id,
                        user_id:req.session.user_id,
                        walletaddress:req.session.user_wallet_address,
                        //ownId:id
                    });
                }

            });
            connection.release();
        })
    }
});




module.exports = router;