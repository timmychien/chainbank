'use strict';
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res) {
    res.render('login/login', { title: 'Express' });
});
router.get('/:active_key', function (req, res) {
    var pool = req.connection;
    var now=Date.now();
    var formatnow = new Date(now);

        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM user_information WHERE active_key = ?', [req.params.active_key], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                }
                else if(rows.length!=0){
                
                if(rows[0].active_status=="not_active"){
                    // use myaccount.pug
                    var active = new Date(rows[0].active_time);
                    if((((Date.now()-active.getTime())/1000)/60)<=10){
                        console.log("update!");
                        connection.query('UPDATE user_information SET active_status = "active" WHERE active_key = ?', [req.params.active_key], function (err, rows) {
                            if (err) {
                                res.render('error', {
                                    message: err.message,
                                    error: err
                                });
                            }else if(rows.length!=0){
                                res.render('login/login',{
                                    warn_text:'已為您啟動帳號 請登入'
                                });    
                            }
                        
                        });                            
                    }else{
                        res.render('login/login',{
                            warn_text:'註測啟動碼已過期 請重新註冊'
                        }); 
                    }
                }else{
                    res.render('login/login',{
                        warn_text:'您已啟動帳號 請登入'
                    });                     
                }
                }

            })

            connection.release();

        });
        
    

});
router.post('/:active', function (req, res) {
    var userName = req.body['username'];
    var userPwd = req.body['password'];
    /* var md5 = crypto.createHash('md5');*/
    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('SELECT user_id FROM user_information WHERE binary user_id = ? ', [userName], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }

            if (rows.length == 0) {
                res.render('login/login', { warn_text: "這個帳號尚未被註冊" });
            }
                

            // 如果有重複的帳號
            if (rows.length >= 1) {
                connection.query('SELECT * FROM user_information WHERE user_id = ? AND user_password = ? ', [userName, userPwd], function (err, rows) {
                    if (rows.length == 0) {
                        res.render('login/login', { warn: "密碼錯誤 請再輸入一次" });
                    }
                    if (rows.length == 1) {
                        if (rows[0].active_status== "not_active"){
                            
                            var active = new Date(rows[0].active_time);
                            if((((Date.now()-active.getTime())/1000)/60)<=10){                            
                                res.render('login/login', { warn_text: "這個帳號尚未被啟動" });
                            }else{
                                res.render('login/login', { warn_text: "這個帳號尚未被註冊" });
                            }

                        }else{
                            req.user=req.body['username'];
                            req.session.user_id = req.body['username'];
                            req.session.user_password = req.body['password'];
                            req.session.user_email = rows[0].user_email;
                            req.session.user_firstname = rows[0].user_firstname;
                            req.session.user_lastname = rows[0].user_lastname;
                            req.session.user_birthday = rows[0].user_birthday;
                            req.session.user_gender = rows[0].user_gender;
                            req.session.user_tel_phone = rows[0].user_tel_phone;
                            req.session.user_mobile_phone = rows[0].user_mobile_phone;
                            req.session.user_address = rows[0].user_address;
                            req.session.user_wallet_address = rows[0].user_wallet_address;
                            req.session.private_key=rows[0].private_key;
                            console.log(req.session.user_id);
                            res.redirect('/');
                        }

                    }
                });
            }
        })
        connection.release();
    });

});
router.post('/', function (req, res) {
    var userName = req.body['username'];
    var userPwd = req.body['password'];
    /* var md5 = crypto.createHash('md5');*/
    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('SELECT user_id FROM user_information WHERE binary user_id = ? ', [userName], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }

            if (rows.length == 0) {
                res.render('login/login', { warn_text: "這個帳號尚未被註冊" });
            }
                

            // 如果有重複的帳號
            if (rows.length >= 1) {
                connection.query('SELECT * FROM user_information WHERE user_id = ? AND user_password = ? ', [userName, userPwd], function (err, rows) {
                    if (rows.length == 0) {
                        res.render('login/login', { warn: "密碼錯誤 請再輸入一次" });
                    }
                    if (rows.length == 1) {
                        var active = new Date(rows[0].active_time);
                        if (rows[0].active_status == "not_active"){
                            if((((Date.now()-active.getTime())/1000)/60)<=10){                            
                                res.render('login/login', { warn_text: "這個帳號尚未被啟動" });
                            }else{
                                res.render('login/login', { warn_text: "這個帳號尚未被註冊" });
                            }
            
                        }else{

                                req.user=req.body['username'];
                                req.session.user_id = req.body['username'];
                                req.session.user_password = req.body['password'];
                                req.session.user_email = rows[0].user_email;
                                req.session.user_firstname = rows[0].user_firstname;
                                req.session.user_lastname = rows[0].user_lastname;
                                req.session.user_birthday = rows[0].user_birthday;
                                req.session.user_gender = rows[0].user_gender;
                                req.session.user_tel_phone = rows[0].user_tel_phone;
                                req.session.user_mobile_phone = rows[0].user_mobile_phone;
                                req.session.user11_address = rows[0].user_address;
                                req.session.user_wallet_address = rows[0].user_wallet_address;
                                req.session.private_key=rows[0].private_key;
                                console.log(req.session.user_id);
                                res.redirect('/');}
                    }
                });
            }
        })
        connection.release();
    });

});

module.exports = router;