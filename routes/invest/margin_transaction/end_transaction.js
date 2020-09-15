var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35"));
//credit contract
var margin2_contractAddress = "0x8c51c69a6bc5d4836da8433ceefdc80e7e60ddd7";
var margin2ABI=require('../../margin2ABI');
var margin2ABI = margin2ABI.margin2ABI;
var creditcontract = web3.eth.contract(margin2ABI).at(margin2_contractAddress)
//token contract
var token2_contractAddress = "0xf6daae7777472be83633329c2733a9246ab6a1b1";
var token2_contractABI=require('../../token2_contractABI');
var token2_contractABI = token2_contractABI.token2_contractABI;
var tokencontract = web3.eth.contract(token2_contractABI).at(token2_contractAddress);
//
var token_minter = "0x63A40281087c53479382283dE03d64A83f5C7df0";
var platform="0x4192a918653Ba6CCF27d4956F8bb60943278e88B";
router.get('/', function (req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/login')
    } else {
        var pool=req.connection;
        pool.getConnection(function(err,connection){
            connection.query('SELECT * FROM credit_list WHERE borrower_id=?',[req.session.user_id],function(err,rows){
                if(err){
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                    console.log(err);
                }
                if(rows.length==0){
                    res.render('invest/margin_transaction/no_credit',{
                        session: req.session.user_id,
                        user_id: req.session.user_id,
                        address: req.session.user_wallet_address,
                        no_found_warn:'您目前沒有尚未結束的投資憑證'
                    })
                }else{
                    var creditlist=rows;
                    res.render('invest/margin_transaction/end_transaction', {
                        session: req.session.user_id,
                        user_id: req.session.user_id,
                        address: req.session.user_wallet_address,
                        creditlist: creditlist
                    });
                }
            })
            connection.release();
        })
        
    }
});
router.post('/', function (req, res) {
    var pool = req.connection;
    var rand_id= req.body['rand_id'];
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM credit_list WHERE randID=?', [rand_id], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            } else {
               var creditID=rows[0].creditID;
               req.session.creditID=creditID;
               var avail_amount_init=rows[0].avail_amount_init;
               req.session.avail_amount_init = avail_amount_init;
               var now_avail_amount=creditcontract.get_credit_amount.call(creditID).toNumber();
               req.session.now_avail_amount=now_avail_amount;
                if (avail_amount_init == now_avail_amount) {
                    res.render('invest/margin_transaction/end_transaction_confirm', {
                        avail_amount_init: avail_amount_init,
                        now_avail_amount: now_avail_amount,
                    })
                    
                } else {
                    res.render('invest/margin_transaction/end_transaction_fail', {
                        warn: "您未返還所有憑證，請確認您是否尚未收回所有憑證。"
                    });
                }
            }
        })
        connection.release();
    })
});


router.post('/confirm_end',function(req,res){
    var burn_data = creditcontract.burn_margin_credit.getData(req.session.creditID, req.session.user_wallet_address, { from: platform });
    var mint_count = web3.eth.getTransactionCount(platform);
    var gasPrice_mint = web3.eth.gasPrice.toNumber() * 1.5;
    var gasLimit_mint = 5000000;
    var mint_rawTrans = {
        "from": platform,
        "nonce": web3.toHex(mint_count),
        "gasPrice": web3.toHex(gasPrice_mint),
        "gasLimit": web3.toHex(gasLimit_mint),
        "to": margin2_contractAddress,
        "value": "0x0",
        "data": burn_data,
        "chainId": 0x04
    };
    var platform_privKey = Buffer.from("a9497f7a63cbce8f9449608dc31c635787f8cc0869f064b3748375bcdeca907e", "hex");//platform
    var burn_tx = new Tx(mint_rawTrans, { chain: 'rinkeby' });
    burn_tx.sign(platform_privKey);
    var serializedTx_burn = burn_tx.serialize();
    var txhash = web3.eth.sendRawTransaction('0x' + serializedTx_burn.toString('hex'));
    console.log("burn_hash:", txhash)
    //返還保證金
    var returnamount = (req.session.avail_amount_init*Math.pow(10,18))*2/3;
    console.log('returnamount',returnamount)
    var data = tokencontract.transfer.getData(req.session.user_wallet_address, returnamount, { from: token_minter });
    var count = web3.eth.getTransactionCount(token_minter);
    var gasPrice = web3.eth.gasPrice.toNumber() * 1.5;
    console.log("gas-price-for-return", gasPrice)
    var gasLimit = 2000000;
    var return_rawTrans = {
        "from": token_minter,
        "nonce": web3.toHex(count),
        "gasPrice": web3.toHex(gasPrice),
        "gasLimit": web3.toHex(gasLimit),
        "to": token_contractAddress,
        "value": "0x0",
        "data": data,
        "chainId": 0x03
    };
        var return_tx = new Tx(return_rawTrans, { chain: 'ropsten' });
        var minter_privKey = Buffer.from("83ac05c778568e70fcef4e57a73ccb4641c31d44f7e6a117a61c35231f4442d1", 'hex');
        return_tx.sign(minter_privKey);
        var serializedTx_return = return_tx.serialize();
        var return_hash = web3.eth.sendRawTransaction('0x' + serializedTx_return.toString('hex'));
        console.log("return_hash:", return_hash)

        //db刪除該憑證資料
        var pool = req.connection;
        pool.getConnection(function (err, connection) {
            connection.query('DELETE FROM credit_list WHERE creditID=?', [req.session.creditID], function (err, rows) {
                if (err) {
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                } else {
                    console.log('Delete success!')
                    res.render('invest/margin_transaction/end_transaction_success', {
                        notice: "返還憑證成功，憑證已銷毀，並返還平台幣"
                    });
                }
            });
            connection.release();
        });
    
})

module.exports = router;