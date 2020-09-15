var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var pool = req.connection;
    var now=Date.now();
    var formatnow = new Date(now);

    if (!req.session.user_id) {
        res.redirect('/login');
    }
    else {
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM user_information WHERE user_id = ?', [req.session.user_id], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                }
                else {
                    // use myaccount.pug
                    res.render('repay/repayment_receipt',{
                        user:req.session.user_id,
                        time:formatnow.toString()
                    });
                }

            })

            connection.release();

        });
        
    }

});

module.exports = router;