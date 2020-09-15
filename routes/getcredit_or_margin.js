var express = require('express');
var getcredit_or_margin = require('../model/getcredit_or_margin');
 
var router = express.Router();
 
// 獲取 /accounts 請求
router.route('/:id')
    // 取得所有資源
    .get(function (req, res) {
        getcredit_or_margin.getuser_credit(req, function (err, results, fields) {
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
router.route('/:id/:credit')
    // 取得所有資源
    .get(function (req, res) {
        getcredit_or_margin.getuser_credit_with_id(req, function (err, results, fields) {
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