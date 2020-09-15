var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const testnet = 'https://ropsten.infura.io/v3/7a262c3183f04a258e05c4bb0d989af0';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
//var contractAddress = '0x72682d0d54c7ED7cdDdAa66E6DD7171f2B9c626C';
//var contractABI =[{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"}],"name":"proxy_ActiveStrategy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"transferPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"recover","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getNonce","outputs":[{"name":"nonce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"}],"name":"proxy_inActiveStrategy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"approvePreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Initial_Supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"},{"name":"addrCopyTrader","type":"address"},{"name":"id","type":"uint256"},{"name":"endAmount","type":"uint256"}],"name":"proxy_endCommit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"decreaseApprovalPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"increaseApprovalPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_to","type":"address"},{"name":"_controlId","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"CopyMatch","type":"address"},{"name":"addrCopyTrader","type":"address"},{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"otherData","type":"string"},{"name":"endAmount","type":"uint256"}],"name":"controlPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"},{"name":"addrCopyTrader","type":"address"},{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"otherData","type":"string"}],"name":"proxy_createCommit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_token","type":"address"},{"name":"_functionSig","type":"bytes4"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"recoverPreSignedHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"ControlPreSigned_Transfer_Fee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"delegate","type":"address"},{"indexed":false,"name":"_controlId","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"ControlPreSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"TransferPreSigned_Transfer_Fee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"delegate","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"TransferPreSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"delegate","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"ApprovalPreSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"existingOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"transferOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
//var contract = web3.eth.contract(contractABI).at(contractAddress);
//var token_contractAddress = "0x856e9b3508193568eBa67C3Ef0B425f87f10BeEF";
//var token_contractABI=require('./token_contractABI');
//var token_contractABI = token_contractABI.token_contractABI;
//var contract = web3.eth.contract(token_contractABI).at(token_contractAddress);

router.get('/', function (req, res) {
    var pool = req.connection;
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
                    // use myaccount.pug
                    res.render('repay/already_paid',{user:req.session.user_id});
                }

            })

            connection.release();

        });
        
    }

});
module.exports = router;
                    
                    /*
                    for(var i=0;i<length;i++){
                        if(MatchingContract.required.call(i)[4]==true){
                           
                           console.log('requirement:'+MatchingContract.required.call(i));  
                           //console.log("creditID:"+MatchingContract.required.call(i)[3]);
                           var requirementID = MatchingContract.required.call(i)[0];
                           var creditID = MatchingContract.required.call(i)[3];
                           var start_time_text = MatchingContract.repay_info_array.call(requirementID)[2];
                           var priciple =MatchingContract.required.call(i)[2];
                           //calculate the nearest days
                           console.log("start_time:"+timeConverter(start_time_text));   
                           var nowtimestamp = Date.now();             
                           var start_time =  timeConverter(start_time_text); 
                           var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                           var rate;                                      
                           //var Difference_In_Time = nowtimestamp - timeConverter(MatchingContract.repay_info_array.call(requirementID)[2]).getTime(); 
                           //var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                           var index_rate_time =MatchingContract.repay_info_array.call(requirementID)[3];
                           var rate_time;
                           var need_to_pay;
                           var repay_time;
                           for(var j=0;j< index_rate_time;j++){
                            start_time.setMonth(start_time.getMonth()+(j+1));                            
                            if(nowtimestamp<start_time.getTime()){
                                console.log('nearest_time'+start_time);
                                rate = Margin2Contract.credits.call(creditID)[6];
                                repay_time;
                                if(start_time.getDay()<10){
                                    repay_time = "0"+start_time.getDate()+" "+months[start_time.getMonth()]+" "+start_time.getFullYear();
                                }else{
                                    repay_time = start_time.getDate()+" "+months[start_time.getMonth()]+" "+start_time.getFullYear();
                                }
                                rate_time = (j+1)+"/"+index_rate_time;
                                need_to_pay = rateTorepayment(requirementID,index_rate_time,(j+1),rate,priciple);
                                if(need_to_pay!=0){
                                    repay_per_detail={"requirementID":requirementID,"creditID":creditID,"repay_time":repay_time,"need_to_pay":need_to_pay,"now_rate_time":rate_time}
                                    console.log(repay_per_detail);
                                    repaylist.push(repay_per_detail);
                                }
                                if(parseInt(need_to_pay)==0){
                                    //if it is not the last one.
                                    if((j+1)!=index_rate_time){
                                        for(var z=j+2;z<index_rate_time+1;z++){
                                            console.log(z);
                                            
                                            if(rateTorepayment(requirementID,index_rate_time,(z),rate,MatchingContract.required.call(i)[2])!=0){
                                                if(z>index_rate_time){
                                                rate_time = index_rate_time+"/"+index_rate_time;
                                                need_to_pay = rateTorepayment(requirementID,index_rate_time,index_rate_time,rate,priciple);
                                                start_time.setMonth(timeConverter(start_time_text).getMonth());
                                                start_time.setMonth(timeConverter(start_time_text).getMonth()+index_rate_time);
                                                if(start_time.getDay()<10){
                                                    repay_time = "0"+start_time.getDate()+" "+months[start_time.getMonth()]+" "+start_time.getFullYear();
                                                }else{
                                                    repay_time = start_time.getDate()+" "+months[start_time.getMonth()]+" "+start_time.getFullYear();
                                                }  
                                                repay_per_detail={"requirementID":requirementID,"creditID":creditID,"repay_time":repay_time,"need_to_pay":need_to_pay,"now_rate_time":rate_time}
                                                console.log(repay_per_detail);
                                                repaylist.push(repay_per_detail);
                                                }else{
                                                    rate_time = z+"/"+index_rate_time;
                                                    need_to_pay = rateTorepayment(requirementID,index_rate_time,z,rate,priciple);
                                                    start_time.setMonth(timeConverter(start_time_text).getMonth());
                                                    start_time.setMonth(timeConverter(start_time_text).getMonth()+z);
                                                    if(start_time.getDay()<10){
                                                        repay_time = "0"+start_time.getDate()+" "+months[start_time.getMonth()]+" "+start_time.getFullYear();
                                                    }else{
                                                        repay_time = start_time.getDate()+" "+months[start_time.getMonth()]+" "+start_time.getFullYear();
                                                    }  
                                                    repay_per_detail={"requirementID":requirementID,"creditID":creditID,"repay_time":repay_time,"need_to_pay":need_to_pay,"now_rate_time":rate_time}
                                                    console.log(repay_per_detail);
                                                    repaylist.push(repay_per_detail);
                                                }

                                             break;
                                            }
                                        }
                                    }
        
                                }  
                                //the nearest repay time
                                break;
                            }  
                        }

                        
                        }
                    }*/