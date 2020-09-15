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
       } else {
           console.log(result[0]);
           document.getElementById('wallet_connection').innerHTML='Connected wallet: '+result[0].slice(0,5)+'...'+result[0].slice(-5);
       } 
       })})
       setInterval(function(){web3.eth.getAccounts(function(error, result) {
        if (error) {
            console.log(error);
        } else {
            document.getElementById('wallet_connection').innerHTML='Connected wallet: '+result[0].slice(0,5)+'...'+result[0].slice(-5);
        }} )},100);
  const user=document.getElementById("user_name").textContent;
  console.log(user.replace("會員中心",""));    
  let text_sheet=document.getElementById("text_sheet");
  
  fetch('#'+user.replace("會員中心",""))
      .then(res=>res.json())
      .then(data=>{
      console.log(data);        
      for(var i=0;i<data.length;i++){
          let creditid=document.createElement("p");
          let outsidetag=document.createElement("div");
          let borrow_time=document.createElement("p");
          let deadline=document.createElement("p");
          let not_pay=document.createElement("p");
          let per_credit=document.createElement("a");
          let deadline_text = new Date(data[i].pay_time);
          let borrow_time_text = new Date(data[i].created_time);
          outsidetag.setAttribute("class","credit_link");
          outsidetag.setAttribute("id","credit_link_"+(i+1));
          per_credit.setAttribute("class","credit_items");
          per_credit.setAttribute("id","credit_"+(i+1));
          per_credit.setAttribute("href",'/repay/'+data[i].id);
          creditid.setAttribute("id","creditid_"+(i+1));
          borrow_time.setAttribute("id","credit_borrow_time_"+(i+1));
          deadline.setAttribute("id","credit_deadline_"+(i+1));
          not_pay.setAttribute("id","credit_not_pay_"+(i+1));
          per_credit.setAttribute("style","justify-content:space-between;display:flex;padding-left:35px;padding-right:45px;padding-bottom:20px;font-size:20px;font-weight:lighter;padding-top:20px;color:#444040;border-bottom:solid #f7f7f7 0.05px;");
          creditid.setAttribute("style","width:90px;");
          borrow_time.setAttribute("style","width:80px;");
          deadline.setAttribute("style","width:80px;");
          not_pay.setAttribute("style","width:80px;");
          per_credit.appendChild(creditid);        
          per_credit.appendChild(borrow_time);  
          per_credit.appendChild(deadline);  
          per_credit.appendChild(not_pay);
          outsidetag.appendChild(per_credit);
          text_sheet.appendChild(outsidetag);
          const pay_amount = data[i].value-data[i].repay_amount;
          let borrow_time_=borrow_time_text.getMonth()+1;
          let deadline_time_=deadline_text.getMonth()+1;
          console.log(borrow_time_text.getMonth()+1);
          document.getElementById("creditid_"+(i+1)).innerHTML=data[i].id.substr(0,10)+'...'+data[i].id.substr(-2,2);    
          document.getElementById("credit_not_pay_"+(i+1)).innerHTML=pay_amount;  
          document.getElementById("credit_borrow_time_"+(i+1)).innerHTML=borrow_time_text.getFullYear()+"/"+borrow_time_+'/'+borrow_time_text.getDate();
          document.getElementById("credit_deadline_"+(i+1)).innerHTML=deadline_text.getFullYear()+"/"+deadline_time_+'/'+deadline_text.getDate();      
        }
      });