var express = require('express');
var router = express.Router();
var cors = require('cors');
var api =require('binance');
const symbols = ["BTCUSDT","ETHUSDT","BNBUSDT","NEOUSDT","LTCUSDT","QTUMUSDT","ADAUSDT","XRPUSDT","EOSUSDT","TRXUSDT","ETCUSDT","ICXUSDT","NULSUSDT","BTTUSDT","HOTUSDT","ZRXUSDT","BATUSDT","DASHUSDT"];
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

function get24hr(symbolslist){
  var count=0;
  for(var i=0;i<symbolslist.length;i++){
    binanceRest.ticker24hr(symbolslist[i].symbol,(error,data)=>{
      if(error){
        console.log(error);
      }else{
        var symboldetails="{"+"symbol:"+data.symbol+",lastPrice:"+data.lastPrice+"}";
        count=count+(parseFloat(data.lastPrice)*symbolslist[i].amount);
        
      }
    })      
  }
}
/* GET users listing. */
router.get('/',cors(), function(req, res, next) {
  if(req.session.user_id){
  res.render('searchpage/searchpage',{title:"invest list",user:req.session.user_id});    
  }else{
    res.render('searchpage/searchpage',{title:"invest list"});     
  }
  console.log(req.session.user_id);
});


module.exports = router;