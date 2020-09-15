
function setting(select)
{
    var text = select.options[select.selectedIndex].value;        
    if(select.options[select.selectedIndex].id.includes("rate_")==true){

        var setting_rate = select.options[select.selectedIndex].id.replace("rate_","already_pay_rate_");
        var setting_principle = select.options[select.selectedIndex].id.replace("rate_","already_pay_principle_");
        var tag = select.options[select.selectedIndex].id.replace("rate_","need_to_pay_");
        var inputtag = select.options[select.selectedIndex].id.replace("rate_","set_amount_");
        document.getElementById(tag).innerHTML=text;
        var input = document.getElementsByClassName(inputtag)[0];
        document.getElementById(setting_rate).setAttribute("value",text);
        document.getElementById(setting_principle).setAttribute("value","0");
        input.setAttribute("value",text);
        input.setAttribute("max",text);

    }else if(select.options[select.selectedIndex].id.includes("principle_")==true){

        var setting_rate = select.options[select.selectedIndex].id.replace("principle_","already_pay_rate_");
        var setting_principle = select.options[select.selectedIndex].id.replace("principle_","already_pay_principle_");
        var tag = select.options[select.selectedIndex].id.replace("principle_","need_to_pay_");
        var inputtag = select.options[select.selectedIndex].id.replace("principle_","set_amount_");
        document.getElementById(tag).innerHTML=text;    
        var input = document.getElementsByClassName(inputtag)[0];
        document.getElementById(setting_rate).setAttribute("value","0");
        document.getElementById(setting_principle).setAttribute("value",text);
        input.setAttribute("value",text);
        input.setAttribute("max",text);

    }
}
function setinput(input){
    console.log(input.val());
    console.log(input.attr('class'));
    var id =input.attr('class').replace("set_amount_","");
    var want_to_pay_rate = $("#already_pay_rate_"+id).val();
    var want_to_pay_principle = $("#already_pay_principle_"+id).val();
    if(want_to_pay_rate>0){
        document.getElementById("already_pay_rate_"+id).setAttribute("value",input.val());
    }else if(want_to_pay_principle>0){
        document.getElementById("already_pay_principle_"+id).setAttribute("value",input.val());
    }else if(want_to_pay_rate==0||want_to_pay_principle==0){
        document.getElementById("already_pay_principle_"+id).setAttribute("value",input.val());
    }


}