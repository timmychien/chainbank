var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  session=req.session;
  res.header("Access-Control-Allow-Headers","*");
  if(req.session.user_id){
    res.render('index', { title: 'chainbank',user:req.session.user_id });
  }else{
    res.render('index', { title: 'chainbank' });    
  }
  
});

module.exports = router;
