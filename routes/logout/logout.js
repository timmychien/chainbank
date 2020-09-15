var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('logout/logout');
    req.session.destroy();
});

module.exports = router;
