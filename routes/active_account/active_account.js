var express = require('express');
var router = express.Router();

router.get('/:active_key', function (req, res) {
    var pool = req.connection;
    var now=Date.now();
    var formatnow = new Date(now);

    if (!req.session.user_id) {
        res.redirect('/login');
    }
    else {
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM user_information WHERE active_key = ?', [req.params.active_key], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                }
                else {
                    // use myaccount.pug
                    var active = new Date(rows[0].active_time);
                    if((((Date.now()-active.getTime())/1000)/60)<=10){
                        connection.query('UPDATE user_information SET active_status = "active" WHERE active_key = ?', [req.params.active_key], function (err, rows) {
                            if (err) {
                                res.render('error', {
                                    message: err.message,
                                    error: err
                                });
                            }else if(rows.length!=0){
                                res.render('login/login',{
                                });    
                            }
                        
                        });                            
                    }else{
                        res.render('login/login',{
                            warn_text:'註測啟動碼已過期 請重新註冊'
                        }); 
                    }

                }

            })

            connection.release();

        });
        
    }

});

module.exports = router;