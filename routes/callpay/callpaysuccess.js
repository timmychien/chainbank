'use strict';
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    res.render('callpay/callpaysuccess',{ title: 'Express' });
});

module.exports = router;