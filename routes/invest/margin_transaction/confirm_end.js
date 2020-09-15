var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render('invest/margin_transaction/end_transaction_confirm', {
        title: 'Express',
        session: req.session.user_id
    });

});

module.exports = router;