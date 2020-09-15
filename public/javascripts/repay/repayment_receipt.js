fetch('/get_repayment')
    .then(res=>res.json())
    .then(data=>{
    console.log(data);
        var detailtag= document.getElementById("repayment_details");
        let requirementID=document.createElement("p");
        let pay_amount=document.createElement("p");
        let pay_time=document.createElement("p");
        let url=document.createElement("a");
        let per_repayment=document.createElement("div");
        per_repayment.setAttribute("class","repayment_items");
        pay_amount.setAttribute("id","repayment_text");
        requirementID.setAttribute("id","requirementid_text");
        pay_time.setAttribute("id","pay_time_text");
        url.setAttribute("id","url_text");
        per_repayment.setAttribute("style","padding-left:30px;margin-left:30px;margin-right:20px;justify-content:space-between;display:flex;padding-right:10px;padding-bottom:20px;font-size:20px;font-weight:lighter;padding-top:20px;color:grey;background-color:snow;border-bottom:solid #f7f7f7 0.05px;");
        requirementID.setAttribute("style","width:100px;font-size:17px;");
        pay_time.setAttribute("style","width:165px;font-size:17px;");
        pay_amount.setAttribute("style","width:80px;font-size:17px;");
        url.setAttribute("style","width:270px;font-size:17px;color:grey;");
        per_repayment.appendChild(requirementID);        
        per_repayment.appendChild(pay_time);  
        per_repayment.appendChild(pay_amount);  
        per_repayment.appendChild(url);
        detailtag.appendChild(per_repayment);

        document.getElementById("requirementid_text").innerHTML="媒合編號";
        document.getElementById("repayment_text").innerHTML="還款金額";
        document.getElementById("url_text").innerHTML="還款證明";
        document.getElementById("pay_time_text").innerHTML= "還款時間（台灣）"
    for(var i=0;i<data.length;i++){
        let requirementID=document.createElement("p");
        let pay_amount=document.createElement("p");
        let pay_time=document.createElement("p");
        let url=document.createElement("a");
        let per_repayment=document.createElement("div");
        per_repayment.setAttribute("class","repayment_items");
        pay_amount.setAttribute("id","repayment_"+(i+1));
        requirementID.setAttribute("id","requirementid_"+(i+1));
        pay_time.setAttribute("id","pay_time_"+(i+1));
        url.setAttribute("id","url_"+(i+1));
        per_repayment.setAttribute("style","margin-left:30px;margin-right:20px;padding-left:30px;justify-content:space-between;display:flex;padding-right:10px;padding-bottom:20px;font-size:20px;font-weight:lighter;padding-top:20px;color:#444040;background-color:snow;border-bottom:solid #f7f7f7 0.05px;");
        requirementID.setAttribute("style","width:100px;font-size:17px;");
        pay_time.setAttribute("style","width:165px;font-size:17px;");
        pay_amount.setAttribute("style","width:80px;font-size:17px;");
        url.setAttribute("style","width:270px;font-size:17px;");
        per_repayment.appendChild(requirementID);        
        per_repayment.appendChild(pay_time);  
        per_repayment.appendChild(pay_amount);  
        per_repayment.appendChild(url);
        detailtag.appendChild(per_repayment);

        document.getElementById("requirementid_"+(i+1)).innerHTML=data[i].requirementID.slice(0,5)+"..."+data[i].requirementID.slice(-5);
        document.getElementById("repayment_"+(i+1)).innerHTML=data[i].pay_amount+" 平台幣";
        document.getElementById("url_"+(i+1)).setAttribute('href',data[i].url);
        document.getElementById("url_"+(i+1)).innerHTML=data[i].url.slice(0,20)+"..."+data[i].url.slice(-10);
        var formatnow =new Date(data[i].pay_time);
        var month;
        var hour;
        if(parseInt(formatnow.getMonth())<9){
            month="0"+(parseInt(formatnow.getMonth())+1);
        }else{
            month=(parseInt(formatnow.getMonth())+1);
        }
        if(parseInt(formatnow.getHours())<10){
            hour="0"+(parseInt(formatnow.getHours()));
        }else{
            hour =formatnow.getHours();
        }
        if(parseInt(formatnow.getMinutes())<10){
            minutes ="0"+(parseInt(formatnow.getMinutes()));
        }else{
            minutes =formatnow.getMinutes();
        }
        if(parseInt(formatnow.getSeconds())<10){
            seconds ="0"+(parseInt(formatnow.getSeconds()));
        }else{
            seconds =formatnow.getSeconds();
        }

        document.getElementById("pay_time_"+(i+1)).innerHTML= formatnow.getFullYear()+"-"+month+'-'+formatnow.getDate()+" "+hour+":"+minutes+":"+seconds;

      }
    })
    .catch(error => console.error(error))     