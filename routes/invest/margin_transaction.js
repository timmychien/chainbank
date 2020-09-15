var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
   if(!req.session.user_id){
      res.redirect('/login')
   }else{
   res.render('invest/margin_transaction',{
    user:req.session.user_id,
    address:req.session.user_wallet_address
   });
   } 
});
module.exports = router;