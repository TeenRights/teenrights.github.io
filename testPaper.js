
  var x = document.getElementById("testPaperStartPoint");
  //x.innerHTML = '<tr><td class="pdt bdr">질문</td>      <td class="text-center pdt"><input id="f1_1" type="radio" name="F_1" value="1"></td><td class="text-center pdt"><input id="f1_1" type="radio" name="F_1" value="0"></td></tr>';
  //x.innerHTML += '<tr>        <td colspan="3" class="pdt">답안 내용</td></tr>';


  var x = document.getElementById("testPaperStartPoint");
  for (var i=0; i<testAnswer.length; i++){
    x.innerHTML += '<tr><td class="pdt bdr" id="ques'+(i).toString()+'">'+(i+1).toString()+'. '+testQuestion[i]+'</td><td class="text-center pdt" id="inpO_'+i.toString()+'"><input type="radio" name="A'+i.toString()+'" value="1"></td><td class="text-center pdt" id="inpX_'+i.toString()+'"><input type="radio" name="A'+i.toString()+'" value="0"></td></tr><tr id="ans'+(i).toString()+'"></tr>';
  }

function SubmitTest(){
  var elem=document.getElementById('testTable');
  var element = elem.getElementsByTagName('input');

  msg = '';
  for (var i=0; i<element.length; i+=2){
    if (!element[i].checked && !element[i+1].checked) {
      inpAry = new Array();
      inpAry.push( document.getElementById('inpX_'+(i/2).toString()) );
      inpAry.push( document.getElementById('inpO_'+(i/2).toString()) );
      msg += ((i+2)/2).toString() + ', ';
      inpAry[0].style.backgroundColor="#FFEEEE";
      inpAry[1].style.backgroundColor="#FFEEEE";
    }
  }
  if (msg){
    alert("체크되지 않은 문항이 있습니다. \n:"+msg);
    location.href="#testTable";
  }
  else {
    var totalScore=0;
    var Solveds=0;
    for (var i=0; i<element.length; i+=2){
     inpAry = new Array();
      inpAry.push( document.getElementById('inpX_'+(i/2).toString()) );
      inpAry.push( document.getElementById('inpO_'+(i/2).toString()) );
      var chVar=element[i].checked | 0;
      if (chVar==testRadio[i/2]){
        inpAry[chVar].style.backgroundColor="#EEFFEE";
        inpAry[!chVar|0].style.background="none";
        Solveds++;
      }
      else{
        inpAry[chVar].style.backgroundColor="#FFEEEE";
        inpAry[!chVar|0].style.background="none";
      }
      var elementA = document.getElementById('ans'+(i/2).toString());
      elementA.innerHTML="<td colspan='3' class='pdt'>"+testAnswer[i/2]+"</td></tr>";
    }
    totalScore=Solveds/testAnswer.length*100;
    elem=document.getElementsByClassName("scoreBigText");
    elem[1].innerHTML=Math.ceil(totalScore);
    location.href="#scorePointer";
  }

}
