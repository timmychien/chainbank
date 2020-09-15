var express = require('express');
var router = express.Router();
var api =require('binance');
const binanceRest = new api.BinanceRest({
    key: 'IjIAeqe964EH50u9aaTrl2DPaJEZGsm123ESzZRobqrhTAv4Q369VBNL1ATcF2Pf', 
    secret: 'OxDzNU1cGQ8ayPz1NTMDfxQ5FnvRJv03w1IlyGmINfgoTD7HQiyL29KpTOYorHZC', 
    timeout: 15000, 
    recvWindow: 10000, 
    disableBeautification: false,
    /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
    handleDrift: false
    /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
     * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
     * binance's server time, calculating the difference with your own clock, and then reattempting
     * the request.
     */
  });
const io = require('socket.io')(3002, {
    path: '/',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })

/* GET home page. */
router.get('/:id', function(req, res) {


    res.header("Access-Control-Allow-Headers","*");
    var pool = req.connection;

    pool.getConnection(function (err, connection) {
        console.log(req.session.user_id);
        connection.query('SELECT * FROM stocks WHERE nickname = ?', [req.params.id], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                if(rows.length==0){
                    res.sendStatus(404);
                }else{    
                    const binanceWS = new api.BinanceWS(true);
                    const cryptoname=req.params.id;
                    const cryptofullname=cryptoname+"USDT"
                    const bws=binanceWS.onKline(cryptofullname, '1m', (data) => {
                    io.sockets.emit("KLINE"+cryptoname,{time:Math.round(data.kline.startTime/1000),open:parseFloat(data.kline.open),high:parseFloat(data.kline.high),low:parseFloat(data.kline.low),close:parseFloat(data.kline.high)})
                    });                    
                    console.log(rows);
                    console.log(req.session.user_id);
                    if(req.session.user_id){
                    res.render('searchpage/crypto',{crypto:req.params.id,user:req.session.user_id});
                    }else{
                        res.render('searchpage/crypto',{crypto:req.params.id});
                    }

                }

            }
        });

        connection.release();

    });
  
});

module.exports = router;