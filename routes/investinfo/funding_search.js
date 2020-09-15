var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/login');
    }else{
        var pool = req.connection;
        pool.getConnection(function(err,connection){
            connection.query('SELECT * FROM funding_requirement',function(err,rows){
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
                    var data=rows;
                    res.render('investinfo/funding_search', {
                        user: req.session.user_id,
                        data:data,
                    });
                }
            })
            connection.release();
            })  
    
    }
        
  });

router.post('/', function (req, res) {
    var pool = req.connection;
    var search=req.body['search'];
    var colterm=req.body['colterm'];
    var inputs=req.body['inputs'];
    console.log(search)
    console.log(colterm)
    console.log(inputs)
        pool.getConnection(function (err, connection) {
            if(search=="funding_need"){
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
            if(search=="match_status"){
                if(colterm=="tr"){
                    var sql='SELECT * FROM funding_requirement WHERE match_status = "true"'+inputs;
                } if(colterm=="fl"){
                    var sql='SELECT * FROM funding_requirement WHERE match_status = "false"'+inputs;
                }
            }
            console.log(sql)
            connection.query(sql, function (err, rows) {
                console.log(rows);
                if(err){
                    console.log(err);
                } else{
                    var data=rows;
                    console.log(data.length)
                    res.render('investinfo/funding_search',{
                        data:data,
                    })
                }
            });
            connection.release();
        })
});
module.exports = router;



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
                var funding_need=rows[0].funding_need;
                var total_amount_need = funding_need*Math.pow(10,18);
                var now_matched_amount = rows[0].now_matched_amount;
                var invest_amount = amount_to_invest*Math.pow(10,18);
                var borrower=rows[0].borrower;
                var requirementID=rows[0].requirementID;
                var match_status=rows[0].match_status;
                var now_matched_percent=rows[0].now_matched_percent;
                console.log("目前媒合狀態:",match_status)
                if(match_status=='true'){
                    res.render('funding_provider/match_completed',{
                        match_completed_warn:"此資金需求已媒合完成，您無法投資"
                    })
                }else{
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
                        res.render('funding_provider/matching_success',{
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
                }
            }   
            }
        })
        connection.release();
    })
});
module.exports = router;