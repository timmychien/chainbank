// catch 404 and forward to error handler
// In this file you can include the rest of your app's specific main process
// code. 
// 你也可以將它們放在別的檔案裡，再由這裡 require 進來。
'use strict';
const symbols = ["BTCUSDT","ETHUSDT","BNBUSDT","DASHUSDT","LTCUSDT","QTUMUSDT","WAVESUSDT","XRPUSDT","EOSUSDT","TRXUSDT","ETCUSDT","ICXUSDT","NULSUSDT","BTTUSDT","HOTUSDT","ZRXUSDT","BATUSDT","DASHUSDT"];
var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "106306044",
    database: "usr",
    port: 3306
});
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cors=require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); //session
var upload = require('express-fileupload');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getuser = require('./routes/getuser');
var investinfo_1Router = require('./routes/investinfo/investinfo_1');
var funding_searchRouter = require('./routes/investinfo/funding_search');
var repay_searchRouter = require('./routes/investinfo/repay_search');
//var details_0001Router = require('./routes/details/details_0001');
//var details_0002Router = require('./routes/details/details_0002');
//var details_0003Router = require('./routes/details/details_0003');
//var details_0004Router = require('./routes/details/details_0004');
//var repay_0001Router = require('./routes/repay_record/repay_0001');
var repay_0002Router = require('./routes/repay_record/repay_0002');
//var repay_0003Router = require('./routes/repay_record/repay_0003');
//var repay_0004Router = require('./routes/repay_record/repay_0004');
var searchpageRouter = require('./routes/searchpage/searchpage');
var signRouter = require('./routes/sign/sign');
var loginRouter = require('./routes/login/login');
var logoutRouter=require('./routes/logout/logout');

var deposit_tokens = require('./routes/deposit_tokens/deposit_tokens');
var repayRouter = require('./routes/repay/repay');
var get_keep_rate =require('./routes/get_keep_rate');
var getusercreditRouter = require('./routes/getcredit_or_margin');
var getinvestmentRouter = require('./routes/get_investment');
var get_repay_status = require('./routes/get_repay_status');
var receipt = require('./routes/repay/receipt');
var myaccount = require('./routes/myaccount/myaccount');
var get_back = require('./routes/repay/get_back');
var getrepaymentRouter = require('./routes/get_repayment');
var repayment_receipt = require('./routes/repay/repayment_receipt');
var my_investment = require('./routes/my_investment/my_investment');
/*借貸投資方*/
//margin_transaction
var margintransRouter=require('./routes/invest/margin_transaction');
var depositmarginRouter=require('./routes/invest/margin_transaction/deposit_margin');
var directusecreditRouter=require('./routes/invest/margin_transaction/directly_use_credit');
var usemarginCreditRouter=require('./routes/invest/margin_transaction/use_margin_credit');
var endtransactionRouter=require('./routes/invest/margin_transaction/end_transaction');
var confirmendRouter = require('./routes/invest/margin_transaction/confirm_end');
//collateral_loan
var ownportfolioRouter = require('./routes/invest/collateral_loan/own_portfolio');
var collateralcreditRouter = require('./routes/invest/collateral_loan/collateral_credit');
var notusedcreditRouter = require('./routes/invest/collateral_loan/not_used_credit');
var myallcollateralRouter = require('./routes/invest/collateral_loan/my_all_collateral');
// 資金提供者
var fundingproviderRouter=require('./routes/funding_provider/funding_provider');
var choosecouponRouter=require('./routes/funding_provider/choose_coupon');

var returncreditRouter = require('./routes/credit/returncredit');
var callpayRouter = require('./routes/callpay/callpay');
var callpayconfirmRouter = require('./routes/callpay/callpayconfirm');
var callpayreceiptRouter = require('./routes/callpay/callpayreceipt');
var callpaysuccessRouter = require('./routes/callpay/callpaysuccess');
var payRouter = require('./routes/payment/payment');
var payconfirmRouter = require('./routes/payment/payconfirm');
var payreceiptRouter = require('./routes/payment/payreceipt');
var paysuccessRouter = require('./routes/payment/paysuccess');
var destroyRouter = require('./routes/destroy/destroy');
var destroyconfirmRouter = require('./routes/destroy/destroyconfirm');
var destroyreceiptRouter = require('./routes/destroy/destroyreceipt');
var destroysuccessRouter = require('./routes/destroy/destroysuccess');
var makeupmessageRouter = require('./routes/makeup/makeupmessage');
var makeuppaymentRouter = require('./routes/makeup/makeuppayment');
var makeupconfirmRouter = require('./routes/makeup/makeupconfirm');
var makeupsuccessRouter = require('./routes/makeup/makeupsuccess');
var sellmessageRouter = require('./routes/sellout/sellmessage');
var makeupreceiptRouter = require('./routes/makeup/makeupreceipt');
var repay_platform = require('./routes/repay/repay_platform');
var normal_repay = require('./routes/repay/normal_repay');
var alreadypaidRouter = require('./routes/repay/already_paid');

var moment = require('moment');
var crypto = require('./routes/searchpage/crypto');
moment().format();
var api =require('binance');
var app = express();
var app2 = express();
var app3 = express();
var ip = require('ip');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
//create the socket.io
const server = app.listen(3200,'127.0.0.1',{transport: ["websocket"], upgrade: true},()=>{})
const socket = require('socket.io');
var io = socket(server);
var twdchange;
var rate;
var serv_io = io.listen(server);
var nodemailer = require('nodemailer');
console.log(ip.address());
var func = async() => {
  let data = await CoinGeckoClient.ping();
  console.log(data);
  let twddata = await CoinGeckoClient.simple.price({
    ids: ['tether'],
    vs_currencies: ['twd'],
});
twdchange=twddata;
console.log(twddata);
};
func();
console.log("wait");
//const whitelist = ['http://127.0.0.1:5500', 'http://127.0.0.1:4000',"http://api.binance.com"];
//const corsOptions = {
//  credentials: true, // This is important.
//  origin: (origin, callback) => {
//    if(whitelist.includes(origin))
//      return callback(null, true)

//      callback(new Error('Not allowed by CORS'));
//  }
//}
// Listen on a specific host via the HOST environment variable
//app.use(cors(corsOptions));
const binanceRest = new api.BinanceRest({
  key: 'S5Fknw6WaUIQ8G7z8zGvvRdFBNk1nQiPIRQktGZjQiIVMFKVcZBgblgXDKGLVKNC', 
  secret: 'jq8MpEPEmmy2cuWYGJDvCYVNIeTF4xjKl5WI8kA5r7xKJr41WmMPmOyEMF2P3S1k', 
  timeout: 15000, 
  recvWindow: 5000, 
  disableBeautification: false,
  /*
   * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
   * default those keys will be replaced with more descriptive, longer ones.
   */
  handleDrift: true
  /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
   * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
   * binance's server time, calculating the difference with your own clock, and then reattempting
   * the request.
   */
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

function get24hr(symbol){
//  for(var i=0;i<symbols.length;i++){
    
    binanceRest.ticker24hr(symbol,(error,data)=>{
      if(error){
        console.log(error);
        return null;
      }else{
        //var symboldetails="{"+"\"symbol\":\""+data.symbol+"\",\"lastPrice\":"+data.lastPrice+"}";        
        //console.log(symboldetails);
      return data.lastPrice;
      }
    })      
//  }
}

const binanceWS = new api.BinanceWS(true);
const bws=binanceWS.onKline('BTCUSDT', '1m', (data) => {
  io.sockets.emit("KLINE",{time:Math.round(data.kline.startTime/1000),open:parseFloat(data.kline.open),high:parseFloat(data.kline.high),low:parseFloat(data.kline.low),close:parseFloat(data.kline.high)})
});

binanceWS.onUserData(binanceRest, (data) => {
}, 2000) // Optional, how often the keep alive should be sent in milliseconds
.then((ws) => {
  // websocket instance available here
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'iloveu',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge:900000} 
}));
app.use(upload());
app.get('/api/investors',(req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) {
        console.log('database connecting error');
        console.log(err);
        return;
    } else {
        console.log('database connecting success');
        connection.query("SELECT * FROM transaction WHERE buyer_id = 'yesggdd'", function(err, rows) {
            res.send(rows);
        });
        
    }

});
  
})
// db state sql 不要寫在 app.js,global
app.use(function(req, res, next) {
    req.connection = pool;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/searchpage',searchpageRouter);
app.use('/getuser',getuser);
app.use('/sign',signRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/investinfo_1', investinfo_1Router);
app.use('/funding_search', funding_searchRouter);
app.use('/repay_search', repay_searchRouter);
app.use('/deposit_tokens',deposit_tokens);
//app.use('/details_0001', details_0001Router);
//app.use('/details_0002', details_0002Router);
//app.use('/details_0003', details_0003Router);
//app.use('/details_0004', details_0004Router);
//app.use('/repay_0001', repay_0001Router);
app.use('/repay_0002', repay_0002Router);
//app.use('/repay_0003', repay_0003Router);
//app.use('/repay_0004', repay_0004Router);

/*借貸投資方*/
app.use('/own_portfolio',ownportfolioRouter);
app.use('/own_portfolio/collateral_credit',collateralcreditRouter);
app.use('/not_used_credit',notusedcreditRouter);
app.use('/my_all_collateral',myallcollateralRouter);
//margin_transaction
app.use('/margin_transaction',margintransRouter);
app.use('/margin_transaction/deposit_margin',depositmarginRouter);
app.use('/margin_transaction/directly_use_credit',directusecreditRouter);
app.use('/margin_transaction/use_margin_credit',usemarginCreditRouter);
app.use('/margin_transaction/end_transaction',endtransactionRouter);
app.use('/margin_transaction/end_transaction/confirm_end',confirmendRouter);
//資金提供者
app.use('/funding_provider',fundingproviderRouter); 
app.use('/funding_provider/choose_coupon',choosecouponRouter);

app.use('/repayment_receipt',repayment_receipt);
app.use('/repay',repayRouter);
app.use('/receipt', receipt);
app.use('/myaccount', myaccount);
app.use('/getusercredit',getusercreditRouter);
app.use('/getuserinvestment',getinvestmentRouter);
app.use('/get_back',get_back);
app.use('/get_repayment',getrepaymentRouter);
app.use('/get_repay_status',get_repay_status);
app.use('/get_keep_rate',get_keep_rate);
app.use('/credit/returncredit',returncreditRouter);
app.use('/callpay/callpay',callpayRouter);
app.use('/callpay/callpayconfirm',callpayconfirmRouter);
app.use('/callpay/callpayreceipt',callpayreceiptRouter);
app.use('/callpay/callpaysuccess',callpaysuccessRouter);
app.use('/destroy/destroy',destroyRouter);
app.use('/destroy/destroysuccess',destroysuccessRouter);
app.use('/destroy/destroyreceipt',destroyreceiptRouter);
app.use('/destroy/destroyconfirm',destroyconfirmRouter);
app.use('/makeup/makeupmessage',makeupmessageRouter);
app.use('/makeup/makeuppayment',makeuppaymentRouter);
//app.use('/makeup/makeupconfirm',makeupconfirmRouter);
app.use('/makeup/makeupsuccess',makeupsuccessRouter);
app.use('/makeup/makeupreceipt',makeupreceiptRouter);
app.use('/sell/sellmessage',sellmessageRouter);
app.use('/repay_platform',repay_platform);
app.use('/crypto',crypto);
app.use('/my_investment',my_investment);
app.use('/normal_repay',normal_repay);
app.use('/already_paid',alreadypaidRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

binanceRest.ticker24hr('BTCUSDT',(error,data)=>{
  if(error){
    console.log(error);
  }else{console.log(data);}})

/*  非固定ip使用
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
*/


var fs = require('fs');
var http = require('http');
//const { SSL_OP_NETSCAPE_CA_DN_BUG } = require("constants");
//var https = require('https');


var server_with_ip = http.createServer(app);
server_with_ip.listen(3040, '127.0.0.1', function () {
    server_with_ip.close(function () {
        server_with_ip.listen(3040, '127.0.0.1')
    })
})

//140.119.19.38

//var privateKey = fs.readFileSync('private.key');
//var certificate = fs.readFileSync('certificate.pem');
//var credentials = { key: privateKey, cert: certificate };



var server1 = http.createServer(app2);

server1.listen(5300, function() {
  console.log("yes!");
  
  //comment start
  
  pool.getConnection(function(err, connection) {
    if (err) {
        console.log('database connecting error');
        console.log(err);
        return;
    } else {
        console.log('database connecting success');
        setInterval(()=>{
        connection.query("SELECT * FROM transaction ORDER BY buyer_id;", function(err, rows) {
        if (err) throw err;
        //console.log(rows);
          console.log(new Date());
          for(var i=0;i<rows.length;i++){
            var goods=rows[i].com_name;
            console.log(goods);
            var index_no=rows[i].idtransaction_no;
            goods=goods+"USDT";
            binanceRest.ticker24hr(goods,(error,data)=>{
              if(error){
                console.log(error);
              }else{
                if(twdchange!=0){
                //console.log(data.lastPrice);
                //console.log(goods);          
                //console.log(data);

                var str ="UPDATE transaction SET updated_price = "+parseFloat(data.lastPrice)*parseFloat(twdchange.data.tether.twd)+" WHERE com_name ='"+data.symbol.replace("USDT","")+"';";
                // /margin
                console.log(data.lastPrice);
                console.log(str);
                //console.log(str);
                connection.query(str,function(emp_err,emp_rows){
                if (emp_err) throw emp_err;
            
                }) 
              }
                setTimeout(function(){
                  console.log('waiting');
              },1000);
                //get mail message if price is over /:53008000
  
                //console.log(data.lastPrice);
              //console.log(index_no);
              //"UPDATE transaction SET now_price = "+data.lastPrice+"WHERE idtransaction_no = "+index_no+";"
              }
  
            }) 
           
  //        connection.query("SELECT * FROM transaction ORDER BY buyer_id;", function(emp_err, emp_rows, emp_fields) {
  //          if (emp_err) throw emp_err;
  //          for (var e in emp_rows) {
  //              console.log('Employer Name: ', emp_rows[e].company_name);
  
        }
        var str3="SELECT * FROM funding_requirement WHERE match_status=\'true\';"
        connection.query(str3,function(emp_err,emp_rows){
          if (emp_err){console.log("no_data");
        }else{
          if (emp_rows.length!=0){
              for(var i=0;i<emp_rows.length;i++){
                if(emp_rows[i].requirementID!=null){
                var requirementID_code = emp_rows[i].requirementID;
                var creditID = emp_rows[i].creditID;
                var credit_type = emp_rows[i].credit_type;
                //var funding_need =parseInt(emp_rows[i].funding_need);
                console.log(requirementID_code+","+credit_type);
                var str4="SELECT * FROM credit_list WHERE "+"creditID = "+"\'"+creditID+"\'";   
                connection.query(str4,function(emp_err,emp_rows){
                  if (emp_err){console.log("no data");};
                  if (emp_rows.length!=0){
                    console.log(emp_rows);
                    for(var i=0;i<emp_rows.length;i++){     
                    var margin = parseInt(emp_rows[i].margin);                 
                    var str5="SELECT * FROM transaction WHERE "+"requirementID = "+"\'"+requirementID_code+"\'";   
                  }
                  }                            
                });                     
              }
          }}}
          });    
      })},15000);
      
       
      }
      //3600000*2
  //    connection.end();      
      });//comment end
      
  server1.close(function() {
      server1.listen(5300, '127.0.0.1');

  })
})

//get24hr();

var server2 = http.createServer(app3);

server2.listen(5200, function() {
  console.log("yes!");
  
  //comment start
  
  pool.getConnection(function(err, connection) {
    if (err) {
        console.log('database connecting error');
        console.log(err);
        return;
    } else {
        console.log('database connecting success');
        setInterval(function(){
        connection.query("SELECT * FROM credit WHERE (repay_amount+repay_rate) != (need_to_pay + need_to_pay_rate)", function(err, rows) {
        if(err){
          console.log(err);
        };
        //console.log(rows);
        if(rows){
          //console.log('wer'+rows[0].requirementID);
          
          for(var i=0;i<rows.length;i++){
            var user_id=rows[i].borrower_id;
            var deadline = new Date(rows[i].deadline);
            //console.log(deadline.getTime()/1000);

            // && ( Math.floor((Date.now() - deadline.getTime())/86400) <= 7 )
            //console.log(Date.now()/1000 - deadline.getTime()+"days");
            
            // 催繳 (到期)
            if(( Date.now() > deadline.getTime() ) && ( Math.floor((Date.now()/1000 - deadline.getTime())/86400) <= 3 )){
              console.log("yes!!!");
              console.log((Math.floor(Date.now()/1000)-(deadline.getTime()/1000))/86400);
              if(rows[i].status!="ask"){
                deadline.setDate(deadline.getDate()+3);
                var requirement=rows[i].requirementID;
                var rate=i+1;
                connection.query("UPDATE credit SET status = ?,deadline = ?,need_to_pay_rate = need_to_pay_rate*2 WHERE requirementID = ? AND rate_time = ?;", ['ask',deadline,requirement,rate],function(err, rows) {
                  if(err){
                    console.log(err);
                  }else{
                    console.log("correct status.");
                    connection.query("SELECT * FROM user_information WHERE user_id = ? ",user_id, function(err, rows) {
                      if(err){
                        console.log(err);};
                      
                      if(rows.length!=0){
                        var email = rows[0].user_email;
                        var mailOptions = {
                          from: 'royal0721@gmail.com',
                          to: email,
                          subject: 'chainbank-超過還款期限',
                          html: '<h1>您的借貸還款時間已逾期</h1>'+'<h2>借貸編號：'+requirement+'<br>請於'+deadline+'前歸還第'+rate+'期款項</h2>'+'<br></br>詳細請至http://chainbank.com.tw',
                        };
                        transporter.sendMail(mailOptions, (err, res) => {
                          if (err) {
                              return console.log(err);
                          } else {
                              console.log(JSON.stringify(res));
                          }
                        });
                      }
                    });                
                  }

                }
                );                
              }

            }else if((rows[i]=="ask") && ( Date.now() > deadline.getTime() )){
              // 違約 (到期)
              connection.query("UPDATE credit SET status = ? WHERE requirementID = ? ;", ['false',rows[i].requirementID],function(err, rows) {
                if(err){
                  console.log(err);
                }else{
                  console.log("correct status.");
                }
              }
              );                  

            }else if(rows[i]=="normal"&&( Date.now() < deadline.getTime() )){
              connection.query("SELECT c.creditID, t.requirement_id,f.creditID,c.margin,f.funding_need,t.updated_price FROM funding_requirement f INNER JOIN credit_list c on c.creditID = f.creditID INNER JOIN transaction t on t.requirement_id = f.requirementID WHERE t.requirement_id=? AND f.match_status='true'",[rows[i].requirementID], function(err, rows) {
                if(err){
                  console.log(err);
                };
                //console.log(rows);
                if(rows){
                  if(rows.length!=0){
                    var email = rows[0].user_email;
                    var requirement_keep_rate=((rows[0].margin+parseFloat(rows[0].updated_price-(rows[0].funding_need+rows[0].margin)))/(rows[0].funding_need+rows[0].margin));
                    if(requirement_keep_rate<0.28&&requirement_keep_rate>0.2){
                      var mailOptions = {
                        from: 'royal0721@gmail.com',
                        to: email,
                        subject: 'chainbank-投資商品低於維持率',
                        html: '<h1>您的投資商品低於維持率最低限制:0.28</h1>'+'<h2>借貸編號：'+requirement+'<br>'+'維持率：'+requirement_keep_rate.toFixed(4)+'請於'+deadline+'前歸還第'+rate+'期款項</h2>'+'<br></br>詳細請至http://chainbank.com.tw',
                      };
                      transporter.sendMail(mailOptions, (err, res) => {
                        if (err) {
                            return console.log(err);
                        } else {
                            console.log(JSON.stringify(res));
                        }
                      });
                      //makeup_value-fix!!!

                    }else if(requirement_keep_rate<0.2){
                      //update credit
                      connection.query("UPDATE credit SET status = ? WHERE requirementID = ? ;", ['false',rows[i].requirementID], function(err, rows) {
                        if(err){
                          console.log(err);
                        };
                        if(rows){
                            console.log("updated");
                          
                        }
                      });
                      
                      var mailOptions = {
                        from: 'royal0721@gmail.com',
                        to: email,
                        subject: 'chainbank-投資商品低於強制率',
                        html: '<h1>您的投資商品低於強制率最低限制:0.2</h1>'+'<h2>借貸編號：'+requirement+'<br>已將您的投資商品強制賣出,謝謝</h2>'+'<br></br>詳細請至http://chainbank.com.tw',
                      };
                      transporter.sendMail(mailOptions, (err, res) => {
                        if (err) {
                            return console.log(err);
                        } else {
                            console.log(JSON.stringify(res));
                        }
                      });

                    }
                  }
                }
        
                });
            }
          
          }

        }

        });
      },1000);
       
      }
      //3600000*2
  //    connection.end();      
      });//comment end
      
  server2.close(function() {
      server2.listen(5200, '127.0.0.1');

  })
});

var server3 = http.createServer(app3);

server3.listen(5400, function() {
  console.log("yes!");
  
  //comment start
  
  pool.getConnection(function(err, connection) {
    if (err) {
        console.log('database connecting error');
        console.log(err);
        return;
    } else {
        console.log('database connecting success');
        setInterval(function(){
        connection.query("SELECT * FROM transaction WHERE pay_status ='collateral'", function(err, rows) {
        if(err){
          console.log(err);
        };
        //console.log(rows);
        if(rows){
          console.log("Collateral:"+rows[0].updated_price+",price"+rows[0].buy_price);
          var keep_rate=((rows[0].buy_price+(rows[0].updated_price-rows[0].buy_price))/rows[0].buy_price).toFixed(4);
          console.log("維持率："+keep_rate);
          var buy_price=rows[0].buy_price;
          var requirementID=rows[0].requirement_id;
          connection.query("UPDATE transaction SET keeprate = ? WHERE requirement_id = ? ;", [keep_rate,requirementID], function(err, rows) {
            if(err){
              console.log(err);
            };
            //console.log(rows);
            if(rows){
              console.log("updated ok!");
              var need_to_pay;
              var status;
              if(keep_rate<0.7&&keep_rate>=0.5){
                need_to_pay=(0.7-keep_rate)*buy_price;
                status="ask";  
                var repay_list=[];
                var now=new Date();
                now.setDate(now.getDate()+3);
                repay_list.push([requirementID+"collateral",1,0,now.getFullYear()+"-"+(parseInt(now.getMonth())+1)+"-"+now.getDate(),Math.ceil(need_to_pay),0,'ask']);
                connection.query("SELECT * FROM credit WHERE requirementID =?", requirementID+"collateral", function(err, rows) {
                  if(err){
                    console.log(err);
                  };
                  if(rows.length==0){
                    connection.query("INSERT INTO credit(requirementID,rate_time,repay_amount,deadline,need_to_pay,need_to_pay_rate,status) VALUES ?", [repay_list], function(err, rows) {
                      if(err){
                        console.log(err);
                      };
                      //console.log(rows);
                      if(rows){console.log("updated_ok!")}});  
                  }
                  //console.log(rows);
                  if(rows.length!=0){
                    //is the amount is equal to each other,then complete
                    //console.log(rows[0]);
                    if(rows[0].status!="ask"){
                      console.log("yes,not equals")
                    connection.query("UPDATE credit SET deadline=?,need_to_pay = ? WHERE requirementID = ? ;", [now.getFullYear()+"-"+(parseInt(now.getMonth())+1)+"-"+now.getDate(),Math.ceil(need_to_pay),requirementID+"collateral"], function(err, rows) {
                      if(err){
                        console.log(err);
                      };
                      //console.log(rows);
                      if(rows){console.log("updated_ok!")}});                       
                    }
                     
                  }
                
                }
                  );       
                            
              }else if(keep_rate<0.5){
                need_to_pay=(0.7-keep_rate)*rows[0].buy_price;
                status="fales"; 
              }
              //update buy price(減)

            }
    
            });          
        }

        });
      },3000);
       
      }
      //3600000*2
  //    connection.end();      
      });//comment end
      
  server3.close(function() {
      server3.listen(5400, '127.0.0.1');

  })
});
//get24hr();

/*
create server4
function (req, callback) {
        
        sql='SELECT c.creditID, t.requirement_id,f.creditID,c.margin,f.funding_need,t.updated_price FROM funding_requirement f INNER JOIN credit_list c on c.creditID = f.creditID INNER JOIN transaction t on t.requirement_id = f.requirementID ';
        console.log(sql);
        return connection.query(sql, callback);
    
    }, 

*/

module.exports = app;
