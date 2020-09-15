//get_repay_status
fetch('/get_repay_status')
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        var elements = document.getElementsByClassName("status");
        for (var i = 0; i < elements.length; i++) {
            var id = elements[i].getAttribute("id").replace("status_","");
            var list=[];
            for(var j =0; j<data.length;j++){
                if(data[j].requirementID==id){
                    list.push(data[j]);
                }
            }          
            var nowtimestamp = Date.now();       
            var status;
            var repay_time;
            var months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
            console.log(list);
            var tag ="status_"+id;
            for(var j =0; j<list.length;j++){                                
                    if(list[j].status!="false"){           
                        console.log("yes"+list[j]);
                        if(nowtimestamp<new Date(list[j].deadline).getTime()){        
                            if(new Date(list[j].deadline).getDate()<10){
                                    repay_time = "0"+new Date(list[j].deadline).getDate()+" "+months[new Date(list[j].deadline).getMonth()]+" "+new Date(list[j].deadline).getFullYear();
                            }else{
                                    repay_time = new Date(list[j].deadline).getDate()+" "+months[new Date(list[j].deadline).getMonth()]+" "+new Date(list[j].deadline).getFullYear();
                            }   
                            if((parseInt(list[j].repay_amount)+parseInt(list[j].repay_rate))==(parseInt(list[j].need_to_pay)+parseInt(list[j].need_to_pay_rate))){
                                for(var i=j;i<list.length;i++){
                                    if((parseInt(list[i].repay_amount)+parseInt(list[i].repay_rate))==(parseInt(list[i].need_to_pay)+parseInt(list[i].need_to_pay_rate))){
                                        if(i==(list.length-1)){
                                            
                                            console.log(tag)+"have";
                                            document.getElementById(tag).innerHTML="還款完成";
                                            break;
                                        }
                                    }else if((parseInt(list[i].repay_amount)+parseInt(list[i].repay_rate))!=(parseInt(list[i].need_to_pay)+parseInt(list[i].need_to_pay_rate))){
                                        //前期可能有完整還款,但是future沒有
                                        if(new Date(list[i].deadline).getDate()<10){
                                            repay_time = "0"+new Date(list[i].deadline).getDate()+" "+months[new Date(list[i].deadline).getMonth()]+" "+new Date(list[i].deadline).getFullYear();
                                        }else{
                                            repay_time = new Date(list[i].deadline).getDate()+" "+months[new Date(list[i].deadline).getMonth()]+" "+new Date(list[i].deadline).getFullYear();
                                        } 
                                        console.log("This time"+repay_time);
                                        if(list[i].status=="normal"){
                                            status="待還款";
                                        }
                                    
                                        document.getElementById(tag).innerHTML=status;
                                        break;
                                    }
                                }
                            }else{
                                //第一期沒付
                                console.log("Now"+repay_time);
                                if(list[j].status=="ask"){
                                    status="低於維持率請補款";
                                }else if(list[j].status=="normal"){
                                    status="待還款";

                                }
                                document.getElementById(tag).innerHTML=status;
                            }
                                
                            break; 
                        }                               
                }else{
                    //到期違約處理
                    if((parseInt(list[j].repay_amount)+parseInt(list[j].repay_rate))==(parseInt(list[j].need_to_pay)+parseInt(list[j].need_to_pay_rate))){
                        for(var i=j;i<list.length;i++){
                            if((parseInt(list[i].repay_amount)+parseInt(list[i].repay_rate))!=(parseInt(list[i].need_to_pay)+parseInt(list[i].need_to_pay_rate))){
                                //前期可能有完整還款,但是future沒有
                                if(new Date(list[i].deadline).getDate()<10){
                                    repay_time = "0"+new Date(list[i].deadline).getDate()+" "+months[new Date(list[i].deadline).getMonth()]+" "+new Date(list[i].deadline).getFullYear();
                                }else{
                                    repay_time = new Date(list[i].deadline).getDate()+" "+months[new Date(list[i].deadline).getMonth()]+" "+new Date(list[i].deadline).getFullYear();
                                } 
                                //console.log("This time"+repay_time);
                                if(list[i].status=="false"){
                                    status="違約";
                                }
                                document.getElementById(tag).innerHTML=status;
                                break;
                            }
                        }
                    } 
                }
            
            }            
            
        };
    })
    .catch(error => console.error(error))   
    
    function set_keep_rate(){

    fetch('/get_keep_rate')
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
            console.log("list"+list[0].requirement_id);

            for(var j =0; j<list.length;j++){                                
                if(list[j].requirement_id==id){
                    var tagname = "keep_rate_"+id;
                    var tagname2 = "market_price_"+id;
                    var keep_rate =(parseInt(list[j].margin)+parseFloat(list[j].updated_price-(list[j].margin+list[j].funding_need)))/(list[j].margin+list[j].funding_need);
                    console.log(tagname+"tag");
                    document.getElementById(tagname).innerHTML=keep_rate.toFixed(4); 
                    document.getElementById(tagname2).innerHTML=list[j].updated_price.toFixed(4); 
                    if(keep_rate<0.28){
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