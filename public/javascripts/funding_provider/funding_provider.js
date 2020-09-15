function set_keep_rate(){

    fetch('/get_keep_rate/all')
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        var elements = document.getElementsByClassName("keep_rate");
        for (var i = 0; i < elements.length; i++) {
            var id = elements[i].getAttribute("id").replace("keep_rate_","");
            var list=[];
            for(var j =0; j<data.length;j++){
                if(data[j].requirement_id==id){
                    list.push(data[j]);
                }
            }          
            console.log("list"+list[0]);

            for(var j =0; j<list.length;j++){                                
                if(list[j].requirement_id==id){
                    var tagname = "keep_rate_"+id;
                    var tagname2 = "market_price_"+id;
                    var keep_rate =(parseInt(list[j].margin)+parseFloat(list[j].updated_price-(list[j].margin+list[j].funding_need)))/(list[j].margin+list[j].funding_need);
                    console.log(tagname+"tag");
                    document.getElementById(tagname).innerHTML=keep_rate.toFixed(4); 
                    document.getElementById(tagname2).innerHTML=list[j].updated_price.toFixed(4); 
                    if(keep_rate<0.28 && keep_rate > 0.2){
                        $('#'+tagname).attr("style","color:pink");
                    }else if(keep_rate<0.2){
                        $('#'+tagname).attr("style","color:red");
                    }
                }
            }            
            
        };
    })
    .catch(error => console.error(error))     

    }

    setInterval(()=>{set_keep_rate()},1000);



