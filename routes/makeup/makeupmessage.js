var express = require('express');
var router = express.Router();
/* GET makeup page. */
router.get('/', function(req, res, next) {
    var pool = req.connection;
    res.render('makeup/makeuppayment', { title: 'Express' });
  });
router.post('/',function(req,res){
    var message = 'out of time'
}) ;

module.exports = router;