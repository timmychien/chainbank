var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const testnet = "https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35";
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
var token2_contractAddress = "0xf6daae7777472be83633329c2733a9246ab6a1b1";
var token2_contractABI=require('./token2_contractABI');
var token2_contractABI = token2_contractABI.token2_contractABI;
var contract = web3.eth.contract(token2_contractABI).at(token2_contractAddress);

router.get('/', function (req, res) {
    var pool = req.connection;
    var now=Date.now();
    var formatnow = new Date(now);

    if (!req.session.user_id) {
        res.redirect('/login');
    }
    else {
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM user_information WHERE user_id = ?', [req.session.user_id], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                }
                else {
                    req.session.save(function(err){
                        // session saved
                        req.session.user_id;
                      });
                    // use myaccount.pug
                    var token_balance = contract.balanceOf.call(rows[0].user_wallet_address).toNumber();
                    var now_balance = token_balance / Math.pow(10, 18);
                    console.log(req.session.user_id);
                    res.render('deposit_tokens/deposit_tokens',{
                        user:req.session.user_id,
                        balance:now_balance
                    });
                }

            })

            connection.release();

        });
        
    }

});

module.exports = router;