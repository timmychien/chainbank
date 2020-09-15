//Jason
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Web3 = require('web3');
var Tx=require('ethereumjs-tx').Transaction;
const testnet = 'https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet))
var collateralABI=require('../../collateralABI');
var contractABI=collateralABI.collateralABI;
//var contractAddress = "0x520bc82ac3214264eb813e403095463b826bf2b3";
var contractAddress = "0x45176c52685298ae9e6944bfe67bc3924f12e1bb";
var contract = web3.eth.contract(contractABI).at(contractAddress);
router.get('/', function (req, res) {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        var pool = req.connection;
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM transaction WHERE buyer_id=? AND collateral_status=?',[req.session.user_id,"notused"], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                } 
                if(rows.length==0){
                    res.render('invest/collateral_loan/collateral_redirect',{
                       
                    })
                }
                else {
                    var data = rows;
                    res.render('invest/collateral_loan/own_portfolio', {
                        session: req.session.user_id,
                        user:req.session.user_id,
                        data: data,
                    });
                }
            });
            connection.release();
        })
    }
});

router.post('/',function(req,res){
    var pool = req.connection;
	var randID=req.body['rand_id'];
	var updated_price = parseInt(req.query.value);
	var repay_method=req.body['repay_method'];
	console.log(updated_price)
	if(repay_method == "只還利息"){
		var method=true;
	}
	else{
		var method=false;
	}
	//console.log("idtransaction_number"+idtransaction_no)
	console.log("marketvalue"+ updated_price)
    pool.getConnection(function(err,connection){
        connection.query('SELECT * FROM transaction WHERE randID=?',[randID],function(err,rows){
            if(err){
                res.render('error',{
                    message:err.message,
                    error:err
                });
            }else{
				
				var platform="0x4192a918653Ba6CCF27d4956F8bb60943278e88B";
                var walletaddress = req.session.user_wallet_address;
				console.log(walletaddress)
                var count = web3.eth.getTransactionCount(platform);
				var randID = rows[0].randID;
				console.log(randID)
				var strategyID = rows[0].idtransaction_no;
				req.session.strategyID = strategyID;
				console.log(strategyID)
				var updatedprice = parseInt(req.query.value);
				console.log(updatedprice)
				connection.query('SELECT * FROM credit_list WHERE randID=?',[randID],function(err,rows){
					if(err){
						res.render('error',{
							message:err.message,
							error:err
						});
					}
					if(rows.length==0){
						//req.session.updated_price = updatedprice;
				var collateral_data = contract.mint_collateral_credit.getData(walletaddress,false,strategyID,10,method,updatedprice,randID,{from:platform});
                var gasPrice = web3.eth.gasPrice.toNumber()*2;
                console.log(gasPrice);
                var gasLimit = 5000000;
				console.log("GET"+updatedprice)
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
				
				var tx = new Tx(rawTransaction,{chain:'rinkeby'});
				tx.sign(privKey);
				var serializedTx = tx.serialize();
				web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
  					if (!err){
						console.log(updatedprice)
						console.log(hash);
					  }
  					else{
						  console.log(err);
					}
				});
				console.log(method)
				setTimeout(function(){
				//var selected=rows;
				//var id=rows.portfolio_id;
				var collateral_info_length = contract.collateral_info_length.call().toNumber();
				console.log(collateral_info_length)
				var collateral_creditID = contract.get_collateral_credit_id.call(collateral_info_length-1);
				console.log(collateral_creditID)
				var creditAmount = contract.get_credit_amount.call(collateral_info_length-1).toNumber();
				console.log(creditAmount)
				//var ownId = req.body.portfolio_id;
                //req.session.ownId=rows[0].portfolio_id;
                //req.session.creditid=rows[0].credit_id;
                //console.log(req.session.creditid)
                //console.log(selected)
				//console.log('還款方式：'+repay_method)
				//console.log(randID)
				//req.session.creditid = contract.get_credit_id.call(ownId);
				//req.session.ownId = rows[0].idtransaction_no;
				//console.log(req.session.ownId)
				//var rand=('0x' + crypto.randomBytes(4).toString('hex'))
				req.session.creditAmount = contract.get_collateral_credit_amount.call(collateral_creditID).toNumber();
				var pool = req.connection;
				pool.getConnection(function(err,connection){
					connection.query('INSERT INTO credit_list(randID,creditID,avail_amount_init,strategyID,owner_walletaddress,credit_type)VALUES(?,?,?,?,?,?)', [randID,collateral_creditID,creditAmount,strategyID,walletaddress,'Collateral'], function(err,rows){
						if(err){
							res.render('error',{
								message:err.message,
								error:err
							});
							console.log(err);
						}else{
							console.log('Insert Success!')
						}
					})
					connection.query("UPDATE transaction SET collateral_status=? WHERE randID=?",["used",randID],function(err,rows){
						if(err){
							res.render('error',{
								message:err.message,
								error:err
							});
						}else{
							console.log('update success!')
							
						}
					})
					connection.release();
				})
				res.redirect('/own_portfolio/collateral_credit')

				},30000);
					}
					else{
						
							res.render('invest/collateral_loan/credit_redirect',{
							})
						
						
					}
				})
				
                
            }
        })
        
    });
});



router.get('/collateral_credit',function(req,res){
    res.render('invest/collateral_loan/collateral_credit',{
        session: req.session.user_id,
        user:req.session.user_id,
        strategyID : req.session.strategyID,
        creditAmount : req.session.creditAmount

    })

});


module.exports = router;