var express = require('express')
var router = express.Router();

/*
router.post('/',function(req,res){
    //var interest = req.body['interest'];
    var periods=req.body['periods'];
    var pool=req.connection;
    //console.log('fyu')
    pool.getConnection(function(err,connection){
        connection.query('SELECT periods FROM contract_info WHERE periods=?',[periods],function(err,rows){
           // console.log(periods)
            if(err){
                res.render('err', {
                message: err.message,
                error: err
                });
                console.log(err)
            }
            if (rows.length >= 1) {
                req.session.periods=rows[0].periods;
                console.log(req.session.periods)
                res.redirect('/investinfo_1');
            }
            
        });
        connection.release();
    });
});
*/
router.get('/', function(req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/login');
    }else{
        var pool = req.connection;
        pool.getConnection(function(err,connection){
        connection.query('SELECT * FROM funding_requirement WHERE borrower_id=?',[req.session.user_id],function(err,rows){
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
                res.render('investinfo/investinfo_1', {
                    user: req.session.user_id,
                    data:data,
                });
            }
        })
        connection.release();
        })  
    }
    


});


router.post('/', function(req, res) {
    var pool = req.connection;
    var search=req.body['search'];
    var colterm=req.body['colterm'];
    var inputs=req.body['inputs'];
    console.log(search)
    console.log(colterm)
    console.log(inputs)
        pool.getConnection(function (err, connection) {
            if(search=="periods"){
                if(colterm=="gt"){
                    var sql='SELECT * FROM funding_requirement WHERE periods >'+inputs;
                } if(colterm=="ge"){
                    var sql='SELECT * FROM funding_requirement WHERE periods >='+inputs;
                } if(colterm=="eq"){
                    var sql='SELECT * FROM funding_requirement WHERE periods ='+inputs;
                } if(colterm=="le"){
                    var sql='SELECT * FROM funding_requirement WHERE periods <='+inputs;
                } if(colterm=="lt"){
                    var sql='SELECT * FROM funding_requirement WHERE periods <'+inputs;
                }
            }
            if(search=="contract_num"){
                if(colterm=="gt"){
                    var sql='SELECT * FROM contract_info WHERE contract_num >'+inputs;
                } if(colterm=="ge"){
                    var sql='SELECT * FROM contract_info WHERE contract_num >='+inputs;
                } if(colterm=="eq"){
                    var sql='SELECT * FROM contract_info WHERE contract_num ='+inputs;
                } if(colterm=="le"){
                    var sql='SELECT * FROM contract_info WHERE contract_num <='+inputs;
                } if(colterm=="lt"){
                    var sql='SELECT * FROM contract_info WHERE contract_num <'+inputs;
                }
            }
            if(search=="interest_percentage"){
                if(colterm=="gt"){
                    var sql='SELECT * FROM contract_info WHERE interest_percentage >'+inputs;
                } if(colterm=="ge"){
                    var sql='SELECT * FROM contract_info WHERE interest_percentage >='+inputs;
                } if(colterm=="eq"){
                    var sql='SELECT * FROM contract_info WHERE interest_percentage ='+inputs;
                } if(colterm=="le"){
                    var sql='SELECT * FROM contract_info WHERE interest_percentage <='+inputs;
                } if(colterm=="lt"){
                    var sql='SELECT * FROM contract_info WHERE interest_percentage <'+inputs;
                }
            }
            if(search=="repay"){
                if(colterm=="gt"){
                    var sql='SELECT * FROM contract_info WHERE repay >'+inputs;
                } if(colterm=="ge"){
                    var sql='SELECT * FROM contract_info WHERE repay >='+inputs;
                } if(colterm=="eq"){
                    var sql='SELECT * FROM contract_info WHERE repay ='+inputs;
                } if(colterm=="le"){
                    var sql='SELECT * FROM contract_info WHERE repay <='+inputs;
                } if(colterm=="lt"){
                    var sql='SELECT * FROM contract_info WHERE repay <'+inputs;
                }
            }
            if(search=="margin"){
                if(colterm=="gt"){
                    var sql='SELECT * FROM contract_info WHERE margin >'+inputs;
                } if(colterm=="ge"){
                    var sql='SELECT * FROM contract_info WHERE margin >='+inputs;
                } if(colterm=="eq"){
                    var sql='SELECT * FROM contract_info WHERE margin ='+inputs;
                } if(colterm=="le"){
                    var sql='SELECT * FROM contract_info WHERE margin <='+inputs;
                } if(colterm=="lt"){
                    var sql='SELECT * FROM contract_info WHERE margin <'+inputs;
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
                    res.render('investinfo/investinfo_1',{
                        data:data,
                    })
                }
            });
            connection.release();
        })
});
module.exports = router;
    