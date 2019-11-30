var x = document.getElementById("CallList");
for (var i=0; i<mainName.length;i++){
  //mainName, mainSite, mainCallId, mainTextId, mainKakaoId, mainDescription
  var str='<div class="pdt" id="'+i.toString()+'"></div>';
  str+= '<div class="container marginTB" id="testTable"> <div class="row borderBottom1px callBuild pdt" > <div class="textBigBuild"><a href="'+mainSite[i]+'" target="_blank" >'+mainName[i]+'</a></div></div> <div class="row borderBottom1px callBuild"> <div class="col-xs-4 pdt text-center"> ';
  if (mainCallId[i]=='-'){
    str+='<span class="call-text-md">-</span> <br> 전화 </div>';
  }
  else {
    str+='<a class="call-text-md" href="tel:'+mainCallId[i]+'" target="_blank">'+mainCallId[i]+'</a> <br> 전화 </div>';
  }

  if (mainTextId[i]=='-') {
    str+='<div class="col-xs-4 pdt text-center"> <span class="call-text-md">-</span> <br> 문자 </div> ';
  }
  else {
    str+='<div class="col-xs-4 pdt text-center"> <a class="call-text-md" href="sms:'+mainTextId[i]+'" target="_blank">'+mainTextId[i]+'</a> <br> 문자 </div> ';
  }

  if (mainKakaoId[i]=='-') {//none
    str+='<div class="col-xs-4 pdt text-center"> <span class="call-text-md">-</span><br> 카카오톡 </div> </div>';
  }
  else {
    str+='<div class="col-xs-4 pdt text-center"> <a class="call-text-md" href="'+mainKakaoId[i]+'" target="_blank">친구추가</a> <br> 카카오톡 </div> </div> ';
  }
  str+='<div class="borderBottom1px callBuild pdt"> '+mainDescription[i]+' </div> </div>';
  x.innerHTML+=str;
}
