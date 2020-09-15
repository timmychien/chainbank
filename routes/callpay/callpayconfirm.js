'use strict';
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    res.render('callpay/callpayconfirm', {
        session: req.session.user_id,
        total_exchange: req.body.cash_to_tokens
    });
});

module.exports = router;