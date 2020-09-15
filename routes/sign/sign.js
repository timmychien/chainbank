'use strict';

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var nodemailer = require('nodemailer');

/*建立user物件*/

function User(user) {

    this.username = user.username;

    this.userpass = user.userpass;

    this.useremail = user.useremail;

    this.userfirstname = user.userfirstname;

    this.userlastname = user.userlastname;

    this.userbirth = user.userbirth;

    this.usergender = user.usergender;

    this.usertel = user.usertel;

    this.usermobile = user.usermobile;

    this.usercountry = user.usercountry;

    this.useraddress = user.useraddress;

    this.userwalletaddress = user.userwalletaddress

    

};




var TITLE_REG = '註冊';





/* GET sign page. */

router.get('/', function (req, res) {

    res.render('sign/sign', { title: TITLE_REG });

});





router.post('/', function (req, res) {

    var userName = req.body['username'];

    var userPwd = req.body['password'];

    var userRePwd = req.body['confirm_password'];

    var userEmail = req.body['email'];

    var userFirstName = req.body['first_name'];

    var userLastName = req.body['last_name'];

    var userBirthDay = req.body['birthday'];

    var userGender = req.body['gender'];

    var userTel_Phone = req.body['tel_phone'];

    var userMobile_Phone = req.body['mobile_phone'];

    var userCountry = req.body['country'];

    var userAddress = req.body['address'];

    var userWallet_Address = req.body['wallet_address'];

    /*var md5 = crypto.createHash('md5');



    var userPwd = md5.update(userPwd).digest('hex'); */



    var newUser = new User({

        username: userName,

        userpass: userPwd,

        useremail: userEmail,

        userfirstname: userFirstName,

        userlastname: userLastName,

        userbirth: userBirthDay,

        usergender: userGender,

        usertel: userTel_Phone,

        usermobile: userMobile_Phone,

        useraddress: userAddress,

        usercountry: userCountry,

        userwalletaddress: userWallet_Address

    });
    var transporter = nodemailer.createTransport({    
        service: 'gmail',
        secure: true,
        auth: {
          type: "OAuth2",
          user: 'royal0721@gmail.com',
          clientId: '598484236993-8l3a4ea0prpl3fbtkkuo383mdu6khha3.apps.googleusercontent.com',
          clientSecret: 'BjWrx8Phd6s7qhlVI3tBQo2R',
          refreshToken: '1//04RYCMZX_21gnCgYIARAAGAQSNwF-L9IrYlzAqcBzhjmlfbX9vyY755rBLGwec0uAtd-zLjHCIqvFc9X6yut5qwY6Ffya4lm0dWQ',
        }
        
      });


    /*寫入新資料*/

    var pool = req.connection;

    pool.getConnection(function (err, connection) {
    //  account active
        connection.query('SELECT * FROM user_information WHERE user_id = ? ', [newUser.username], function (err, rows) {
            if (err) {

                res.render('error', {

                    message: err.message,

                    error: err

                });

            }
            console.log(err)
            console.log(rows[0]);

            // 如果有重複的帳號

            if (rows.length >= 1) {
                console.log('status: '+rows[0].active_status);
                if(rows[0].active_status == "not_active" ){
                    //update the user who do active their accounts.
                    var now_time = new Date(Date.now());
                    var time = now_time.getFullYear()+(parseInt(now_time.getMonth())+1)+now_time.getDate()+now_time.getHours()+now_time.getMinutes()+now_time.getSeconds();
                    var formated_time =now_time.getFullYear()+"-"+(parseInt(now_time.getMonth())+1)+"-"+now_time.getDate()+" "+now_time.getHours()+":"+now_time.getMinutes()+":"+now_time.getSeconds();
                    var cmd = "UPDATE user_information SET user_id = ?, user_password = ?, user_email = ?, user_firstname = ?, user_lastname = ?, user_birthday = ?, user_gender = ?, user_tel_phone = ?, user_mobile_phone = ?, user_country = ?, user_address = ?, user_wallet_address=?,active_key = ?,active_status = 'not_active',active_time = ? WHERE user_id = ?";
                    const secret =newUser.username+newUser.userpass+newUser.useremail+newUser.userfirstname+newUser.userlastname+time;
                    const hash = crypto.createHmac('sha256', secret)
                                        .digest('hex');
                    connection.query(cmd, [newUser.username, newUser.userpass, newUser.useremail, newUser.userfirstname, newUser.userlastname, newUser.userbirth, newUser.usergender, newUser.usertel, newUser.usermobile, newUser.usercountry, newUser.useraddress, newUser.userwalletaddress,hash,formated_time,newUser.username], function (err, result) {
    
                        if (err) {
    
                            res.redirect('/sign');
                            console.log(err)
    
                        } else {
                            var email = newUser.useremail;
                            var mailOptions = {
                                from: 'royal0721@gmail.com',
                                to: email,
                                subject: 'chainbank-立即啟動您的帳戶',
                                html: '<h2>您好:</h2><br><h2>請於十分鐘內點擊以下網址啟動您的帳號：</h2><br>'+'<a href="'+'http://115.43.135.69:3040/login/'+hash+'">'+'http://115.43.135.69:3040/login/'+hash+'</a>',
                            };
                            transporter.sendMail(mailOptions, (err, res) => {
                                if (err) {
                                    return console.log(err);
                                } else {
                                    console.log(JSON.stringify(res));
                                }
                            });

                            res.render('login/login', { warn_text: '請至'+email+'啟動您的帳號' });
    
                        }
    
    
    
                    });
                }else if(rows[0].active_status=="active"){
                    res.render('sign/sign', { warn: "此帳號名稱已被註冊" });}

                

            } else {
                var now_time = new Date(Date.now());
                var time = now_time.getFullYear()+(parseInt(now_time.getMonth())+1)+now_time.getDate()+now_time.getHours()+now_time.getMinutes()+now_time.getSeconds();
                var formated_time =now_time.getFullYear()+"-"+(parseInt(now_time.getMonth())+1)+"-"+now_time.getDate()+" "+now_time.getHours()+":"+now_time.getMinutes()+":"+now_time.getSeconds();
                const secret =newUser.username+newUser.userpass+newUser.useremail+newUser.userfirstname+newUser.userlastname+time;
                const hash = crypto.createHmac('sha256', secret)
                                    .digest('hex');
                //insert the user_information with active_key,active_status,active_time
                var cmd = "INSERT INTO user_information(user_id, user_password, user_email, user_firstname, user_lastname, user_birthday, user_gender, user_tel_phone, user_mobile_phone, user_country, user_address, user_wallet_address, active_key, active_status, active_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                connection.query(cmd, [newUser.username, newUser.userpass, newUser.useremail, newUser.userfirstname, newUser.userlastname, newUser.userbirth, newUser.usergender, newUser.usertel, newUser.usermobile, newUser.usercountry, newUser.useraddress, newUser.userwalletaddress,hash,'not_active',formated_time], function (err, result) {

                    if (err) {

                        res.redirect('/sign');
                        console.log(err)

                    } else {
                        var email = newUser.useremail;
                        var mailOptions = {
                          from: 'royal0721@gmail.com',
                          to: email,
                          subject: 'chainbank-立即啟動您的帳戶',
                          html: '<h2>您好:</h2><br><h2>請於十分鐘內點擊以下網址啟動您的帳號：</h2><br>'+'<a href="'+'http://115.43.135.69:3040/login/'+hash+'">'+'http://115.43.135.69:3040/login/'+hash+'</a>',
                        };
                        transporter.sendMail(mailOptions, (err, res) => {
                          if (err) {
                              return console.log(err);
                          } else {
                              console.log(JSON.stringify(res));
                          }
                        });
                        res.render('login/login', { warn_text: '請至'+email+'啟動您的帳號' });

                    }



                });

            }

        })

        connection.release();

    });

});







/*User.prototype.save = function save(callback) {

    var user = {

        username: this.username,

        userpass: this.userpass

    };

    

    var cmd = "INSERT INTO member(Account_id, Account_password) VALUES(?,?)";



    connection.query(cmd, [user.username, user.userpass], function (err, result) {

        if (err) {

            return;

        }



        connection.release();

        callback(err, result);

    });

};*/











module.exports = router;