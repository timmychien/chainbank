﻿var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const testnet = "https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35";
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

var token_minter = "0x63A40281087c53479382283dE03d64A83f5C7df0";

var token2_contractAddress = "0xf6daae7777472be83633329c2733a9246ab6a1b1";
var token2_contractABI=require('./token2_contractABI');
var token2_contractABI = token2_contractABI.token2_contractABI;
var contract = web3.eth.contract(token2_contractABI).at(token2_contractAddress);

router.post('/', function (req, res) {
    var pool = req.connection;

    pool.getConnection(function (err, connection) {
        console.log(req.session_id+"we got");
        connection.query('SELECT * FROM user_information WHERE user_id = ?', [req.session.user_id], function (err, rows) {
            if (err) {
                res.render('login/login');
            }
            console.log("have"+req.session.user_id);
            console.log("session"+req.session);
            if(rows.length!=0){
                console.log(req.session.user_id);
                console.log(rows)
                var to_wallet_address = rows[0].user_wallet_address; 
                var total_exchange = req.body.PayAmt;
                var total_exchange = total_exchange * Math.pow(10, 18);
                var count = web3.eth.getTransactionCount(token_minter);
                console.log(total_exchange);
                var gasPrice = web3.toWei(60, 'gwei');
                var gasLimit = 8000000;
                var rawTransaction = {
                    "from": token_minter,
                    "nonce": web3.toHex(count),
                    "gasPrice": web3.toHex(gasPrice),
                    "gasLimit": web3.toHex(gasLimit),
                    "to": token2_contractAddress,
                    "value": "0x0",
                    "data": contract.transfer.getData(to_wallet_address, total_exchange, { from: token_minter }),//轉100枚Token
                    "chainId": 0x04
                };

                var privKey = Buffer.from("83ac05c778568e70fcef4e57a73ccb4641c31d44f7e6a117a61c35231f4442d1", 'hex');
                var tx = new Tx(rawTransaction, { chain: 'rinkeby' });
                tx.sign(privKey);
                var serializedTx = tx.serialize();
                web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
                    if (!err) {
                        var tx_hash = hash;
                        console.log(req.body);
                        console.log(req.body.PaymentType);
                        console.log(req.body.PayAmt);
                        console.log(req.body.PaymentTypeChargeFee);
                        res.render('repay/receipt', {
                            user: req.session.user_id,
                            date: req.body.PaymentDate,
                            payment_type: req.body.PaymentType,
                            total_exchange: req.body.PayAmt,
                            fee: req.body.PaymentTypeChargeFee,
                            result: req.body.RtnMsg,
                            tx_hash: tx_hash,
                            tx_page: "https://rinkeby.etherscan.io//tx/" + tx_hash
                        });
                    }
                    else {
                        console.log(err);
 
                    }
                });
            }

        });

        connection.release();

    });


});


module.exports = router;