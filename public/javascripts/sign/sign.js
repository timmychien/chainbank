'use strict';



//Problem: Hints are shown even when form is valid

//Solution: Hide and show them at appropriate times

var $password = $("#password");

var $confirmPassword = $("#confirm_password");
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
                $('#wallet_address').val(result[0]);
           
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
           $('#wallet_address').val(result[0]);
    
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
        
    }} )},100);
  window.ethereum.on('accountsChanged', function (accounts) {
   // Time to reload your interface with accounts[0]!
       var accounts = web3.eth.getAccounts(function(error, result) {
       if (error) {
           console.log(error);
       } else {
           console.log(result[0]);
           $('#wallet_address').val(result[0]);
           
       } 
       })})


//Hide hints

$("form span").hide();



function isPasswordValid() {

    return $password.val().length >= 8;

}



function arePasswordsMatching() {

    return $password.val() === $confirmPassword.val();

}



function canSubmit() {

    return isPasswordValid() && arePasswordsMatching();

}



function passwordEvent() {

    //Find out if password is valid  

    if (isPasswordValid()) {

        //Hide hint if valid

        $password.next().hide();

    } else {

        //else show hint

        $password.next().show();

    }

}



function confirmPasswordEvent() {

    //Find out if password and confirmation match

    if (arePasswordsMatching()) {

        //Hide hint if match

        $confirmPassword.next().hide();

    } else {

        //else show hint 

        $confirmPassword.next().show();

    }

}



function enableSubmitEvent() {

    $("#submit").prop("disabled", !canSubmit());

}



//When event happens on password input

$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);



//When event happens on confirmation input

$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);



enableSubmitEvent();