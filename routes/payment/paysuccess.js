var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('payment/paysuccess', { title: 'Express' });
  });
module.exports = router;