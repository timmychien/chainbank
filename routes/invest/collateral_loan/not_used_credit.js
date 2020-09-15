//Jason
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var platform="0x4192a918653Ba6CCF27d4956F8bb60943278e88B";
var platform2="0xe1d739f2A154aA0cEcE4dD78e32bAc9F3F485C57";
var collateralABI=require('../../collateralABI');
var contractABI=collateralABI.collateralABI;
var Web3 = require('web3');
var Tx=require('ethereumjs-tx').Transaction;
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35"));
//var contractAddress = "0x520bc82ac3214264eb813e403095463b826bf2b3";
var contractAddress = "0x45176c52685298ae9e6944bfe67bc3924f12e1bb";
var contract = web3.eth.contract(contractABI).at(contractAddress);
//matching 
//var matchingAddress="0x323334b19fca52e0b4f6158f3dc361e96e7a1e45";
var matchingAddress="0x323334b19fca52e0b4f6158f3dc361e96e7a1e45";
var matching2ABI=require('../../matching2ABI');
const { settings } = require('../../../app');
var matchingABI=matching2ABI.matching2ABI;
var matchingcontract=web3.eth.contract(matchingABI).at(matchingAddress);

router.get('/', function (req, res) {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        var pool = req.connection;
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM credit_list WHERE owner_walletaddress=? AND credit_type = ?',[req.session.user_wallet_address,'Collateral'], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                } 
                else {
                    var data = rows;
                    
                    res.render('invest/collateral_loan/not_used_credit', {
                        session: req.session.user_id,
                        user:req.session.user_id,
                        data:data,
                    });
                }

            });
            connection.release();
        })
    }
});
router.post('/',function(req,res){
    var pool = req.connection;
    var randID = req.body['rand_id']
    var set_amount = req.body['set_amount'];
    var walletaddress = req.session.user_wallet_address;
    var repay_rate=req.body['repay_rate'];
    console.log("repay_rate:",repay_rate)

    if(repay_rate == 3){
		var rate=3;
    }
    else if(repay_rate==6){
        var rate=6;
    }
	else{
		var rate=12;
	}
    pool.getConnection(function(err,connection){
        connection.query('SELECT * FROM credit_list WHERE randID=?',[randID],function(err,rows){
            if(err){
                res.render('error',{
                    message:err.message,
                    error:err
                });
            }else{
                //transfer collateral_credit
                var strategyID = rows[0].strategyID;
                var creditID = rows[0].creditID;
                var pay_data = contract.unlockCredit.getData(walletaddress,creditID,set_amount,{ from: platform });
                var pay_count = web3.eth.getTransactionCount(platform);
                var gasPrice_pay = web3.toWei(20, 'gwei')
                var gasLimit_pay = 8000000;
                var pay_rawTrans = {
                            "from": platform,
                            "nonce": web3.toHex(pay_count),
                            "gasPrice": web3.toHex(gasPrice_pay),
                            "gasLimit": web3.toHex(gasLimit_pay),
                            "to": contractAddress,
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
                //confirm transfer
                    setTimeout(function(){
                    
				    console.log(walletaddress)
                    var count = web3.eth.getTransactionCount(platform);
                    var contract =  web3.eth.contract(contractABI).at(contractAddress);
				    var randID = rows[0].randID;
				    console.log(randID)
				    var collateral_data = contract.pay_credit.getData(walletaddress,creditID,set_amount,{from:platform});
                    var gasPrice = web3.eth.gasPrice.toNumber()*2;
                    console.log(gasPrice);
                    var gasLimit = 5000000;

                    var rawTransaction = {
                    "from": "0x4192a918653Ba6CCF27d4956F8bb60943278e88B",
  					"nonce": web3.toHex(count),
  					"gasPrice": web3.toHex(gasPrice),
  					"gasLimit": web3.toHex(gasLimit),
  					"to": contractAddress,
  					"value": "0x0",
					"data": collateral_data,
  					"chainId": 0x04
				};
				
				var privKey = Buffer.from("a9497f7a63cbce8f9449608dc31c635787f8cc0869f064b3748375bcdeca907e","hex");
				//var privKey = Buffer.from("b620525f6792eb5caa8313aa139293264541b24afe92f035e2b4db3a8308349d","hex");
				//console.log(privKey)
				var Tx=require('ethereumjs-tx').Transaction;
				var tx = new Tx(rawTransaction,{chain:'rinkeby'});
				tx.sign(privKey);
				var serializedTx = tx.serialize();
				web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
  					if (!err){
						console.log(hash);
					  }
  					else{
						  console.log(err);
					}
				});
            },20000)
                    var randbytes=('0x' + crypto.randomBytes(8).toString('hex'));
                    var match_data=matchingcontract.make_funding_requirement.getData(walletaddress,set_amount,creditID,randbytes,rate,{from:platform2});
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
                        //var requirementID2=matchingcontract.get_requirement_id.call(requirement_len-2);
                        console.log('requirementID:',requirementID)
                        //console.log('requirementID:',requirementID2)
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
                        var create_date = onTime();
                        var rand=('0x' + crypto.randomBytes(6).toString('hex'))
                        pool.getConnection(function (err, connection) {
                            connection.query('INSERT INTO funding_requirement(requirementID,rand,creditID,borrower,borrower_id,funding_need,strategyID,credit_type,create_date,rate_times,match_status,now_matched_amount,now_matched_percent) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',[requirementID,rand,creditID,req.session.user_wallet_address,req.session.user_id,set_amount,strategyID,'Collateral',create_date,repay_rate,'false',0,0], function (err, rows)  {
                                if (err) {
                                    res.render('error', {
                                        message: err.message,
                                        error: err

                                    });
                                    console.log(err);
                                } else {
                                    console.log('Insert Success!')
                                }
                        })
                        connection.release();
                    })

                    res.redirect('/')},20000)
            }
        });
    });
});

module.exports = router;