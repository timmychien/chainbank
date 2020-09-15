const log = console.log;
//fetchprice();
//fetch24hr();
const symbols = ["BTCUSDT","ETHUSDT","BNBUSDT","BCCUSDT","NEOUSDT","LTCUSDT","QTUMUSDT","ADAUSDT","XRPUSDT","EOSUSDT","TUSDUSDT","IOTAUSDT","XLMUSDT","ONTUSDT","TRXUSDT","ETCUSDT","ICXUSDT","VENUSDT","NULSUSDT","VETUSDT","PAXUSDT","BCHABCUSDT","BCHSVUSDT","USDCUSDT","LINKUSDT","WAVESUSDT","BTTUSDT","USDSUSDT","ONGUSDT","HOTUSDT","ZILUSDT","ZRXUSDT","FETUSDT","BATUSDT","XMRUSDT","ZECUSDT","IOSTUSDT","CELRUSDT","DASHUSDT","NANOUSDT","OMGUSDT","THETAUSDT","ENJUSDT","MITHUSDT","MATICUSDT","ATOMUSDT","TFUELUSDT","ONEUSDT","FTMUSDT","ALGOUSDT","USDSBUSDT","GTOUSDT","ERDUSDT","DOGEUSDT","DUSKUSDT","ANKRUSDT","WINUSDT","COSUSDT","NPXSUSDT","COCOSUSDT","MTLUSDT","TOMOUSDT","PERLUSDT","DENTUSDT","MFTUSDT","KEYUSDT","STORMUSDT","DOCKUSDT","WANUSDT","FUNUSDT","CVCUSDT","CHZUSDT","BANDUSDT","BUSDUSDT","BEAMUSDT","XTZUSDT","RENUSDT","RVNUSDT","HCUSDT","HBARUSDT","NKNUSDT","STXUSDT","KAVAUSDT","ARPAUSDT","IOTXUSDT","RLCUSDT","MCOUSDT","CTXCUSDT","BCHUSDT","TROYUSDT","VITEUSDT","FTTUSDT","BUSDTRY","USDTTRY","USDTRUB","EURUSDT","OGNUSDT","DREPUSDT","BULLUSDT","BEARUSDT","ETHBULLUSDT","ETHBEARUSDT","TCTUSDT","WRXUSDT","BTSUSDT","LSKUSDT","BNTUSDT","LTOUSDT","EOSBULLUSDT","EOSBEARUSDT","XRPBULLUSDT","XRPBEARUSDT","STRATUSDT","AIONUSDT","MBLUSDT","COTIUSDT","BNBBULLUSDT","BNBBEARUSDT","STPTUSDT","USDTZAR"];

const chartProperties = {
	width: 800,
    height: 400,
	layout: {
		fontFamily: 'Comic Sans MS',
    },
    	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
    timeScale:{
        timeVisible:true,
        secondVisible:true,
    }
}
/*
window.addEventListener('load', () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      window.ethereum.enable();
      var accounts = web3.eth.getAccounts(function(error, result) {
         if (error) {
             console.log(error);
         } else {
             console.log(result[0]);
             document.getElementById('wallet_connection').innerHTML='Connected wallet: '+result[0].slice(0,5)+'...'+result[0].slice(-5);
         
             }       
     });
 
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  else if (window.web3) {
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    var accounts = web3.eth.getAccounts(function(error, result) {
     if (error) {
         console.log(error);
     } else {

         console.log(result[0]);
         document.getElementById('wallet_connection').innerHTML='Connected wallet: '+result[0].slice(0,5)+'...'+result[0].slice(-5);
  
     }       
 });

    return web3;
//https://www.jsdelivr.com/package/gh/ethereum/web3.js@0.2.1/dist/ethereum.min.js
 }
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
});
window.ethereum.on('accountsChanged', function (accounts) {
 // Time to reload your interface with accounts[0]!
     var accounts = web3.eth.getAccounts(function(error, result) {
     if (error) {
         console.log(error);
     } else if (result) {
         console.log(result[0]);
         document.getElementById('wallet_connection').innerHTML='Connected wallet: '+result[0].slice(0,5)+'...'+result[0].slice(-5);
     } 
     })})
     setInterval(function(){web3.eth.getAccounts(function(error, result) {
      if (error) {
          console.log(error);
      } else if(result){
          document.getElementById('wallet_connection').innerHTML='Connected wallet: '+result[0].slice(0,5)+'...'+result[0].slice(-5);
      }} )},100);

*/
const doelement = document.getElementById("tvchart");
const chart = LightweightCharts.createChart(doelement,chartProperties);
const candleSeries = chart.addCandlestickSeries();
$("#month").click(function(){
    getkline('d');
    $("#month").attr("style","background-color:rgb(129, 199, 170)");
    $("#hour").attr("style","background-color:rgb(223, 222, 222)");
    $("#day").attr("style","background-color:rgb(223, 222, 222)");
    $("#year").attr("style","background-color:rgb(223, 222, 222)");
  });
  $("#hour").click(function(){
    getkline('m');
    $("#month").attr("style","background-color:rgb(223, 222, 222)");
    $("#hour").attr("style","background-color:rgb(129, 199, 170)");
    $("#day").attr("style","background-color:rgb(223, 222, 222)");
    $("#year").attr("style","background-color:rgb(223, 222, 222)");
  });
  $("#day").click(function(){
    getkline('h');
    $("#month").attr("style","background-color:rgb(223, 222, 222)");
    $("#hour").attr("style","background-color:rgb(223, 222, 222)");
    $("#day").attr("style","background-color:rgb(129, 199, 170)");
    $("#year").attr("style","background-color:rgb(223, 222, 222)");
  });
  $("#year").click(function(){
    getkline('M');
    $("#month").attr("style","background-color:rgb(223, 222, 222)");
    $("#hour").attr("style","background-color:rgb(223, 222, 222)");
    $("#day").attr("style","background-color:rgb(223, 222, 222)");
    $("#year").attr("style","background-color:rgb(129, 199, 170)");
  });
function getkline(unit){
    const cryptoname = document.getElementById("crypto_name_text").innerHTML;
    const cryptofullname = cryptoname+"USDT";
    fetch('https://api.binance.com/api/v3/klines?symbol='+cryptofullname+'&interval=1'+unit+'&limit=1000')
    .then(res=>res.json())
    .then(data =>{
        const cdata = data.map(d=>{
            return{time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
        });
        candleSeries.setData(cdata);
    })
    .catch(err => console.log(err))
}
getkline('m');
var options = {
  serveClient: false,
  // below are engine.IO options
  origins: '*:*',
  transports: ['websocket'],  
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
      }
  
  const socket = io('http://localhost:3002',options);

  socket.on('KLINE'+document.getElementById("crypto_name_text").innerHTML,(pl)=>{  
    candleSeries.update(pl);  
    /*
    document.getElementById("last_close_price").innerHTML=pl.close.toFixed(2);
    candleSeries.update(pl);
    //console.log("t");
    //document.getElementById("result_rate").innerHTML=(parseFloat(pl.close)*0.2).toFixed(4);
    if(parseFloat($("#last_close_price").html())>pl.close.toFixed(2)){
      document.getElementById("last_close_price").innerHTML=pl.close.toFixed(2);
      //console.log("yes");
      $("#last_close_price").attr("style","color:rgb(233, 84, 84);"); 
    }else if($("#last_close_price").html()<pl.close.toFixed(2)){
      document.getElementById("last_close_price").innerHTML=pl.close.toFixed(2);
      $("#last_close_price").attr("style","color:green;");
    }else if($("#last_close_price").html()=="loading"){     
      //console.log("u loading");
      document.getElementById("last_close_price").innerHTML=pl.close.toFixed(2);
      $("#last_close_price").attr("style","color:rgb(68, 68, 68);");   
    }else if($("#last_close_price").html()==pl.close.toFixed(2)){     
      document.getElementById("last_close_price").innerHTML=pl.close.toFixed(2);
      $("#last_close_price").attr("style","color:rgb(68, 68, 68);");          
    }*/
  })  
  fetchprice();
  fetch24hr();
  fetchtrades();
  fetchavgPrice();

//setInterval(( () => fetchprice() ), 4000);
//setInterval(( () => fetch24hr() ), 4500);
//setInterval(( () => fetchtrades() ), 4000);
setInterval(( () => fetchtwdcrypto()), 4000);
setInterval(( () => fetchavgPrice()), 4000);

function fetch24hr(){
const cryptoname = document.getElementById("crypto_name_text").innerHTML;
const cryptofullname = cryptoname+"USDT";
  fetch('https://api.binance.com/api/v3/ticker/24hr?symbol='+cryptofullname)
    .then(res=>res.json())
    .then(data =>{
      //console.log(data);
      //console.log($("#_24hr_change").html());
      console.log(data.priceChange);
      document.getElementById("volume").innerHTML=parseFloat(data.volume).toFixed(2);
      document.getElementById("quote_volume").innerHTML=parseFloat(data.quoteVolume).toFixed(2);
      document.getElementById("open_price").innerHTML=parseFloat(data.openPrice).toFixed(2);
      if(data.priceChange<0){
        document.getElementById("_24hr_change").innerHTML=parseFloat(data.priceChange);
        $("#_24hr_change").attr("style","color:rgb(233, 84, 84);");
      }else if(data.priceChange>0){
        document.getElementById("_24hr_change").innerHTML=parseFloat(data.priceChange);
        $("#_24hr_change").attr("style","color:green;");        
      }
        document.getElementById("_24hr_high_price").innerHTML=parseFloat(data.highPrice).toFixed(2); 
        document.getElementById("_24hr_low_price").innerHTML=parseFloat(data.lowPrice).toFixed(2); 
      })
      .catch(error=>console.log(error))
}
function fetchtrades(){
    const cryptoname = document.getElementById("crypto_name_text").innerHTML;
    const cryptofullname = cryptoname+"USDT";
  fetch('https://api.binance.com/api/v3/trades?symbol='+cryptofullname+'&limit=12')
  .then(res=>res.json())
  .then(data =>{
    for(var i=0;i<data.length;i++){
      //console.log(data[i]);     
      //console.log("有喔"); 
      document.getElementById("price-"+(i+1)).innerHTML=parseFloat(data[i].price).toFixed(2);
      document.getElementById("qty-"+(i+1)).innerHTML=parseFloat(data[i].qty).toFixed(2);
      document.getElementById("quoteQty-"+(i+1)).innerHTML=parseFloat(data[i].quoteQty).toFixed(2);
      $("#price-"+(i+1)).attr("style","width:60px;font-size: 15px;font-family: 'Lucida Sans';color:rgb(85, 85, 85);");
      $("#qty-"+(i+1)).attr("style","width:60px;font-size: 15px;font-family: 'Lucida Sans';color:rgb(85, 85, 85);");
      $("#quoteQty-"+(i+1)).attr("style","width:80px;font-size: 15px;font-family: 'Lucida Sans';color:rgb(85, 85, 85);");
    }
  })
  .catch(err=>console.log(err))
}
let count=0;
function fetchprice(){
    const cryptoname = document.getElementById("crypto_name_text").innerHTML;
    const cryptofullname = cryptoname+"USDT";
  fetch('https://api.binance.com/api/v3/ticker/price?symbol='+cryptofullname)
  .then(res=>res.json())
  .then(data =>{
      count=count+1;
      //console.log(data);
      //console.log($("#current_price").html());        
      //console.log(parseFloat($("#current_price").html())>parseFloat(data.price));
      if(count==1){
        $("#buy_price").val((parseFloat(data.price)).toFixed(4));
      }
      if(parseFloat($("#current_price").html())>parseFloat(data.price)){
        document.getElementById("current_price").innerHTML=parseFloat(data.price);
        //console.log("yes");
        $("#current_price").attr("style","color:rgb(233, 84, 84);"); 
      }else if($("#current_price").html()<parseFloat(data.price)){
        document.getElementById("current_price").innerHTML=parseFloat(data.price);
        $("#current_price").attr("style","color:green;");
      }else if($("#current_price").html()=="loading"){     
        document.getElementById("current_price").innerHTML=parseFloat(data.price);
        $("#current_price").attr("style","color:rgb(68, 68, 68);");   
      }else if($("#current_price").html()==parseFloat(data.price)){     
        document.getElementById("current_price").innerHTML=parseFloat(data.price);
        $("#current_price").attr("style","color:rgb(68, 68, 68);");          
      }
    if(document.getElementById("current_price").innerHTML!="loading"){
      fetchtwdcrypto();
    }
      
    })
  .catch(err => console.log(err))
}
function fetchtwdcrypto(){
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=twd')
    .then(res=>res.json())
    .then(data =>{
        console.log(data.tether.twd);
      if($("#few_buy_price").val()!=0){
        $("#change_twd").val(parseInt((parseFloat($("#few_buy_price").val())*parseFloat(data.tether.twd)*parseFloat($("#current_price").html())).toFixed(2)));
        $("#buy_crypto").attr("href","/margin_transaction/deposit_margin/"+name+"/"+$("#change_twd").val().replace(".","_")+"/"+$("#few_buy_price").val().replace(".","_"));
    }
      //document.getElementById("current_rate").innerHTML=parseFloat(data.price);
    })
    .catch(err => console.log(err))
}
console.log(symbols);
const name = document.getElementById("crypto_name_text").innerHTML;
console.log(name);
console.log($("#change_twd").val());
function fetchavgPrice(){
    const cryptoname = document.getElementById("crypto_name_text").innerHTML;
    const cryptofullname = cryptoname+"USDT";
    fetch('https://api.binance.com/api/v3/avgPrice?symbol='+cryptofullname)
    .then(res=>res.json())
    .then(data =>{
    console.log('avg'+data.price+",mins:"+data.mins);
    document.getElementById("avgPrice").innerHTML=parseFloat(data.price).toFixed(2);
    })
    .catch(err=>console.log(err))
    }