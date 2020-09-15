var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('makeupsuccess', { title: 'Express' });
  });
module.exports = router;