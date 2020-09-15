'use strict';

//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $password = $("#password");

//�K�X���or����
var eye = document.getElementById("eye");
function hideShowPsw() {
    if ($password.type == "password") {
        $password.type = "text";
        eye.className = "fa fa-eye-slash";
    } else {
        $password.type = "password";
        eye.className = "fa fa-eye";
    }
}


//Hide hints
$("form span#warn").hide();

function isPasswordValid() {
    return $password.val().length >= 8;
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

function enableSubmitEvent() {
    $("#submit").prop("disabled", !canSubmit());
}

//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();