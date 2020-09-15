var express = require('express');
//var async = require('async');
var crypto = require('crypto');
var router = express.Router();
var Tx = require('ethereumjs-tx').Transaction;

var Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35"));
//margin_credit
var creditAddress = "0x8c51c69a6bc5d4836da8433ceefdc80e7e60ddd7";
var margin2ABI=require('../../margin2ABI');
var margin2ABI = margin2ABI.margin2ABI;
var creditcontract = web3.eth.contract(margin2ABI).at(creditAddress);

//matching
var matchingAddress="0x33DA8C77ea7744eFcd6F00e11aD170e313401Fc5";
var matchingABI=require('../../matchingABI');
var matchingABI=matchingABI.matchingABI;
var matchingcontract=web3.eth.contract(matchingABI).at(matchingAddress);
const { settings } = require('../../../app');
router.get('/', function (req, res,next) {
    if (!req.session.user_id) {
        res.redirect('/login')
    } else {
        //var walletaddress=req.session.user_wallet_address;
        var pool=req.connection;
        pool.getConnection(function(err,connection){
            connection.query('SELECT * FROM credit_list WHERE owner_walletaddress=?',[req.session.user_wallet_address],function(err,rows){
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err

                    });
                    console.log(err);

                }if(rows.length==0){
                    res.render('invest/margin_transaction/no_credit', {
                        session: req.session.user_id,
                        user: req.session.user_id,
                        address: req.session.user_wallet_address,
                        no_found_warn: '您目前沒有可使用的投資憑證'
                    })
                } 
                else {
                    var idlist=rows;
                    
                }
            
            
            res.render('invest/margin_transaction/use_margin_credit', {
                session: req.session.user_id,
                user: req.session.user_id,
                address: req.session.user_wallet_address,
                //amount_array: amount_array,
                idlist: idlist,
                //now_avail_amount:now_avail_amount
            });
            })    
        })
        
    }
});
router.post('/',function(req,res){
    var randID=req.body['rand_id'];
    var use_amount=req.body['use_amount'];
    var repay_rate=req.body['repay_rate'];
    console.log("repay_rate:",repay_rate)
    var walletaddress=req.session.user_wallet_address;
    var platform="0x4192a918653Ba6CCF27d4956F8bb60943278e88B";
    var platform2="0xe1d739f2A154aA0cEcE4dD78e32bAc9F3F485C57";
    if(repay_rate == 3){
		var rate=3;
    }
    else if(repay_rate==6){
        var rate=6;
    }
	else{
		var rate=12;
	}
    if(use_amount==0|use_amount=='undefined'){
        res.redirect('/margin_transaction/use_margin_credit');
    }
    var pool=req.connection
    pool.getConnection(function(err,connection){
        connection.query('SELECT * FROM credit_list WHERE randID=?',[randID],function(err,rows){
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err

                });
                console.log(err);
            }else{
                var creditID=rows[0].creditID;
                var strategyID=rows[0].strategyID;
                console.log(creditID)
                var buy_price=rows[0].buy_price;
                var buy_amount=rows[0].buy_amount;
                var now_avail_amount=creditcontract.get_credit_amount.call(creditID).toNumber();
                if (use_amount>now_avail_amount) {
                    res.render('invest/margin_transaction/use_credit_fail', {
                        not_enough_warn: "您欲使用額度超過您目前可用額度",
                        now_avail_amount:now_avail_amount
                    })
                }else{
                    var pay_data = creditcontract.approve_and_transfer.getData(walletaddress,platform,use_amount,{ from: platform });
                    var pay_count = web3.eth.getTransactionCount(platform);
                    var gasPrice_pay = web3.toWei(20, 'gwei')
                    var gasLimit_pay = 8000000;
                    var pay_rawTrans = {
                        "from": platform,
                        "nonce": web3.toHex(pay_count),
                        "gasPrice": web3.toHex(gasPrice_pay),
                        "gasLimit": web3.toHex(gasLimit_pay),
                        "to": creditAddress,
                        "value": "0x0",
                        "data": pay_data,
                        "chainId": 0x04
                    };
                    var platform_privKey = Buffer.from("a9497f7a63cbce8f9449608dc31c635787f8cc0869f064b3748375bcdeca907e", "hex");//platform
                    var pay_tx = new Tx(pay_rawTrans, { chain: 'rinkeby' });
                    pay_tx.sign(platform_privKey);
                    var serializedTx_pay = pay_tx.serialize();
                    var txhash=web3.eth.sendRawTransaction('0x' + serializedTx_pay.toString('hex'));
                    console.log("pay_hash:",txhash)
                    //pay credit record
                    setTimeout(function(){
                        var record_data = creditcontract.pay_credit.getData(walletaddress,creditID,use_amount,{ from: platform });
                        var record_count = web3.eth.getTransactionCount(platform);
                        var gasPrice_record = web3.toWei(20, 'gwei')
                        var gasLimit_record = 8000000;
                        var record_rawTrans = {
                        "from": platform,
                        "nonce": web3.toHex(record_count),
                        "gasPrice": web3.toHex(gasPrice_record),
                        "gasLimit": web3.toHex(gasLimit_record),
                        "to": creditAddress,
                        "value": "0x0",
                        "data": record_data,
                        "chainId": 0x04
                    };
                    var platform_privKey = Buffer.from("a9497f7a63cbce8f9449608dc31c635787f8cc0869f064b3748375bcdeca907e", "hex");//platform
                    var record_tx = new Tx(record_rawTrans, { chain: 'rinkeby' });
                    record_tx.sign(platform_privKey);
                    var serializedTx_record = record_tx.serialize();
                    var txhash2=web3.eth.sendRawTransaction('0x' + serializedTx_record.toString('hex'));
                    console.log("pay_record_hash:",txhash2)
                        
                    },20000)
                    var randbytes=('0x' + crypto.randomBytes(8).toString('hex'));
                    var match_data=matchingcontract.make_funding_requirement.getData(walletaddress,use_amount,creditID,randbytes,rate,{from:platform2});
                    var match_count = web3.eth.getTransactionCount(platform2);
                    var gasPrice_match = web3.toWei(20, 'gwei')
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
                    setTimeout(function(){
                        var requirement_len=matchingcontract.requirement_length.call().toNumber();
                        console.log(requirement_len)
                        var requirementID=matchingcontract.get_requirement_id.call(requirement_len-1);
                        console.log('requirementID:',requirementID)
                        const onTime = () => {
                            const date = new Date();
                            const mm = date.getMonth() + 1;
                            const dd = date.getDate();
                            return [date.getFullYear(), "-" +
                                (mm > 9 ? '' : '0') + mm, "-" +
                                (dd > 9 ? '' : '0') + dd
                            ].join('');
                        }
                        var create_date = onTime();
                        var rand=('0x' + crypto.randomBytes(6).toString('hex'))
                        pool.getConnection(function (err, connection) {
                            connection.query('INSERT INTO funding_requirement(requirementID,rand,creditID,borrower,borrower_id,funding_need,strategyID,credit_type,create_date,rate_times,match_status,now_matched_amount,now_matched_percent) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',[requirementID,rand,creditID,req.session.user_wallet_address,req.session.user_id,use_amount,strategyID,'Margin',create_date,repay_rate,'false',0,0], function (err, rows) {
                                if (err) {
                                    res.render('error', {
                                        message: err.message,
                                        error: err

                                    });
                                    console.log(err);
                                } else {
                                    console.log('Insert into funding_requirement success!')
                                }
                            })
                            connection.query('SELECT * FROM stocks WHERE stockid = ?', [strategyID], function (err, rows) {
                                if (err) {
                                    res.render('error', {
                                        message: err.message,
                                        error: err
                                    });
                                }
                                else {
                                    var com_name=rows[0].nickname;
                                    console.log(com_name)
                                    connection.query('INSERT INTO transaction(randID,idtransaction_no,investment_amount,buyer_id,com_name,buy_price,buy_role,buy_or_sell,type,requirement) VALUES(?,?,?,?,?,?,?,?,?,?)',[rand,strategyID,buy_amount,req.session.user_id,com_name,buy_price,'user','buy','crypto',requirementID],function(err,rows){
                                        if (err) {
                                            res.render('error', {
                                                message: err.message,
                                                error: err
        
                                            });
                                            console.log(err);
                                        } else {
                                            console.log('Insert into transaction success!')
                                        }
                                    })
                                }
                            })
                            
                        connection.release();
                    })

                    res.render('invest/margin_transaction/use_margin_success', {
                        session: req.session.user_id,
                        requirementID:requirementID,
                        rand:rand,
                        user: req.session.user_id,
                        address: req.session.walletaddress,
                    });},20000)
                }
            }
        })
    })
    
});
module.exports = router;