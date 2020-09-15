var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    var pool = req.connection;
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
                    res.render('my_investment/my_investment',{
                        user:req.session.user_id,
                        username:rows[0].user_firstname+' '+rows[0].user_lastname,
                        email:rows[0].user_email,
                        birthday:rows[0].user_birthday,
                        telphone:rows[0].user_tel_phone,
                        mobilephone:rows[0].user_mobile_phone,
                        address:rows[0].user_address,
                        wallet_address:rows[0].user_wallet_address
                    });
                }

            })

            connection.release();

        });
        
    }

});

module.exports = router;