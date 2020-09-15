const symbols = ["BTCUSDT","ETHUSDT","BNBUSDT","BCCUSDT","NEOUSDT","LTCUSDT","QTUMUSDT","ADAUSDT","XRPUSDT","EOSUSDT","TUSDUSDT","IOTAUSDT","XLMUSDT","ONTUSDT","TRXUSDT","ETCUSDT","ICXUSDT","VENUSDT","NULSUSDT","VETUSDT","PAXUSDT","BCHABCUSDT","BCHSVUSDT","USDCUSDT","LINKUSDT","WAVESUSDT","BTTUSDT","USDSUSDT","ONGUSDT","HOTUSDT","ZILUSDT","ZRXUSDT","FETUSDT","BATUSDT","XMRUSDT","ZECUSDT","IOSTUSDT","CELRUSDT","DASHUSDT","NANOUSDT","OMGUSDT","THETAUSDT","ENJUSDT","MITHUSDT","MATICUSDT","ATOMUSDT","TFUELUSDT","ONEUSDT","FTMUSDT","ALGOUSDT"];


function postinvest(number1,number2){    
let details=document.getElementById("invest_details");
while (details.firstChild) {
  details.removeChild(details.lastChild);
}

for(let i=number1;i<number2;i++){
    let index=symbols[i].indexOf("USDT");
    let icon=document.createElement("img");
    let invests=document.createElement("a");
    let name=document.createElement("p");
    let price=document.createElement("p");
    let change=document.createElement("p");
    let low=document.createElement("p");
    let high=document.createElement("p");
    let nametag=document.createElement("div");
    name.setAttribute("id","invest_"+(i+1)+"_name");
    nametag.setAttribute("style","width:60px;display:flex;");
    icon.setAttribute("id","icon_"+(i+1)+"_img");
    icon.setAttribute("style","height:20px;width:20px;margin-right:5px;");
    price.setAttribute("id","invest_"+(i+1)+"_price");
    price.setAttribute("style","width:80px;font-size:18px;");
    change.setAttribute("id","invest_"+(i+1)+"_change");
    change.setAttribute("style","width:80px;font-size:18px;");
    low.setAttribute("id","invest_"+(i+1)+"_low");
    low.setAttribute("style","width:80px;font-size:18px;");
    high.setAttribute("id","invest_"+(i+1)+"_high");
    high.setAttribute("style","width:80px;font-size:18px;");
    invests.appendChild(nametag);
    nametag.appendChild(icon);
    nametag.appendChild(name);
    invests.appendChild(price);
    invests.appendChild(change);
    invests.appendChild(low);
    invests.appendChild(high);
    invests.setAttribute("id","invest_"+(i+1));
    invests.setAttribute("href","/crypto/"+symbols[i].substring(0,index));
    invests.setAttribute("class","invest_items");
    invests.setAttribute("style"," position: relative;display: flex;padding:20px;justify-content: space-between;top: 10px;border-radius: 10px 10px 0 0 ;border-bottom: 0.5px #e6e5e5 solid;");
    details.appendChild(invests);
    document.getElementById("invest_"+(i+1)+"_name").innerHTML=symbols[i].substring(0,index);
    $("#icon_"+(i+1)+"_img").attr('src','/images/'+symbols[i].substring(0,index)+".png");
    //$("#invest_"+(i+1)+":hover").attr("style","background-color:grey;");
  }
}
function postportfolio(portlist,valuelist,percentlist,currentpricelist){
  let details=document.getElementById("invest_details");
  for(let i=0;i<portlist.length;i++){
    let invests=document.createElement("div");
    let name=document.createElement("div");
    let user_name=document.createElement("p");
    let image=document.createElement("img");
    let price=document.createElement("p");
    let change=document.createElement("p");
    let low=document.createElement("p");
    let high=document.createElement("p");
    name.setAttribute("id","portfolio_"+(i+1)+"_name");
    name.setAttribute("style","padding-left:0px;display:flex;font-size:18px;");
    user_name.setAttribute("id","portfolio_"+(i+1)+"_user_name");
    user_name.setAttribute("style","padding-left:8px;padding-top:2px;width:auto;font-size:18px;");
    image.setAttribute("id","portfolio_"+(i+1)+"_image");
    image.setAttribute("style","width:30px;height:30px;margin-left:0px;");
    price.setAttribute("id","portfolio_"+(i+1)+"_price");
    price.setAttribute("style","width:60px;font-size:18px;");
    change.setAttribute("id","portfolio_"+(i+1)+"_change");
    change.setAttribute("style","");
    high.setAttribute("id","portfolio_"+(i+1)+"_tag");
    low.setAttribute("id","portfolio_"+(i+1)+"_percent");
    low.setAttribute("style","width:70px;font-size:18px;");
    high.setAttribute("style","width:70px;font-size:18px;");
    name.appendChild(image);
    name.appendChild(user_name);
    invests.appendChild(name);
    invests.appendChild(price);
    invests.appendChild(change);
    invests.appendChild(low);
    invests.appendChild(high);
    invests.setAttribute("id","invest_"+(i+1));
    invests.setAttribute("id","invest_"+(i+1));
    invests.setAttribute("class","invest_items");
    invests.setAttribute("style","font-size:18px;position: relative;display: flex;padding-top:30px;padding-bottom:20px;padding-right:50px;padding-left:20px;border-radius: 10px 10px 0 0 ;border-bottom: 0.5px #e6e5e5 solid;justify-content:space-between;");
    details.appendChild(invests);
    //console.log(portlist[i].name);
    document.getElementById("portfolio_"+(i+1)+"_user_name").innerHTML=portlist[i];
    $("#portfolio_"+(i+1)+"_image").attr("src","/images/members/" + portlist[i] + ".jpg");
    document.getElementById("portfolio_"+(i+1)+"_change").innerHTML=valuelist[i];
    document.getElementById("portfolio_"+(i+1)+"_percent").innerHTML=percentlist[i]+"%";
    document.getElementById("portfolio_"+(i+1)+"_price").innerHTML=currentpricelist[i].toFixed(2);
    document.getElementById("portfolio_"+(i+1)+"_tag").innerHTML="虛擬貨幣";
    if(valuelist[i]<0){
      $("#portfolio_"+(i+1)+"_change").attr("style","color:green;");  
      $("#portfolio_"+(i+1)+"_percent").attr("style","font-size:18px;background-color:green;color:white;height:18px;border-radius:5px;padding-left:5px;padding-right:5px;");      
    }else if(valuelist[i]>0){
      $("#portfolio_"+(i+1)+"_change").attr("style","color:red;");        
      $("#portfolio_"+(i+1)+"_percent").attr("style","font-size:18px;background-color:red;color:white;height:18px;border-radius:5px;padding-left:5px;padding-right:5px;");  
    }
    
    //$("#invest_"+(i+1)+":hover").attr("style","background-color:grey;");
  }
  $( ".invest_items" )
  .hover(function() {
    $( this )
      .toggleClass( "active" )
      .next()
});
}

function fetchinterval(number1,number2){
  postinvest(number1,50);  
  for(let i=number1;i<number2;i++){
      //if(i>9){
      //  var index=i%10;
      //  fetchcomponent(symbols[i],(index+1));
      //  fetchprice(symbols[i],(index+1)); 
      //}else{
        fetchcomponent(symbols[i],(i+1));
        fetchprice(symbols[i],(i+1));            
      //}
    }
}

function fetchcomponent(symbol,number){
  fetch('https://api.binance.com/api/v3/ticker/24hr?symbol='+symbol)
  .then(res=>res.json())
  .then(data=>{
    if(data.priceChange<0){
      document.getElementById("invest_"+number+"_change").innerHTML=parseFloat(data.priceChange);
      $("#invest_"+number+"_change").attr("style","color:rgb(233, 84, 84);width:80px;font-size:18px;");
    }else if(data.priceChange>0){
      document.getElementById("invest_"+number+"_change").innerHTML="+"+parseFloat(data.priceChange);
      $("#invest_"+number+"_change").attr("style","color:green;width:80px;font-size:18px;");        
    }else if(data.priceChange==0){
      document.getElementById("invest_"+number+"_change").innerHTML=parseFloat(data.priceChange).toFixed(2);
    }
      document.getElementById("invest_"+number+"_high").innerHTML=parseFloat(data.highPrice).toFixed(2); 
      document.getElementById("invest_"+number+"_low").innerHTML=parseFloat(data.lowPrice).toFixed(2); 
  });
}

function fetchprice(symbol,number){
  fetch('https://api.binance.com/api/v3/ticker/price?symbol='+symbol)
  .then(res=>res.json())
  .then(data=>{
    console.log(symbol)
//        if(parseFloat($("#invest_"+number+"_change").html())>parseFloat(data.price).toFixed(2)){
          $("#invest_"+number+"_price").attr("style","color:rgb(68, 68, 68);width:90px;font-size:18px;"); 
          document.getElementById("invest_"+number+"_price").innerHTML=parseFloat(data.price);
          //console.log("yes");
//        }else if($("#invest_"+number+"_price").html()<parseFloat(data.price).toFixed(2)){
//          console.log('large');
//          $("#invest_"+number+"_price").attr("style","color:green;width:90px;");
//          document.getElementById("invest_"+number+"_price").innerHTML=parseFloat(data.price);
//        }else if($("#invest_"+number+"_price").html()==""){     
//          document.getElementById("invest_"+number+"_price").innerHTML=parseFloat(data.price);
//          $("#invest_"+number+"_price").attr("style","color:rgb(68, 68, 68);width:90px;");   
//        }else if($("#invest_"+number+"_price").html()==parseFloat(data.price).toFixed(2)){     
//          document.getElementById("invest_"+number+"_price").innerHTML=parseFloat(data.price);
//          $("#invest_"+number+"_price").attr("style","color:rgb(68, 68, 68);width:90px;");          
//        }
//        })
})}
var count=0;

function constructor(){
  count=count+1;
  if(count==1){
    fetchinterval(0,50);  
  }
}
constructor();
//setTimeout(3000,fetchinterval(0,50));
$(".searchButton").click(function(){    

  var list=[];    
  let details=document.getElementById("invest_details");
  for(let i=0;i<symbols.length;i++){
      socket.removeAllListeners(symbols[i]);
  }
  while (details.firstChild) {
    details.removeChild(details.lastChild);
  }
  var str = $(".searchTerm").val();
  var txt=$("select :selected").text();
  if(txt=="虛擬貨幣"){

    document.getElementById("name_text").innerHTML="投資商品";
    document.getElementById("price_text").innerHTML="價格";
    document.getElementById("change_text").innerHTML="24hr差價";
    document.getElementById("low_text").innerHTML="24hr最低價";
    document.getElementById("high_text").innerHTML="24hr最高價";
    for(var i=0;i<symbols.length;i++){
    var sym=symbols[i].replace("USDT","");
    if(sym.toUpperCase().includes(str.toUpperCase())==true){
      list.push(symbols[i]);
    }
  }    
  
  postinvest(0,list.length);  
  for(var i=0;i<list.length;i++){
    fetchcomponent(list[i],(i+1));
    fetchprice(list[i],(i+1));      
    document.getElementById("invest_"+(i+1)+"_name").innerHTML=list[i].replace("USDT","");
    $("#icon_"+(i+1)+"_img").attr("src","/images/"+list[i].replace("USDT","")+".png");
    $("#invest_"+(i+1)).attr("href","/crypto/"+list[i].replace("USDT",""));
  }  
  $( ".invest_items" )
      .hover(function() {
          $( this )
          .toggleClass( "active" )
    });
  }else{
    document.getElementById("name_text").innerHTML="投資專家";
    document.getElementById("price_text").innerHTML="市值TWD";
    document.getElementById("change_text").innerHTML="盈虧TWD";
    document.getElementById("low_text").innerHTML="盈虧(%)";
    document.getElementById("high_text").innerHTML="投資類型";
    //修改投資專家 使用mysql裡面的資料進行group by
    fetch("/getuser/buy")
    .then(response=>response.json())
    .then(data=>{
          console.log(data);   
          var namelist=[];
          var temp;
          for(var i=0;i<data.length-1;i++){
            temp=data[i].buyer_id;
            if(i==0){
              namelist.push(data[i].buyer_id);
              console.log(data[i].buyer_id);
            }
            if(data[i+1].buyer_id!=temp){
              namelist.push(data[i+1].buyer_id);
              temp=data[i+1].buyer_id;
            }
          }
          console.log(namelist);
          var name;
          var resultlist=[];
          var percentlist=[];
          var currentpricelist=[];
          
          for(var j=0;j<namelist.length;j++){
            var icon;
            var result=0;
            name=namelist[j];
            var percent=0; 
            var iconlist=[];
            var currentprice=0;
            for(var i=0;i<data.length;i++){
              if(data[i].buyer_id==name){
                if(data[i].buy_or_sell=='buy'){
                  result=result-parseFloat(data[i].value);
                  percent=percent+parseFloat(data[i].value);
                  currentprice=currentprice+parseFloat(data[i].current_price);
                  //console.log(data[i].value);
                }else if(data[i].buy_or_sell=='sell'){
                  result=result+parseFloat(data[i].value);
                  currentprice=currentprice-parseFloat(data[i].current_price);
                }
                console.log(data[i].value);

              }
            }
            console.log(name);
            //console.log(result);
            console.log(iconlist);
            resultlist.push(result);
            percentlist.push(((result/percent)*100).toFixed(2));
            currentpricelist.push(currentprice);
            console.log(currentpricelist);
          }
      //console.log(firstone);
            //所剩投資組合的市值
            //盈虧result/buy的為其%
            //盈虧value等於
            //投資類型再用crypto or fund類型
            postportfolio(namelist,resultlist,percentlist,currentpricelist);
  //還款  
          }
    )
  }
let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
});
//const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
function getaxios(symbol){
  const url = 'https://api.binance.com/api/v3/ticker/24hr?symbol='+symbol; // origin api url
/** fetch api url by cors-anywhere */
  return axios({
    method: "GET",
    url: `https://cors-anywhere.herokuapp.com/${url}`,
    headers: {'x-requested-with': 'XMLHttpRequest'},
  })
//    .then((response) => {
//    const msg = response.data;
    //document.body.innerHTML = JSON.stringify(msg)
//    return JSON.parse(JSON.stringify(msg)).lastPrice;
    //console.log(JSON.parse(JSON.stringify(msg)).lastPrice);
//  },
//    (error) => {
//    }
//  );
}
//axios.all([getaxios("BTCUSDT"),getaxios("ETHUSDT")])
//    .then(axios.spread(function(allTask, allCity){
//        console.log('所有请求完成')
//        console.log('请求1结果',allTask.data.lastPrice)
//        console.log('请求2结果',allCity.data.lastPrice)

//    }))

//fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', {mode: 'cors'})
//.then(response=>console.log(response.json))
//  alert(txt);
  //alert(list);
})
$( ".invest_items" )
  .hover(function() {
      $( this )
        .toggleClass( "active" )
        .next()
    });




