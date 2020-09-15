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

       setInterval(function(){web3.eth.getAccounts(function(error, result) {
           if (error) {
               console.log(error);
           } else {
               document.getElementById('wallet_connection').innerHTML='Connected wallet: '+result[0].slice(0,5)+'...'+result[0].slice(-5);
           }} )},100);
const user=document.getElementById("user_name").textContent;
console.log(user.replace("會員中心",""));    
let text_sheet=document.getElementById("text_sheet");
console.log(window.location.pathname);
let name=window.location.pathname.replace('/repay/','');
name=name.replace('/confirm','');
console.log('name'+name);
fetch('/getusercredit/'+user.replace("會員中心","")+"/"+name)
   .then(res=>res.json())
   .then(data=>{
   console.log(data);        
   for(var i=0;i<data.length;i++){
       let creditid=document.createElement("p");
       let borrow_time=document.createElement("p");
       let deadline=document.createElement("p");
       let not_pay=document.createElement("p");
       let per_credit=document.createElement("a");
       let deadline_text = new Date(data[i].pay_time);
       let borrow_time_text = new Date(data[i].created_time);
       per_credit.setAttribute("class","credit_items");
       per_credit.setAttribute("id","credit_"+(i+1));
       creditid.setAttribute("id","creditid_"+(i+1));
       borrow_time.setAttribute("id","credit_borrow_time_"+(i+1));
       deadline.setAttribute("id","credit_deadline_"+(i+1));
       not_pay.setAttribute("id","credit_not_pay_"+(i+1));
       per_credit.setAttribute("style","justify-content:space-between;display:flex;padding-left:35px;padding-right:45px;padding-bottom:20px;font-size:20px;font-weight:lighter;padding-top:20px;color:#444040;background-color:snow;border-bottom:solid #f7f7f7 0.05px;");
       creditid.setAttribute("style","width:90px;font-size:17px;");
       borrow_time.setAttribute("style","width:80px;");
       deadline.setAttribute("style","width:80px;");
       not_pay.setAttribute("style","width:80px;");
       per_credit.appendChild(creditid);        
       per_credit.appendChild(borrow_time);  
       per_credit.appendChild(deadline);  
       per_credit.appendChild(not_pay);
       text_sheet.appendChild(per_credit);
       const pay_amount = data[i].value-data[i].repay_amount;
       //document.getElementById('need_tokens_num').innerHTML=;
       //先get text from #current_tokens_num再剪掉

       document.getElementById("creditid_"+(i+1)).innerHTML=data[i].id;
       document.getElementById("back_repay").setAttribute('href','/repay/'+data[i].id);        
       document.getElementById("credit_not_pay_"+(i+1)).innerHTML=pay_amount;    
       console.log(pay_amount);
       if(pay_amount<=parseFloat(document.getElementById("current_tokens_num").innerHTML.replace(" Tokens",""))){
       document.getElementById("need_tokens_num").innerHTML="0 Tokens";            
       }else if(pay_amount<=parseFloat(document.getElementById("current_tokens_num").innerHTML.replace(" Tokens",""))){
       document.getElementById("need_tokens_num").innerHTML=pay_amount+" Tokens";     
       }    

       if(pay_amount>parseFloat(document.getElementById("current_tokens_num").innerHTML.replace(" Tokens",""))){
           document.getElementById("confirm").disabled = true; 
           document.getElementById("confirm_repay").setAttribute('class','disabled');
           document.getElementById("confirm").innerHTML='無法贖回請補足金額'
       }else if(pay_amount<=parseFloat(document.getElementById("current_tokens_num").innerHTML.replace(" Tokens",""))){
           document.getElementById("confirm").disabled = false;
           console.log(document.getElementById("confirm").innerHTML); 
           document.getElementById("confirm_repay").setAttribute('class','enabled');   
           document.getElementById("confirm_submit").disabled = true;    
           document.getElementById("confirm_submit").value= "Tokens Filled";       
           //confirm_submit disabled.
       }
       console.log(document.getElementById("credit_not_pay_"+(i+1)).innerHTML);        
       document.getElementById("confirm").addEventListener("click", select_credit);
       document.getElementById("confirm_repay").setAttribute("href","/get_back/"+data[i].id);
     }
   })
   .catch(error => console.error(error))


function change_time(time){
 if(time<10){
 return '0'+time.toString();    
 }else{
   return time.toString();
 }

}   
//產生交易編號
window.onload = MerchantTradeNo();
function MerchantTradeNo() {
   var now = new Date();
   var yyyy = now.getFullYear() + '';
   var MM = now.getMonth() + 1;
   var dd = now.getDate();
   var HH = now.getHours();
   var mm = now.getMinutes();
   var ss = now.getSeconds();
   if (MM < 10) MM = '0' + MM;
   if (dd < 10) dd = '0' + dd;
   if (HH < 10) HH = '0' + HH;
   if (mm < 10) mm = '0' + mm;
   if (ss < 10) ss = '0' + ss;
   var str = '';
   str = 'DX' + yyyy + MM + dd + HH + mm + ss
   var len = 4; //後4位數亂碼
   var chars = 'abcdefghijklmnopqrstuvwxyz123456789';
   var maxPos = chars.length;
   var ran = '';
   for (var i = 0; i < len; i++) {
       ran += chars.charAt(Math.floor(Math.random() * maxPos));
   }
   document.getElementById('MerchantTradeNo').value = str + ran;
}

//產生檢查碼
window.onload = combine();
function combine() {
   var str1 = "ChoosePayment=" + document.getElementById('ChoosePayment').value;
   var str2 = "CreditInstallment=" + document.getElementById('CreditInstallment').value;
   var str3 = "EncryptType=" + document.getElementById('EncryptType').value;
   var str4 = "InstallmentAmount=" + document.getElementById('InstallmentAmount').value;
   var str5 = "ItemName=" + document.getElementById('ItemName').value;
   var str6 = "MerchantID=" + document.getElementById('MerchantID').value;
   var str7 = "MerchantTradeDate=" + document.getElementById('MerchantTradeDate').value;
   var str8 = "MerchantTradeNo=" + document.getElementById('MerchantTradeNo').value;
   var str9 = "OrderResultURL=" + document.getElementById('OrderResultURL').value;
   var str10 = "PaymentType=" + document.getElementById('PaymentType').value;
   var str11 = "Redeem=" + document.getElementById('Redeem').value;
   var str12 = "ReturnURL=" + document.getElementById('ReturnURL').value;
   var str13 = "StoreID=" + document.getElementById('StoreID').value;
   var str14 = "TotalAmount=" + document.getElementById('TotalAmount').value;
   var str15 = "TradeDesc=" + document.getElementById('TradeDesc').value;

   var combine = "HashKey=5294y06JbISpM5x9&" + str1 + "&" + str2 + "&" + str3 + "&" + str4 + "&" + str5 + "&" + str6 + "&" + str7 + "&" + str8 + "&" + str9 + "&" + str10 + "&" + str11 + "&" + str12 + "&" + str13 + "&" + str14 + "&" + str15 + "&HashIV=v77hoKGq4kWxNNIS";
   combine = combine.replace(/\%/g, "25%");
   combine = combine.replace(/\+/g, "%2b");
   combine = combine.replace(/\~/g, "%7e");
   combine = combine.replace(/ /g, "+");
   combine = combine.replace(/\@/g, "40%");
   combine = combine.replace(/\#/g, "23%");
   combine = combine.replace(/\$/g, "24%");
   combine = combine.replace(/\^/g, "%5e");
   combine = combine.replace(/\&/g, "%26");
   combine = combine.replace(/\=/g, "%3d");
   combine = combine.replace(/\;/g, "%3b");
   combine = combine.replace(/\?/g, "%3f");
   combine = combine.replace(/\//g, "%2f");
   combine = combine.replace(/\\/g, "%5c");
   combine = combine.replace(/\>/g, "%3e");
   combine = combine.replace(/\</g, "%3c");
   combine = combine.replace(/\`/g, "60%");
   combine = combine.replace(/\[/g, "%5b");
   combine = combine.replace(/\]/g, "%5d");
   combine = combine.replace(/\{/g, "%7b");
   combine = combine.replace(/\}/g, "%7d");
   combine = combine.replace(/\:/g, "%3a");
   combine = combine.replace(/\'/g, "27%");
   combine = combine.replace(/\"/g, "22%");
   combine = combine.replace(/\,/g, "%2c");
   combine = combine.replace(/\|/g, "%7c");
   combine = combine.toLowerCase();
   combine = SHA256(combine);
   combine = combine.toUpperCase();
   document.getElementById('CheckMacValue').value = combine;
   document.getElementById("hash").innerHTML = combine;
}


//SHA-256 之後若要正式啟用 須改從Server端計算SHA,因為有Hashkey
function SHA256(s) {
   var chrsz = 8;
   var hexcase = 0;
   function safe_add(x, y) {
       var lsw = (x & 0xFFFF) + (y & 0xFFFF);
       var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
       return (msw << 16) | (lsw & 0xFFFF);
   }
   function S(X, n) { return (X >>> n) | (X << (32 - n)); }
   function R(X, n) { return (X >>> n); }
   function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
   function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
   function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
   function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
   function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
   function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
   function core_sha256(m, l) {
       var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
       var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
       var W = new Array(64);
       var a, b, c, d, e, f, g, h, i, j;
       var T1, T2;
       m[l >> 5] |= 0x80 << (24 - l % 32);
       m[((l + 64 >> 9) << 4) + 15] = l;
       for (var i = 0; i < m.length; i += 16) {
           a = HASH[0];
           b = HASH[1];
           c = HASH[2];
           d = HASH[3];
           e = HASH[4];
           f = HASH[5];
           g = HASH[6];
           h = HASH[7];
           for (var j = 0; j < 64; j++) {
               if (j < 16) W[j] = m[j + i];
               else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
               T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
               T2 = safe_add(Sigma0256(a), Maj(a, b, c));
               h = g;
               g = f;
               f = e;
               e = safe_add(d, T1);
               d = c;
               c = b;
               b = a;
               a = safe_add(T1, T2);
           }
           HASH[0] = safe_add(a, HASH[0]);
           HASH[1] = safe_add(b, HASH[1]);
           HASH[2] = safe_add(c, HASH[2]);
           HASH[3] = safe_add(d, HASH[3]);
           HASH[4] = safe_add(e, HASH[4]);
           HASH[5] = safe_add(f, HASH[5]);
           HASH[6] = safe_add(g, HASH[6]);
           HASH[7] = safe_add(h, HASH[7]);
       }
       return HASH;
   }
   function str2binb(str) {
       var bin = Array();
       var mask = (1 << chrsz) - 1;
       for (var i = 0; i < str.length * chrsz; i += chrsz) {
           bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
       }
       return bin;
   }
   function Utf8Encode(string) {
       string = string.replace(/\r\n/g, "\n");
       var utftext = "";
       for (var n = 0; n < string.length; n++) {
           var c = string.charCodeAt(n);
           if (c < 128) {
               utftext += String.fromCharCode(c);
           }
           else if ((c > 127) && (c < 2048)) {
               utftext += String.fromCharCode((c >> 6) | 192);
               utftext += String.fromCharCode((c & 63) | 128);
           }
           else {
               utftext += String.fromCharCode((c >> 12) | 224);
               utftext += String.fromCharCode(((c >> 6) & 63) | 128);
               utftext += String.fromCharCode((c & 63) | 128);
           }
       }
       return utftext;
   }
   function binb2hex(binarray) {
       var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
       var str = "";
       for (var i = 0; i < binarray.length * 4; i++) {
           str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
               hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
       }
       return str;
   }
   s = Utf8Encode(s);
   return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}