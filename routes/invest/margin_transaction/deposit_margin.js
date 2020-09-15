var express = require('express');
var crypto = require('crypto');
//const awaitTransactionMined = require('await-transaction-mined');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35"));
//token
//var token_contractAddress = "0xf6daae7777472be83633329c2733a9246ab6a1b1";
var token_contractAddress = "0xf6daae7777472be83633329c2733a9246ab6a1b1";
var token2_contractABI = require('../../token2_contractABI');
var token2_contractABI = token2_contractABI.token2_contractABI;
var contract = web3.eth.contract(token2_contractABI).at(token_contractAddress);
//margin_credit
var creditAddress = "0x8c51c69a6bc5d4836da8433ceefdc80e7e60ddd7";
var margin2ABI = require('../../margin2ABI');
var margin2ABI = margin2ABI.margin2ABI;
var creditcontract = web3.eth.contract(margin2ABI).at(creditAddress);

//matching
var matchingAddress = "0x33DA8C77ea7744eFcd6F00e11aD170e313401Fc5";
var matchingABI = require('../../matchingABI');
var matchingABI = matchingABI.matchingABI;
var matchingcontract = web3.eth.contract(matchingABI).at(matchingAddress);
//var matchingcontract=web3.eth.contract(matcingABI).at(matcingAddress);
//platform address
var token_minter = "0x63A40281087c53479382283dE03d64A83f5C7df0";
var platform = "0x4192a918653Ba6CCF27d4956F8bb60943278e88B";
var platform2 = "0xe1d739f2A154aA0cEcE4dD78e32bAc9F3F485C57";


//var matchingcontract=web3.eth.contract(matchingABI).at(matchingAddress);

//const { runInNewContext } = require('vm');


//<button class="return_page"><a href="/margin_transaction">回前頁</a></button>
router.get('/', function (req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/login')
    } else {
        //
        res.render('invest/margin_transaction/deposit_margin', {
            session: req.session.user_id,
            user: req.session.user_id,
            address: req.session.user_wallet_address
        });
    }
});
//(clemmy) I change the below "get router" to pass the portfolio that user want to invest in.
router.get('/:id/:value/:amount', function (req, res) {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        //(clemmy) I add the parameters(strategy,value,amount) to pass the strategy id. 
        var pool = req.connection;
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM user_information WHERE user_id=?', [req.session.user_id], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });

                } else {
                    console.log("userid" + req.session.user_id);
                    req.session.user_wallet_address = rows[0].user_wallet_address;
                    var walletaddress = rows[0].user_wallet_address;
                    //var token_contractAddress = "0xBC2aef4d42c5a3D71685e7497f49abD3F64B4896";//ropsten
                    //about contract
                    var token_balance = contract.balanceOf.call(rows[0].user_wallet_address).toNumber();
                    var now_balance = token_balance / Math.pow(10, 18);
                    //var token_balance = tokencontract.balanceOf.call(walletaddress).toNumber();
                    //var now_balance = token_balance / Math.pow(10, 18);
                    connection.query('SELECT * FROM stocks WHERE nickname=?', [req.params.id], function (err, rows) {
                        if (err) {
                            res.render('error', {
                                message: err.message,
                                error: err
                            });
                            console.log(err);
                        } else {
                            var amount = req.params.amount.replace(/_/,".");
                            amount=setCharAt(amount);
                            var value =req.params.value.replace(/_/,".");
                            value=setCharAt(value);

                            function setCharAt(str) {
                              str = str.replace(/_/g, "");
                              return str;
                            }
                            req.session.user_wallet_address = walletaddress;
                            console.log(req.params.id);
                            console.log(rows[0].stockid);
                            console.log(req.session.user_id);
                            res.render('invest/margin_transaction/deposit_margin', {
                                session: req.session.user_id,
                                user: req.session.user_id,
                                address: walletaddress,
                                strategy: req.params.id,
                                value: value,
                                amount: amount,
                                strategyID: rows[0].stockid,
                                now_balance: now_balance,

                            });
                        }


                    })

                }
                console.log(rows);

            });
            connection.release();
        });
    }
});
//function
function waitForTransactionReceipt(hash) {
console.log('waiting for contract to be mined');
const receipt = web3.eth.getTransactionReceipt(hash);
// If no receipt, try again in 1s
if (receipt == null) {
    setTimeout(() => {
        waitForTransactionReceipt(hash);
    }, 1000);
} else {
    // The transaction was mined, we can retrieve the contract address
    console.log('deposit success!');
    //testContract(receipt.contractAddress);
}
}


router.post('/:id/:value/:amount', function (req, res, next) {
    var amount = req.params.amount.replace(/_/,".");
    amount=setCharAt(amount);
    function setCharAt(str) {
      str = str.replace(/_/g, "");
      return str;
    }
    var buy_price=req.params.value;
    var buy_amount = amount;
    console.log('buy_amount', buy_amount)
    var set_amount = req.body.set_amount;
    console.log(set_amount);
    var strategyID;
    var pool = req.connection;
    console.log(req.body);
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM stocks WHERE nickname=?', [req.params.id], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
                console.log(err);
            } else {
                strategyID = rows[0].stockid;
                //req.session.strategyID = strategyID;
                connection.query('SELECT * FROM user_information WHERE user_id=?', [req.session.user_id], function (err, rows) {
                    if (err) {
                        res.render('error', {
                            message: err.message,
                            error: err
                        });
                        console.log(err);
                    } else {
                        // change the strategy ID and connect this with price.
                        // (clemmy)intergrate
                        // credit average
                        var deposit_amount = set_amount;
                        var walletaddress = rows[0].user_wallet_address;
                        console.log(walletaddress);
                        //reset walllet address

                        //var privatekey=req.session.private_key;//(?)
                        //var token_contractAddress = "0xBC2aef4d42c5a3D71685e7497f49abD3F64B4896";//ropsten
                        var amount_deposit = deposit_amount * Math.pow(10, 18);
                        var token_balance = contract.balanceOf.call(rows[0].user_wallet_address).toNumber();
                        var now_balance = token_balance / Math.pow(10, 18);
                        if (token_balance < amount_deposit) {
                            res.render('invest/margin_transaction/deposit_margin', {
                                not_enough_warn: "您的平台幣不足，請補足平台幣",
                                now_balance: now_balance,
                                deposit_amount: deposit_amount,
                                token_balance: token_balance,
                                session: req.session.user_id,
                                user_id: req.session.user_id,
                            });
                        } else {
                            //call token contract transfer_with_approve
                            var count = web3.eth.getTransactionCount(token_minter);
                            var data = contract.approve_and_transfer.getData(rows[0].user_wallet_address, token_minter, deposit_amount, { from: token_minter });
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
                            var deposithash = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
                            console.log('DepositHash', deposithash)
                            //var init_info_length = creditcontract.margin_info_length.call().toNumber();
                            var amount_deposit = amount_deposit / Math.pow(10, 18);
                            var rand = ('0x' + crypto.randomBytes(32).toString('hex'));
                            console.log('StrategyID2', strategyID);
                            console.log('wallet', walletaddress);
                            console.log('amount', amount_deposit);
                            console.log('rand', rand);
                            var mint_data = creditcontract.mint_margin_credit.getData(walletaddress, false, true, amount_deposit, 2, strategyID, rand, { from: platform });
                            var mint_count = web3.eth.getTransactionCount(platform);
                            var gasPrice_mint = web3.toWei(20, 'gwei')
                            var gasLimit_mint = 8000000;
                            var mint_rawTrans = {
                                "from": platform,
                                "nonce": web3.toHex(mint_count),
                                "gasPrice": web3.toHex(gasPrice_mint),
                                "gasLimit": web3.toHex(gasLimit_mint),
                                "to": creditAddress,
                                "value": "0x0",
                                "data": mint_data,
                                "chainId": 0x04
                            };
                            var platform_privKey = Buffer.from("a9497f7a63cbce8f9449608dc31c635787f8cc0869f064b3748375bcdeca907e", "hex");//platform
                            var mint_tx = new Tx(mint_rawTrans, { chain: 'rinkeby' });
                            mint_tx.sign(platform_privKey);
                            var serializedTx_mint = mint_tx.serialize();
                            var txhash = web3.eth.sendRawTransaction('0x' + serializedTx_mint.toString('hex'));
                            console.log("mint_hash:", txhash)
                            waitForTransactionReceipt(txhash);
                            // get creditID and avail_amount
                            setTimeout(function () {
                                var info_length = creditcontract.margin_info_length.call().toNumber();
                                console.log(info_length)
                                var creditID = creditcontract.get_credit_id.call(info_length - 1);
                                req.session.creditID = creditID;
                                console.log(creditID)
                                var avail_amount = creditcontract.get_avail_amount.call(info_length - 1).toNumber();
                                req.session.avail_amount = avail_amount;
                                console.log(avail_amount)
                                var randID = ('0x' + crypto.randomBytes(4).toString('hex'));
                                var pool = req.connection;
                                console.log(walletaddress);
                                console.log(randID);
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
                                var createtime = onTime();
                                pool.getConnection(function (err, connection) {
                                    connection.query('INSERT INTO credit_list(randID,creditID,avail_amount_init,margin,strategyID,created_time,borrower_id,owner_walletaddress,credit_type,buy_price,buy_amount) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [randID, creditID, avail_amount, deposit_amount, strategyID,createtime,req.session.user_id, walletaddress, 'Margin', buy_price, buy_amount], function (err, rows) {
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
                                res.render('invest/margin_transaction/deposit_redirect', {
                                    session: req.session.user_id,
                                    creditID: creditID,
                                    avail_amount: avail_amount,
                                    user_id: req.session.user_id,
                                    address: req.session.user_wallet_address,
                                    deposit_amount: deposit_amount,
                                });
                            }, 30000);
                           
                        }
                    }

                })


            }
            console.log(req.params.id);
            console.log(rows[0].stockid);

        })
    })


})
router.post('/', function (req, res, next) {
    var set_amount = req.body['set_amount'];

    // change the strategy ID and connect this with price.
    // (clemmy)intergrate
    // credit average
    //if set-amount is not integer ,do 4 rounding
    if (set_amount % 1 != 0) {
        var deposit_amount = Math.round(set_amount) * 0.4
        console.log(deposit_amount)
    }
    else {
        var deposit_amount = set_amount * 0.4
    }
    var walletaddress = req.session.user_wallet_address;
    var amount_deposit = deposit_amount * Math.pow(10, 18);
    var token_balance = tokencontract.balanceOf.call(walletaddress).toNumber();
    var now_balance = token_balance / Math.pow(10, 18);
    if (token_balance < amount_deposit) {
        res.render('invest/margin_transaction/deposit_margin', {
            not_enough_warn: "您的平台幣不足，請補足平台幣",
            now_balance: now_balance,
            deposit_amount: deposit_amount,
            token_balance: token_balance,
            session: req.session.user_id,
            user: req.session.user_id,
        });
    } else {
        //call token contract approve_and_transfer
        var count = web3.eth.getTransactionCount(token_minter);
        var data = contract.approve_and_transfer.getData(rows[0].user_wallet_address, token_minter, deposit_amount, { from: token_minter });
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
        var deposithash = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
        console.log('DepositHash', deposithash)
        //var init_info_length = creditcontract.margin_info_length.call().toNumber();
        var amount_deposit = amount_deposit / Math.pow(10, 18);
        var strategyID = req.body.strategyID;
        req.session.strategyID = strategyID
        var rand = ('0x' + crypto.randomBytes(32).toString('hex'));
        var mint_data = creditcontract.mint_margin_credit.getData(walletaddress, false, true, amount_deposit, 2, strategyID, rand, { from: platform });
        var mint_count = web3.eth.getTransactionCount(platform);
        var gasPrice_mint = web3.toWei(60, 'gwei')
        var gasLimit_mint = 8000000;
        var mint_rawTrans = {
            "from": platform,
            "nonce": web3.toHex(mint_count),
            "gasPrice": web3.toHex(gasPrice_mint),
            "gasLimit": web3.toHex(gasLimit_mint),
            "to": creditAddress,
            "value": "0x0",
            "data": mint_data,
            "chainId": 0x04
        };
        var platform_privKey = Buffer.from("a9497f7a63cbce8f9449608dc31c635787f8cc0869f064b3748375bcdeca907e", "hex");//platform
        var mint_tx = new Tx(mint_rawTrans, { chain: 'rinkeby' });
        mint_tx.sign(platform_privKey);
        var serializedTx_mint = mint_tx.serialize();
        var txhash = web3.eth.sendRawTransaction('0x' + serializedTx_mint.toString('hex'));
        console.log("mint_hash:", txhash)
        // get creditID and avail_amount
        setTimeout(function () {
            var info_length = creditcontract.margin_info_length.call().toNumber();
            console.log(info_length)
            var creditID = creditcontract.get_credit_id.call(info_length - 1);
            console.log(creditID)
            req.session.creditID = creditID;
            var avail_amount = creditcontract.get_avail_amount.call(info_length - 1).toNumber();
            req.session.avail_amount = avail_amount;
            console.log(avail_amount)
            var randID = ('0x' + crypto.randomBytes(4).toString('hex'));
            req.session.randID = randID;
            var pool = req.connection;
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
            var createtime = onTime();
            pool.getConnection(function (err, connection) {
                connection.query('INSERT INTO credit_list(randID,creditID,avail_amount_init,margin,strategyID,created_time,owner_walletaddress,credit_type) VALUES(?,?,?,?,?,?,?,?)', [randID, creditID, avail_amount, deposit_amount, strategyID, createtime,walletaddress, 'Margin'], function (err, rows) {
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

            res.render('invest/margin_transaction/deposit_redirect', {
                session: req.session.user_id,
                creditID: req.params.creditID,
                strategyID:req.params.strategyID,
                avail_amount: req.params.avail_amount,
                user_id: req.session.user_id,
                address: req.session.user_wallet_address,
                deposit_amount: deposit_amount,
            });
           
        }, 30000);

    }

})
module.exports = router;