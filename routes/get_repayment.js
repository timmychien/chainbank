var express = require('express');
var get_repayment = require('../model/get_repayment');
 
var router = express.Router();
 
// 獲取 /accounts 請求
router.route('/')
    // 取得所有資源
    .get(function (req, res) {
        get_repayment.getuser_repayment_with_id(req, function (err, results, fields) {
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
module.exports = router;