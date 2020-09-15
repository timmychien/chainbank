var express = require('express');
var router = express.Router();
var Web3=require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35"));
//platform token
var token_contractAddress = "0xf6daae7777472be83633329c2733a9246ab6a1b1";
var token2_contractABI=require('../token2_contractABI');
var token2_contractABI = token2_contractABI.token2_contractABI;
var contract = web3.eth.contract(token2_contractABI).at(token_contractAddress);
var token_minter = "0x63A40281087c53479382283dE03d64A83f5C7df0";
//matching
var matchingAddress="0x33DA8C77ea7744eFcd6F00e11aD170e313401Fc5";
var matchingABI=require('../matchingABI');
var matchingABI=matchingABI.matchingABI;
var matchingcontract=web3.eth.contract(matchingABI).at(matchingAddress);
var platform2="0xe1d739f2A154aA0cEcE4dD78e32bAc9F3F485C57";
router.get('/', function(req, res, next) {
    if(!req.session.user_id){
        res.redirect('/login');
    }else{
        var pool = req.connection;
        pool.getConnection(function(err,connection){
            connection.query('SELECT * FROM funding_requirement WHERE match_status="false" ORDER BY create_date  DESC',function(err,rows){
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
    
                    });
                    console.log(err);
                } 
                if(rows.length==0){
                    console.log("no data!!!")
                }
                else {
                    var data=rows
                    //
                    var matched_status=req.body['matched_or_not'];
                    if(matched_status='false'){
                        var status="尚未媒合成功"
                    }else{
                        var status="已媒合成功"
                    }
                    //
                    res.render('funding_provider/funding_provider', {
                        user: req.session.user_id,
                        data:data,
                        status:status,
                    });
                }
            })
            connection.release();
            })  
    }
    
  });
/* GET home page. */
/*
router.post('/get_investment', function (req, res) {
    var pool = req.connection;
    var search=req.body['search'];
    var colterm=req.body['colterm'];
    var inputs=req.body['inputs'];
    pool.getConnection(function(err,connection){
        if(search=="credit_type_option"){
            var sql='SELECT * FROM funding_requirement WHERE credit_type ='+inputs;
        }
        if(search=="invest_amount_option"){
            if(colterm=="gt"){
                var sql='SELECT * FROM funding_requirement WHERE funding_need >'+inputs;
            } if(colterm=="ge"){
                var sql='SELECT * FROM funding_requirement WHERE funding_need >='+inputs;
            } if(colterm=="eq"){
                var sql='SELECT * FROM funding_requirement WHERE funding_need ='+inputs;
            } if(colterm=="le"){
                var sql='SELECT * FROM funding_requirement WHERE funding_need <='+inputs;
            } if(colterm=="lt"){
                var sql='SELECT * FROM funding_requirement WHERE funding_need <'+inputs;
            }
        }
        console.log(sql)
        connection.query(sql,function(err,rows){
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err

                });amount_to
                console.log("no data!!!")
            }
            else {
                var data=rows;
                res.render('funding_provider/funding_provider', {
                    user: req.session.user_id,
                    data:data,
                });
            }
        })
        connection.release();
        })
});
*/
//invest_amount,tranche
// 
router.post('/',function(req,res){
    var pool = req.connection;
    var requirementID=req.body['requirementID'];
    var amount_to_invest=req.body['amount_to_invest'];
    console.log('amount_to_invest:',amount_to_invest)
    var investor=req.session.user_wallet_address;
    pool.getConnection(function(err,connection){
        connection.query('SELECT * FROM funding_requirement WHERE requirementID=?',[requirementID],function(err,rows){
            if(err){
                res.render('error',{
                    message:err.message,
                    error:err
                });
            }else{
                //deploy trenche 
                // trenche contract
                //var token_balance=contract.balanceOf.call(wallet_address).toNumber();
                var avail_amount=contract.balanceOf.call(investor).toNumber();
                var now_avail_amount=avail_amount/Math.pow(10,18);
                console.log('Now amount:',now_avail_amount)
                if (amount_to_invest>now_avail_amount) {
                    res.render('funding_provider/invest_fail', {
                        not_enough_warn: "您欲投資金額已超過您所擁有金額",
                        now_avail_amount:now_avail_amount
                    })
                }else{
                var borrower=rows[0].borrower_id;
                var funding_need=rows[0].funding_need;
                //var total_amount_need = funding_need*Math.pow(10,18);
                var now_matched_amount = rows[0].now_matched_amount;
                var invest_amount = amount_to_invest*Math.pow(10,18);
                var borrower=rows[0].borrower;
                var requirementID=rows[0].requirementID;
                req.session.requirementID=requirementID;
                var rate_times=rows[0].rate_times;
                var credit_type_=rows[0].credit_type;
                var match_status=rows[0].match_status;
                //var now_matched_percent=rows[0].now_matched_percent;
                console.log("目前媒合狀態:",match_status)
                /*
                if(borrower==req.session.user_id){
                    res.render('funding_provider/match_completed',{
                        match_completed_warn:"您無法投資自己的資金需求"
                    })
                }
                if(match_status=='true'){
                    res.render('funding_provider/match_completed',{
                        match_completed_warn:"此資金需求已媒合完成，您無法投資"
                    })
                }
                var now_need_amount=(parseInt(funding_need)-parseInt(now_matched_amount));
                if(parseInt(amount_to_invest)>parseInt(now_need_amount)){
                    res.render('funding_provider/match_completed',{
                        match_completed_warn:"您欲投資金額已超過需求上限"
                    })
                }
                */
                    res.redirect('/funding_provider/choose_coupon')
                  
                /*
                else{
                    
                //invest sendtransaction
                var count = web3.eth.getTransactionCount(token_minter);
                var data = contract.approve_and_transfer.getData(investor, token_minter,amount_to_invest,{from:token_minter});
                var gasPrice = web3.toWei(60, 'gwei');
                //console.log(gasPrice);
                var gasLimit = 8000000;
        
                var rawTransaction = {
                    "from": token_minter,
                    "nonce": web3.toHex(count),
                    "gasPrice": web3.toHex(gasPrice),
                    "gasLimit": web3.toHex(gasLimit),
                    "to": token_contractAddress,
                    "value": "0x0",
                    "data": data,
                    "chainId": 0x04
                };
        
                var privKey = Buffer.from("83ac05c778568e70fcef4e57a73ccb4641c31d44f7e6a117a61c35231f4442d1", 'hex');
                var tx = new Tx(rawTransaction, { chain: 'rinkeby' });
        
                tx.sign(privKey);
                var serializedTx = tx.serialize();
                var investhash=web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
                console.log('pay_invest_Hash',investhash)
                
                //
                var invest_data=matchingcontract.invest.getData(requirementID,investor,invest_amount,{from:platform2})
                var invest_count=web3.eth.getTransactionCount(platform2);
                var gasPrice_invest = web3.toWei(20, 'gwei')
                var gasLimit_invest = 5000000;
                var invest_rawTrans = {
                    "from": platform2,
                    "nonce": web3.toHex(invest_count),
                    "gasPrice": web3.toHex(gasPrice_invest),
                    "gasLimit": web3.toHex(gasLimit_invest),
                    "to": matchingAddress,
                    "value": "0x0",
                    "data": invest_data,
                    "chainId": 0x04
                };
                var invest_tx = new Tx(invest_rawTrans, { chain: 'rinkeby' });
                var platform2_privKey = Buffer.from("2c80810afdeec70c48dec6bf412e0ba78de5dad18d54c7f7367af103fb755c0e", "hex");//platform2
                invest_tx.sign(platform2_privKey);
                var serializedTx_invest = invest_tx.serialize();
                var invest_txhash=web3.eth.sendRawTransaction('0x' + serializedTx_invest.toString('hex'));
                console.log("record_invest_hash:",invest_txhash)
                //

                // if mactched_amount is fulfilled,then do this
                if(parseInt(amount_to_invest)==(parseInt(funding_need)-parseInt(now_matched_amount))){
                    console.log('AAAAAAAAAAA')
                    const onTime = () => {
                        const date = new Date();
                        const mm = date.getMonth() + 1;
                        const dd = date.getDate();
                        const hh = date.getHours();
                        const mi = date.getMinutes();
                        const ss = date.getSeconds();
                        return [date.getFullYear(), "-" +
                        (mm > 9 ? '' : '0') + mm, "-" +
                        (dd > 9 ? '' : '0') + dd, " " +
                        (hh > 9 ? '' : '0') + hh, ":" +
                        (mi > 9 ? '' : '0') + mi, ":" +
                        (ss > 9 ? '' : '0') + ss
                        ].join('');
                        }  
                var matched_time = onTime();
                var date = new Date();
                var time = date.getTime();
                var match_data=matchingcontract.match_success.getData(borrower,requirementID,time,{from:platform2});
                var match_count = web3.eth.getTransactionCount(platform2);
                var gasPrice_match = web3.toWei(60, 'gwei')
                var gasLimit_match = 8000000;
                var match_rawTrans = {
                    "from": platform2,
                    "nonce": web3.toHex(match_count),
                    "gasPrice": web3.toHex(gasPrice_match),
                    "gasLimit": web3.toHex(gasLimit_match),
                    "to": matchingAddress,
                    "value": "0x0",
                    "data": match_data,
                    "chainId": 0x04
                };
                var match_tx = new Tx(match_rawTrans, { chain: 'rinkeby' });
                var platform2_privKey = Buffer.from("2c80810afdeec70c48dec6bf412e0ba78de5dad18d54c7f7367af103fb755c0e", "hex");//platform2
                match_tx.sign(platform2_privKey);
                var serializedTx_match = match_tx.serialize();
                var match_txhash=web3.eth.sendRawTransaction('0x' + serializedTx_match.toString('hex'));
                console.log("match_hash:",match_txhash)
                //var sql = "UPDATE funding_requirement SET now_matched_amount = "+ new_matched_amount+"AND now_matched_percent="+new_matched_percent+"WHERE requirementID= "+requirementID+"";
                //var matched_time=onTime();
                console.log('requirementID:',requirementID)
                var new_matched_amount=(parseInt(now_matched_amount)+parseInt(amount_to_invest));
                console.log('new matched amount:',new_matched_amount)
                var new_matched_percent=parseFloat(new_matched_amount/funding_need);
                console.log('new matched percent:',new_matched_percent)
                connection.query("UPDATE funding_requirement SET match_status=?, matched_time=? ,now_matched_amount=?, now_matched_percent=? WHERE requirementID=?",['true',matched_time,new_matched_amount,new_matched_percent,requirementID],function(err,rows){
                    if(err){
                        res.render('error',{
                            message:err.message,
                            error:err
                        });
                    }else{
                        console.log('update success!')
                        if(credit_type_=="Margin"||credit_type_=="margin"){
                        var requirement_id=requirementID;
                        var rate=parseInt(rate_times);
                        var rate_num=1;
                        var principle=parseInt(funding_need);
                        var repayments=[];
                        for(var i=0;i<rate;i++){                        
                            var need_to_pay_rate=(principle-((i*Math.ceil(principle/rate))))*0.01*rate_num;
                            var need_to_pay=(principle/rate);
                            var match=new Date(Date.now());
                            match.setMonth(match.getMonth()+(i+1));
                            if(i==0){
                                var per_repayment=[requirement_id,i+1,parseFloat(0),parseFloat(0),match.getFullYear()+"-"+(parseInt(match.getMonth())+1)+"-"+match.getDate(),Math.ceil(parseFloat(need_to_pay)),Math.floor(need_to_pay_rate),'normal'];
                            }else{
                                var per_repayment=[requirement_id,i+1,parseFloat(0),parseFloat(0),match.getFullYear()+"-"+(parseInt(match.getMonth())+1)+"-"+match.getDate(),Math.floor(parseFloat(need_to_pay)),Math.floor(need_to_pay_rate),'normal'];
                            }
                            
                            repayments.push(per_repayment);
                            //requirementID,rate_time,repay_amount,deadline,need_to_pay,need_to_pay_rate,status
                        }
                        //console.log(repayments);
                       connection.query('INSERT INTO credit(requirementID,rate_time,repay_amount,repay_rate,deadline,need_to_pay,need_to_pay_rate,status) VALUES ?', [repayments], function (err, rows,fields) {
                            if (err) {
                                res.render('error', {
                                    message: err.message,
                                    error: err
                                });
                            }
                            else {
                                // use myaccount.pug
                                console.log("we have"+rows[0]);
                                res.render('funding_provider/matching_success',{
                                    user:req.session.user_id,
                                     amount_to_invest:amount_to_invest
                                    });
                            }
            
                        });
                    }else if(credit_type_=="Collateral"){
                        var requirement_id=requirementID;
                        var rate=parseInt(rate_times);
                        var rate_num=1;
                        var principle=parseInt(funding_need);
                        var repayments=[];
                        var need_to_pay_rate;
                        for(var i=0;i<rate;i++){                        
                            if(rate==3){
                                need_to_pay_rate=(principle-((i*Math.ceil(principle/rate))))*0.01*rate_num;
                            }else if(rate==6){
                                need_to_pay_rate=(principle-((i*Math.ceil(principle/rate))))*0.008*rate_num;    
                            }else if(rate==12){
                                need_to_pay_rate=(principle-((i*Math.ceil(principle/rate))))*0.006*rate_num;   
                            }
                            var need_to_pay=(principle/rate);
                            var match=new Date(Date.now());
                            match.setMonth(match.getMonth()+(i+1));
                            if(i==0){
                                var per_repayment=[requirement_id,i+1,parseFloat(0),match.getFullYear()+"-"+(parseInt(match.getMonth())+1)+"-"+match.getDate(),Math.ceil(parseFloat(need_to_pay)),Math.floor(need_to_pay_rate),'normal'];
                            }else{
                                var per_repayment=[requirement_id,i+1,parseFloat(0),match.getFullYear()+"-"+(parseInt(match.getMonth())+1)+"-"+match.getDate(),Math.floor(parseFloat(need_to_pay)),Math.floor(need_to_pay_rate),'normal'];
                            }
                            
                            repayments.push(per_repayment);
                            //requirementID,rate_time,repay_amount,deadline,need_to_pay,need_to_pay_rate,status
                        }
                        //console.log(repayments);
                       connection.query('INSERT INTO credit(requirementID,rate_time,repay_amount,deadline,need_to_pay,need_to_pay_rate,status) VALUES ?', [repayments], function (err, rows,fields) {
                            if (err) {
                                res.render('error', {
                                    message: err.message,
                                    error: err
                                });
                            }
                            else {
                                // use myaccount.pug
                                console.log("we have"+rows[0]);
                                res.render('funding_provider/matching_success',{
                                    user:req.session.user_id,
                                     amount_to_invest:amount_to_invest
                                    });
                            }
            
                        });

                        }
                        /*res.render('funding_provider/matching_success',{
                        user:req.session.user_id,
                         amount_to_invest:amount_to_invest
                        })
                    }
                });
                }
                else{
                
                console.log('requirementID:',requirementID)
                var new_matched_amount=(parseInt(now_matched_amount)+parseInt(amount_to_invest));
                console.log('new matched amount:',new_matched_amount)
                var new_matched_percent=parseFloat(new_matched_amount/funding_need);
                console.log('new matched percent:',new_matched_percent)
                connection.query("UPDATE funding_requirement SET now_matched_amount=?, now_matched_percent=? WHERE requirementID=?",[new_matched_amount,new_matched_percent,requirementID],function(err,rows){
                    if(err){
                        res.render('error',{
                            message:err.message,
                            error:err
                        });
                    }else{
                        console.log('update success!')
                        res.render('funding_provider/matching_success',{
                            user:req.session.user_id,
                            amount_to_invest:amount_to_invest
                        })
                    }
                })
                
                }
                }*/
            }   
            }
        })
        connection.release();
    })
});
router.get('/choose_coupon', function (req, res) {
    var pool = req.connection;
    var requirementID = req.session.requirementID;
    console.log(requirementID);
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM funding_requirement WHERE requirementID=?', [requirementID], function (err, rows) {
            var borrower=rows[0].borrower_id;
            var match_status=rows[0].match_status;
            var requirementID = rows[0].requirementID;
            var creditID = rows[0].creditID;
            var strategyID = rows[0].strategyID;
            var funding_need = rows[0].funding_need;
            var now_matched_amount = rows[0].now_matched_amount;
            //var borrower=rows[0].borrower;
            if (borrower == req.session.user_id) {
                res.render('funding_provider/match_completed', {
                    match_completed_warn: "您無法投資自己的資金需求"
                })
            }
            if (match_status == 'true') {
                res.render('funding_provider/match_completed', {
                    match_completed_warn: "此資金需求已媒合完成，您無法投資"
                })
            }
            /*
            var now_need_amount = (parseInt(funding_need) - parseInt(now_matched_amount));
            if (parseInt(amount_to_invest) > parseInt(now_need_amount)) {
                res.render('funding_provider/match_completed', {
                    match_completed_warn: "您欲投資金額已超過需求上限"
                })
            }
            */
            else{
                res.render('funding_provider/choose_coupon', {
                    requirementID: requirementID,
                    creditID: creditID,
                    strategyID: strategyID,
                    funding_need: funding_need,
                    now_matched_amount: now_matched_amount,
                    //borrower: borrower
                })
            }
        })
        connection.release();
    })
});

module.exports = router;