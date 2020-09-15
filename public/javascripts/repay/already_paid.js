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
        var hashlink = document.getElementById("receipt_hash_link").innerHTML.replace("https://rinkeby.etherscan.io//tx/","");
        console.log(hashlink)
        waitForReceipt(hashlink,function(receipt){
            if(receipt.length!=0){
                document.getElementById("Receipt_status_text").innerHTML="Success";
            }
            
        })
        function waitForReceipt(hash, cb) {
            web3.eth.getTransactionReceipt(hash, function (err, receipt) {
              if (err) {
                error(err);
              }
          
              if (receipt !== null) {
                // Transaction went through
                if (cb) {
                  cb(receipt);
                }
              } else {
                // Try again in 1 second
                window.setTimeout(function () {
                  waitForReceipt(hash, cb);
                }, 1000);
              }
            });
          }