var express = require('express');
var getuser = require('../model/getuser');
 
var router = express.Router();
 
// 獲取 /accounts 請求
router.route('/buy')
    // 取得所有資源
    .get(function (req, res) {
        getuser.experts_buy(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
 
            // 沒有找到指定的資源
            if (!results.length) {
                res.sendStatus(404);
                return;
            }
 
            res.json(results);
        });
    })

router.route('/sell')
    // 取得所有資源
    .get(function (req, res) {
        getuser.experts_sell(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
 
            // 沒有找到指定的資源
            if (!results.length) {
                res.sendStatus(404);
                return;
            }
 
            res.json(results);
        });
    })
 
// 獲取如 /accounts/1 請求
//router.route('/:id')
    // 取得指定的一筆資源
//    .get(function (req, res) {
//        getuser.item(req, function (err, results, fields) {
//            if (err) {
//                res.sendStatus(500);
//                return console.error(err);
//            }
 
//            if (!results.length) {
//                res.sendStatus(404);
//                return;
//            }
 
//            res.json(results);
//        });
//    })
    // 更新指定的一筆資源 (部份更新)
 
module.exports = router;