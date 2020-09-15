var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const testnet = "https://rinkeby.infura.io/v3/80ddce42db94463ba6d6427f04451f35";
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

var token_minter = "0x63A40281087c53479382283dE03d64A83f5C7df0";

var token2_contractAddress = "0xf6daae7777472be83633329c2733a9246ab6a1b1";
var token2_contractABI=require('./token2_contractABI');
var token2_contractABI = token2_contractABI.token2_contractABI;
var TokenContract = web3.eth.contract(token2_contractABI).at(token2_contractAddress);

var matching2_contractAddress = "0x323334b19fca52e0b4f6158f3dc361e96e7a1e45";
var matching2ABI=require('./matching2ABI');
var matching2ABI = matching2ABI.matching2ABI;
var MatchingContract = web3.eth.contract(matching2ABI).at(matching2_contractAddress);

var margin2_contractAddress = "0x8c51c69a6bc5d4836da8433ceefdc80e7e60ddd7";
var margin2ABI=require('./margin2ABI');
var margin2ABI = margin2ABI.margin2ABI;
var Margin2Contract = web3.eth.contract(margin2ABI).at(margin2_contractAddress);

router.get('/', function (req, res) {
    var pool = req.connection;
    if (!req.session.user_id) {
        res.redirect('/login');
    }
    else {
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM funding_requirement WHERE borrower_id = ?', [req.session.user_id], function (err, rows) {
                if (err) {1
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                }
                else {
                    var credit_type;    
                    console.log(rows);
                    var repaylist=[];
                    var creditID;
                    var requirementid;
                    for(var i=0;i<rows.length;i++){
                    var rate_time;
                    var nowtimestamp = Date.now(); 
                    console.log("have"+rows);
                        if(rows[i].match_status=='true'){
                            credit_type = rows[i].credit_type;
                            creditID = rows[i].creditID;
                            rate_time = rows[i].rate_time;
                            console.log("creditID:"+creditID);
                            requirementid=rows[i].requirementID;
                            if(credit_type=="margin"||credit_type=="Margin"){
                                credit_type = "保證金";
                            }else if(credit_type=="Collateral"){
                                credit_type="擔保品";
                                //requirementid=rows[i].requirementID+"collateral";
                            }
                            var rate = Margin2Contract.credits.call(creditID)[6];
                            connection.query("SELECT * FROM credit WHERE requirementID = ? ORDER BY rate_time", [requirementid], function (err, rows) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    //group by and order by
                                    console.log("rows"+rows);
                                    var status;
                                    var repay_time;
                                    var months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
                                    for(var j=0;j<rows.length;j++){
                                        //console.log(rows[j].rate_time);
                                        //check for now date;    
                                        if(rows[j].status!="false"){           
                                            console.log("yes"+rows[j]);
                                            if(nowtimestamp<new Date(rows[j].deadline).getTime()){
                                                //console.log('nearest_time'+new Date(rows[j].deadline));
                                                //rate = Margin2Contract.credits.call(creditID)[6];           
                                                if(new Date(rows[j].deadline).getDate()<10){
                                                        repay_time = "0"+new Date(rows[j].deadline).getDate()+" "+months[new Date(rows[j].deadline).getMonth()]+" "+new Date(rows[j].deadline).getFullYear();
                                                }else{
                                                        repay_time = new Date(rows[j].deadline).getDate()+" "+months[new Date(rows[j].deadline).getMonth()]+" "+new Date(rows[j].deadline).getFullYear();
                                                }   
                                                if((parseInt(rows[j].repay_amount)+parseInt(rows[j].repay_rate))==(parseInt(rows[j].need_to_pay)+parseInt(rows[j].need_to_pay_rate))){
                                                    for(var i=j;i<rows.length;i++){
                                                        if((parseInt(rows[i].repay_amount)+parseInt(rows[i].repay_rate))==(parseInt(rows[i].need_to_pay)+parseInt(rows[i].need_to_pay_rate))){
                                                            if(i==(rows.length-1)){
                                                                //還款成功
                                                                console.log("rate!!!!"+i);
                                                                console.log("pay:"+rows[i].need_to_pay-rows[i].repay_amount);
                                                                console.log("success");
                                                                repay_per_detail={"requirementID":rows[i].requirementID,"status":"還款完成","rate_certain":(i+1),"creditID":creditID,"repay_time":"--","need_to_pay":(rows[i].need_to_pay)-rows[i].repay_amount,"need_to_pay_rate":(rows[i].need_to_pay_rate)-rows[i].repay_rate,"now_rate_time":(i+1)+"/"+rows.length,"credit_type":credit_type}
                                                                console.log(repay_per_detail);
                                                                repaylist.push(repay_per_detail);
                                                                break;
                                                            }
                                                        }else if((parseInt(rows[i].repay_amount)+parseInt(rows[i].repay_rate))!=(parseInt(rows[i].need_to_pay)+parseInt(rows[i].need_to_pay_rate))){
                                                            //前期可能有完整還款,但是future沒有
                                                            if(new Date(rows[i].deadline).getDate()<10){
                                                                repay_time = "0"+new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                            }else{
                                                                repay_time = new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                            } 
                                                            console.log("This time"+repay_time);
                                                            if(rows[i].status=="normal"){
                                                                status="待還款";
                                                            }
                                                            repay_per_detail={"requirementID":rows[i].requirementID,"status":status,"rate_certain":(i+1),"creditID":creditID,"repay_time":repay_time,"need_to_pay":(rows[i].need_to_pay)-rows[i].repay_amount,"need_to_pay_rate":(rows[i].need_to_pay_rate)-rows[i].repay_rate,"now_rate_time":(i+1)+"/"+rows.length,"credit_type":credit_type}
                                                            console.log(repay_per_detail);
                                                            repaylist.push(repay_per_detail);
                                                            break;
                                                        }
                                                    }
                                                }else{
                                                    //第一期沒付
                                                    console.log("Now"+repay_time);
                                                    if(rows[j].status=="ask"){
                                                        status="逾期請補款";
                                                    }else if(rows[j].status=="normal"){
                                                        status="待還款";

                                                    }
                                                    console.log("need_to_pay"+rows[j].need_to_pay_rate);
                                                    repay_per_detail={"requirementID":rows[j].requirementID,"status":status,"rate_certain":(j+1),"creditID":creditID,"repay_time":repay_time,"need_to_pay":(rows[j].need_to_pay)-rows[j].repay_amount,"need_to_pay_rate":(rows[j].need_to_pay_rate)-rows[j].repay_rate,"now_rate_time":(j+1)+"/"+rows.length,"credit_type":credit_type}
                                                    console.log(repay_per_detail);
                                                    repaylist.push(repay_per_detail);

                                                }
                                                    
                                                break; 
                                            }                               
                                    }else{
                                        //到期違約處理
                                        if((parseInt(rows[j].repay_amount)+parseInt(rows[j].repay_rate))==(parseInt(rows[j].need_to_pay)+parseInt(rows[j].need_to_pay_rate))){
                                            for(var i=j;i<rows.length;i++){
                                                if((parseInt(rows[i].repay_amount)+parseInt(rows[i].repay_rate))!=(parseInt(rows[i].need_to_pay)+parseInt(rows[i].need_to_pay_rate))){
                                                    //前期可能有完整還款,但是future沒有
                                                    if(new Date(rows[i].deadline).getDate()<10){
                                                        repay_time = "0"+new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                    }else{
                                                        repay_time = new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                    } 
                                                    //console.log("This time"+repay_time);
                                                    if(rows[i].status=="false"){
                                                        status="違約";
                                                    }
                                                    repay_per_detail={"requirementID":rows[i].requirementID,"status":"違約","rate_certain":(i+1),"creditID":creditID,"repay_time":"--","need_to_pay":"--","need_to_pay_rate":"--","now_rate_time":(i+1)+"/"+rows.length,"credit_type":credit_type}
                                                    console.log(repay_per_detail);
                                                    repaylist.push(repay_per_detail);
                                                    break;
                                                }
                                            }
                                        } 
                                    }
                                }
                                    
                                }
                                    }
                                );

                        }
                        credit_type = rows[i].credit_type;
                        creditID = rows[i].creditID;
                        rate_time = rows[i].rate_time;
                        console.log("creditID:"+creditID);
                        requirementid=rows[i].requirementID;
                        if(credit_type=="margin"||credit_type=="Margin"){
                            credit_type = "保證金";
                        }else if(credit_type=="Collateral"){
                            credit_type="擔保品";
                            //requirementid=rows[i].requirementID+"collateral";
                        }
                        var rate = Margin2Contract.credits.call(creditID)[6];
                        connection.query("SELECT * FROM credit WHERE requirementID = ? ORDER BY rate_time", [requirementid+'collateral'], function (err, rows) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                //group by and order by
                                console.log("rows"+rows);
                                var status;
                                var repay_time;
                                var months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
                                for(var j=0;j<rows.length;j++){
                                    //console.log(rows[j].rate_time);
                                    //check for now date;    
                                    if(rows[j].status!="false"){           
                                        console.log("yes"+rows[j]);
                                        if(nowtimestamp<new Date(rows[j].deadline).getTime()){
                                            //console.log('nearest_time'+new Date(rows[j].deadline));
                                            //rate = Margin2Contract.credits.call(creditID)[6];           
                                            if(new Date(rows[j].deadline).getDate()<10){
                                                    repay_time = "0"+new Date(rows[j].deadline).getDate()+" "+months[new Date(rows[j].deadline).getMonth()]+" "+new Date(rows[j].deadline).getFullYear();
                                            }else{
                                                    repay_time = new Date(rows[j].deadline).getDate()+" "+months[new Date(rows[j].deadline).getMonth()]+" "+new Date(rows[j].deadline).getFullYear();
                                            }   
                                            if((parseInt(rows[j].repay_amount)+parseInt(rows[j].repay_rate))==(parseInt(rows[j].need_to_pay)+parseInt(rows[j].need_to_pay_rate))){
                                                for(var i=j;i<rows.length;i++){
                                                    if((parseInt(rows[i].repay_amount)+parseInt(rows[i].repay_rate))==(parseInt(rows[i].need_to_pay)+parseInt(rows[i].need_to_pay_rate))){
                                                        if(i==(rows.length-1)){
                                                            //還款成功
                                                            console.log("rate!!!!"+i);
                                                            console.log("pay:"+rows[i].need_to_pay-rows[i].repay_amount);
                                                            console.log("success");
                                                            repay_per_detail={"requirementID":rows[i].requirementID,"status":"還款完成","rate_certain":(i+1),"creditID":creditID,"repay_time":"--","need_to_pay":(rows[i].need_to_pay)-rows[i].repay_amount,"need_to_pay_rate":(rows[i].need_to_pay_rate)-rows[i].repay_rate,"now_rate_time":(i+1)+"/"+rows.length,"credit_type":credit_type}
                                                            console.log(repay_per_detail);
                                                            repaylist.push(repay_per_detail);
                                                            break;
                                                        }
                                                    }else if((parseInt(rows[i].repay_amount)+parseInt(rows[i].repay_rate))!=(parseInt(rows[i].need_to_pay)+parseInt(rows[i].need_to_pay_rate))){
                                                        //前期可能有完整還款,但是future沒有
                                                        if(new Date(rows[i].deadline).getDate()<10){
                                                            repay_time = "0"+new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                        }else{
                                                            repay_time = new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                        } 
                                                        console.log("This time"+repay_time);
                                                        if(rows[i].status=="normal"){
                                                            status="待還款";
                                                        }
                                                        repay_per_detail={"requirementID":rows[i].requirementID,"status":status,"rate_certain":(i+1),"creditID":creditID,"repay_time":repay_time,"need_to_pay":(rows[i].need_to_pay)-rows[i].repay_amount,"need_to_pay_rate":(rows[i].need_to_pay_rate)-rows[i].repay_rate,"now_rate_time":(i+1)+"/"+rows.length,"credit_type":credit_type}
                                                        console.log(repay_per_detail);
                                                        repaylist.push(repay_per_detail);
                                                        break;
                                                    }
                                                }
                                            }else{
                                                //第一期沒付
                                                console.log("Now"+repay_time);
                                                if(rows[j].status=="ask"){
                                                    status="低於維持率請補款";
                                                }else if(rows[j].status=="normal"){
                                                    status="待還款";

                                                }
                                                console.log("need_to_pay"+rows[j].need_to_pay_rate);
                                                repay_per_detail={"requirementID":rows[j].requirementID,"status":status,"rate_certain":(j+1),"creditID":creditID,"repay_time":repay_time,"need_to_pay":(rows[j].need_to_pay)-rows[j].repay_amount,"need_to_pay_rate":(rows[i].need_to_pay_rate)-rows[i].repay_rate,"now_rate_time":(j+1)+"/"+rows.length,"credit_type":credit_type}
                                                console.log(repay_per_detail);
                                                repaylist.push(repay_per_detail);

                                            }
                                                
                                            break; 
                                        }                               
                                }else{
                                    //到期違約處理
                                    if((parseInt(rows[j].repay_amount)+parseInt(rows[j].repay_rate))==(parseInt(rows[j].need_to_pay)+parseInt(rows[j].need_to_pay_rate))){
                                        for(var i=j;i<rows.length;i++){
                                            if((parseInt(rows[i].repay_amount)+parseInt(rows[i].repay_rate))!=(parseInt(rows[i].need_to_pay)+parseInt(rows[i].need_to_pay_rate))){
                                                //前期可能有完整還款,但是future沒有
                                                if(new Date(rows[i].deadline).getDate()<10){
                                                    repay_time = "0"+new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                }else{
                                                    repay_time = new Date(rows[i].deadline).getDate()+" "+months[new Date(rows[i].deadline).getMonth()]+" "+new Date(rows[i].deadline).getFullYear();
                                                } 
                                                //console.log("This time"+repay_time);
                                                if(rows[i].status=="false"){
                                                    status="違約";
                                                }
                                                repay_per_detail={"requirementID":rows[i].requirementID,"status":"違約","rate_certain":(i+1),"creditID":creditID,"repay_time":"--","need_to_pay":"--","need_to_pay_rate":"--","now_rate_time":(i+1)+"/"+rows.length,"credit_type":credit_type}
                                                console.log(repay_per_detail);
                                                repaylist.push(repay_per_detail);
                                                break;
                                            }
                                        }
                                    } 
                                }
                            }
                                
                            }
                                }
                            );
                        
                    }
                    console.log(repaylist);
                    connection.query('SELECT * FROM user_information WHERE user_id = ?', [req.session.user_id], function (err, rows) {
                        if (err) {
                            res.render('error', {
                                message: err.message,
                                error: err
                            });
                        }
                        else {
                    console.log(rows[0].user_wallet_address);
                    var balance = TokenContract.balanceOf.call(rows[0].user_wallet_address);
                    //console.log(repaylist);
                    res.render('repay/normal_repay',{
                        user:req.session.user_id,
                        username:rows[0].user_firstname+' '+rows[0].user_lastname,
                        email:rows[0].user_email,
                        birthday:rows[0].user_birthday,
                        telphone:rows[0].user_tel_phone,
                        mobilephone:rows[0].user_mobile_phone,
                        address:rows[0].user_address,
                        wallet_address:rows[0].user_wallet_address,
                        data:repaylist,
                        balance:balance/1000000000000000000,
                    });
                }});
                }

            });

            connection.release();

        });
        
    }

});
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return new Date(time);
  }

  console.log(timeConverter(0));

function rateTorepayment(requirementID,rate_time_num,rate_certain_num,rate,priciple){
    var monthly_priciple = parseInt(parseInt(priciple)/parseInt(rate_time_num));
    console.log("REquirementID"+requirementID);
    console.log("priciple:"+priciple);
    console.log("rate_certain_num:"+rate_certain_num);
    //console.log("rate_time:"+rate_time_num);
    //console.log("monthly_principle:"+monthly_priciple);
    console.log("rate:"+rate);
    //console.log("rate_amount:"+(parseInt(priciple)*0.01*parseInt(rate)));
    //console.log("num1_priciple:"+(parseInt((parseInt(priciple)*0.01*parseInt(rate))+(monthly_priciple))));
    //need_to_get the repayment
    console.log("repayment:"+MatchingContract.repay_byratetime_info.call(requirementID,rate_certain_num));
    //console.log("result:"+(Math.ceil(parseInt(priciple)*0.01*parseInt(rate))+Math.ceil(monthly_priciple))-parseInt(MatchingContract.repay_byratetime_info.call(requirementID,rate_certain_num)));
    //current time(certain interval)
    if(parseInt(rate_certain_num)==1){
        //return minus already_paid
        if(MatchingContract.repay_byratetime_info.call(requirementID,rate_certain_num)==0){
            //formula: (初始本金（未還款,因為是第一期）*0.01)+固定需要攤還金額(若固定需要攤還金額不為整數,則第一個月先多付出1元)
            return [(Math.ceil(parseInt(priciple)*0.01*parseInt(rate))+Math.ceil(monthly_priciple)),"normal"];
        }else{
            //user had paid for platform before
            return [(Math.ceil(parseInt(priciple)*0.01*parseInt(rate))+Math.ceil(monthly_priciple))-parseInt(MatchingContract.repay_byratetime_info.call(requirementID,rate_certain_num)),"normal"];
        }

    }else if(rate_certain_num>1){
        //前一期為第一期
        var last_repayment=MatchingContract.repay_byratetime_info.call(requirementID,rate_certain_num-1);
        var now_repayment=MatchingContract.repay_byratetime_info.call(requirementID,rate_certain_num);
        if((rate_certain_num-1)==1){
            //console.log(last_repayment);
            //若過期限前期仍未付款,則先前未還金額的利息+1
            if(parseInt(last_repayment)<(Math.ceil(parseInt(priciple)*0.01*parseInt(rate))+Math.ceil(monthly_priciple))){
                console.log("not match!")
                return [(Math.ceil((parseInt(priciple)-parseInt(last_repayment))*0.08*parseInt(rate))+Math.ceil(monthly_priciple))-parseInt(last_repayment),"ask"];
            }else{
                console.log("match!");
                return [(Math.ceil((parseInt(priciple)-monthly_priciple)*0.01*parseInt(rate))+Math.floor(monthly_priciple))-parseInt(now_repayment),"normal"];
            }      
        //前一期不為第一期      
        }else if((rate_certain_num-1)>1){
            if(parseInt(last_repayment)<Math.ceil(parseInt(priciple)*0.01*parseInt(rate))+Math.floor(monthly_priciple)){
                return [(Math.ceil((parseInt(priciple)-parseInt(last_repayment))*0.08*parseInt(rate))+Math.floor(monthly_priciple))-parseInt(last_repayment),"ask"];
            }else{
                return [(Math.ceil((parseInt(priciple)-monthly_priciple*(rate_certain_num-1))*0.01*parseInt(rate))+Math.floor(monthly_priciple))-parseInt(now_repayment),"normal"];
                //未繳金額（提升利息）+連同下一期一起繳納
            }              
        }
    }else{
        return 0;
    }
    
}

router.post('/', function (req, res) {
    var want_to_pay_rate = req.body.pay_rate;
    var want_to_pay_principle = req.body.pay_principle;
    console.log(want_to_pay_rate+"rate");
    console.log(want_to_pay_principle+"principle");
    var set_amount = req.body.set_amount;
    var requirement_ID = req.body.requirement_id;
    var now_rate_num = req.body.now_rate_num.substr(0,req.body.now_rate_num.indexOf("/"));
    console.log('set_amouont:'+set_amount);
    console.log('requirementID'+requirement_ID);
    console.log('now_rate_num'+now_rate_num);
    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM user_information WHERE user_id = ?', [req.session.user_id], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                // private key->
                //83ac05c778568e70fcef4e57a73ccb4641c31d44f7e6a117a61c35231f4442d1
                if(want_to_pay_principle>0){
                var count = web3.eth.getTransactionCount(token_minter);
                var repay_amount = parseInt(set_amount)*Math.pow(10,18);
                // repay_for_requirement parameters: address owner,address spender,uint256 amount,bytes32 requirementID,uint paytimestamp,uint rate_time,address Matching
                var now=Date.now();
                var data = TokenContract.approve_and_transfer_for_requirement.getData(rows[0].user_wallet_address,token_minter,set_amount,requirement_ID,now,now_rate_num, rows[0].user_wallet_address,{from:token_minter});
                var gasPrice = web3.toWei(20, 'gwei');
                //console.log(gasPrice);
                var gasLimit = 8000000;
        
                var rawTransaction = {
                    "from": token_minter,
                    "nonce": web3.toHex(count),
                    "gasPrice": web3.toHex(gasPrice),
                    "gasLimit": web3.toHex(gasLimit),
                    "to": token2_contractAddress,
                    "value": "0x0",
                    "data": data,
                    "chainId": 0x04
                };
                var privKey = Buffer.from("83ac05c778568e70fcef4e57a73ccb4641c31d44f7e6a117a61c35231f4442d1",'hex');
                var tx = new Tx(rawTransaction, { chain: 'rinkeby' });
        
                tx.sign(privKey);
                var serializedTx = tx.serialize();
                var repayhash=web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
                waitForReceipt(repayhash,function(receipt){
                    if(receipt.length!=0){
                        console.log('repayHash',repayhash);
                        var formatnow = new Date(now);
                        //later will redirect to already_paid page
                        connection.query('INSERT INTO repayment_receipt (requirementID, pay_amount,pay_time,url,payer) VALUES (?,?,?,?,?)', [requirement_ID,set_amount,formatnow.getFullYear()+"-"+(parseInt(formatnow.getMonth())+1)+'-'+formatnow.getDate()+" "+formatnow.getHours()+":"+formatnow.getMinutes()+":"+formatnow.getSeconds(),"https://rinkeby.etherscan.io//tx/"+repayhash,req.session.user_id], function (err, rows) {
                            if (err) {
                                throw err;
                            }else{
                                console.log('insert ok!')
                            }
                        
                        });

                        connection.query('UPDATE credit SET repay_amount = ?+repay_amount WHERE requirementID = ? AND rate_time = ?', [set_amount,requirement_ID,now_rate_num], function (err, rows) {
                            if (err) {
                                throw err;
                            }else{
                                console.log('update ok!')
                            }
                        
                        });

                        res.render('repay/already_paid',{
                            user:req.session.user_id,
                            username:rows[0].user_firstname+' '+rows[0].user_lastname,
                            email:rows[0].user_email,
                            birthday:rows[0].user_birthday,
                            telphone:rows[0].user_tel_phone,
                            mobilephone:rows[0].user_mobile_phone,
                            address:rows[0].user_address,
                            wallet_address:rows[0].user_wallet_address,
                            contract_hash:"https://rinkeby.etherscan.io//tx/"+repayhash,
                            start_time:formatnow.toString(),
                            amount:set_amount,
                            status:"Success"
                        }); 
                    }
                    
                })  }else if(want_to_pay_rate>0){
                    var count = web3.eth.getTransactionCount(token_minter);
                    var repay_amount = parseInt(set_amount)*Math.pow(10,18);
                    // repay_for_requirement parameters: address owner,address spender,uint256 amount,bytes32 requirementID,uint paytimestamp,uint rate_time,address Matching
                    var now=Date.now();
                    var data = TokenContract.approve_and_transfer_for_requirement.getData(rows[0].user_wallet_address,token_minter,set_amount,requirement_ID,now,now_rate_num, rows[0].user_wallet_address,{from:token_minter});
                    var gasPrice = web3.toWei(20, 'gwei');
                    //console.log(gasPrice);
                    var gasLimit = 8000000;
            
                    var rawTransaction = {
                        "from": token_minter,
                        "nonce": web3.toHex(count),
                        "gasPrice": web3.toHex(gasPrice),
                        "gasLimit": web3.toHex(gasLimit),
                        "to": token2_contractAddress,
                        "value": "0x0",
                        "data": data,
                        "chainId": 0x04
                    };
                    var privKey = Buffer.from("83ac05c778568e70fcef4e57a73ccb4641c31d44f7e6a117a61c35231f4442d1",'hex');
                    var tx = new Tx(rawTransaction, { chain: 'rinkeby' });
            
                    tx.sign(privKey);
                    var serializedTx = tx.serialize();
                    var repayhash=web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
                    waitForReceipt(repayhash,function(receipt){
                        if(receipt.length!=0){
                            console.log('repayHash',repayhash);
                            var formatnow = new Date(now);
                            //later will redirect to already_paid page
                            connection.query('INSERT INTO repayment_receipt (requirementID, pay_amount,pay_time,url,payer) VALUES (?,?,?,?,?)', [requirement_ID,set_amount,formatnow.getFullYear()+"-"+(parseInt(formatnow.getMonth())+1)+'-'+formatnow.getDate()+" "+formatnow.getHours()+":"+formatnow.getMinutes()+":"+formatnow.getSeconds(),"https://rinkeby.etherscan.io//tx/"+repayhash,req.session.user_id], function (err, rows) {
                                if (err) {
                                    throw err;
                                }else{
                                    console.log('insert ok!')
                                }
                            
                            });
    
                            connection.query('UPDATE credit SET repay_rate = ?+repay_rate WHERE requirementID = ? AND rate_time = ?', [set_amount,requirement_ID,now_rate_num], function (err, rows) {
                                if (err) {
                                    throw err;
                                }else{
                                    console.log('update ok!')
                                }
                            
                            });
    
                            res.render('repay/already_paid',{
                                user:req.session.user_id,
                                username:rows[0].user_firstname+' '+rows[0].user_lastname,
                                email:rows[0].user_email,
                                birthday:rows[0].user_birthday,
                                telphone:rows[0].user_tel_phone,
                                mobilephone:rows[0].user_mobile_phone,
                                address:rows[0].user_address,
                                wallet_address:rows[0].user_wallet_address,
                                contract_hash:"https://rinkeby.etherscan.io//tx/"+repayhash,
                                start_time:formatnow.toString(),
                                amount:set_amount,
                                status:"Success"
                            }); 
                        }
                        
                    })
                }
                //tranche distribute funding
                
                
           }
        })
        });

});
function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
  
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    });
  }
module.exports = router;