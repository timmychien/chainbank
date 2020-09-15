function isLastDayOfMonth(){
    var outoftime = new Boolean(false);
    var date = new Date();
    var year = date.getFullYear(); //current year
    var month = date.getMonth()+1;  
    var today = date.getDate();    //current date

    var new_year = year;
    var new_month = month++;
    if(month>12){
        new_month -=12;
        new_year++;
    }
    var new_date = new Date(new_year,new_month,1);
    var month_last_day = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
    if(today == month_last_day){
        flag = true;
    }
    return outoftime;
}