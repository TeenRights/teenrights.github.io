Build = new Array();
BuildNear = new Array();
startNo=-10;
endNo=0;
kakao_bounds=new kakao.maps.LatLngBounds(); //지도 재설정 범위정보를 가지고 있는 객체
ptrBEBP=document.getElementById('buildExpandButtonPoint');
PushPoint = document.getElementById("buildList");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    console.log("Not support GPS");
  }
}

getLocation();

function kakaoObj(a){
  this.content='<div>'+a.name+'<br>'+a.subname+'</div>';
  this.latlng= new kakao.maps.LatLng(a.lat, a.lng);
}

function sort_B(a,b){
  return a.dist < b.dist ? -1 : a.dist > b. dist ? 1 : 0;
}

function initBuild() {
  for (var i=0; i<localName.length; i++){
    Build.push(new Building(localName[i], localSubname[i], localCallId[i], localAddress[i], localLat[i], localLng[i]));
    Build[i].dist=computeDistance( i);
  }
  Build.sort(sort_B);
}

function expandBuilding() {
  if (endNo != Build.length){
    startNo+=10;
    endNo+=10;
    if (endNo>Build.length)
    endNo=Build.length;
  }
  for (var i=startNo; i<endNo; i++){

    BuildNear.push(new kakaoObj(Build[i]));
    kakao_bounds.extend(BuildNear[i].latlng);
    var imageSrc = 'markerMe.png',
    imageSize = new kakao.maps.Size(39, 39),
    imageOption = {offset: new kakao.maps.Point(19, 19)};
    switch(Build[i].name){
      case '자립지원관': imageSrc='markerHouse4.png'; break;
      case '자립생활관': imageSrc='markerHouseP.png'; break;
      case '쉼터(일시)': imageSrc='markerHouse1.png'; break;
      case '쉼터(단기)': imageSrc='markerHouse2.png'; break;
      case '쉼터(중장기)': imageSrc='markerHouse3.png'; break;
      case '꿈드림': imageSrc='markerKdream.png'; break;
      case '상담복지센터': imageSrc='markerConsulting.png'; break;
      case '다문화가족지원센터': imageSrc='markerMulticultural.png'; break;
      case '드림스타트': imageSrc='markerDreamstart.png'; break;
      case '법률구조공단': imageSrc='markerLaw.png'; break;
      case '여성폭력1366': imageSrc='marker1366.png'; break;
    }
    PushPoint.innerHTML+=' <div class="container containerBuild"> <div class="row rowBuild borderBottom1px"> <div class="col-xs-12" onclick="drawLine('+i.toString()+')"> <span class="floatLeft textBigBuild">'+Build[i].subname+'</span><span class="floatRight"><img src="'+imageSrc+'" class="heig"></span></div><div class="col-xs-12"><span class="floatLeft textSmallBuild">'+Build[i].name+'</span><span class="floatRight textSmallBuild">'+(Math.round(Build[i].dist*10)/10).toString()+'km</span> </div> </div> <div class="row rowBuild"> <div class="col-xs-12"> <div class="textSmallBuild"><a href="https://map.kakao.com/link/to/'+Build[i].subname+','+Build[i].lat.toString()+','+Build[i].lng.toString()+'" target="_blank">'+Build[i].address+' </a></div> </div> </div> <div class="row rowBuild"> <div class="col-xs-12"> <div class="textSmallBuild"><a href="tel:'+Build[i].callid+'" target="_blank">'+Build[i].callid+'</a></div> </div> </div> </div>';
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var marker = new kakao.maps.Marker({
        map: map,
        image: markerImage,
        position: BuildNear[i].latlng,
        clickable: true
    });
    var infowindow = new kakao.maps.InfoWindow({
        content: BuildNear[i].content, // 인포윈도우에 표시할 내용
        removable: true
    });
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
  }
  map.setBounds(kakao_bounds);

  ptrBEB=document.getElementById('buildExpandButton');
  ptrBEB.innerHTML='확장하기 ('+endNo.toString()+'/'+Build.length+')';
}

function showPosition(position) {
  //x.innerHTML = "Latitude: " + position.coords.latitude +   "<br>Longitude: " + position.coords.longitude;
  posLat=position.coords.latitude;
  posLng=position.coords.longitude;
  var gpsoffID=document.getElementById('GPSoff');
  gpsoffID.style.display="none";
  moveLatLon = new kakao.maps.LatLng(posLat, posLng);
  kakao_bounds.extend(moveLatLon);
  map.setCenter(moveLatLon);
  initBuild();
  ptrBEBP.innerHTML='<div class="container"> <div class="row"> <div class="btn btn-dark col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10 mx-auto text-center scoreSmallText" id="buildExpandButton" onclick="expandBList()"></div> </div> </div>';
  expandBuilding();

  var imageSrc = 'markerMe.png',
  imageSize = new kakao.maps.Size(39, 39),
  imageOption = {offset: new kakao.maps.Point(19, 31)};
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  marker = new kakao.maps.Marker({
    position: moveLatLon,
    image: markerImage // 마커이미지 설정
  });
  marker.setMap(map);

}


function computeDistance(index) {
    var startLatRads = degreesToRadians(posLat);
    var startLongRads = degreesToRadians(posLng);
    var destLatRads = degreesToRadians(Build[index].lat);
    var destLongRads = degreesToRadians(Build[index].lng);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}


function Building(_name, _subname, _callid, _address, _lat, _lng){
    this.name=_name;
    this.subname=_subname;
    this.callid=_callid;
    this.address=_address;
    this.lat=_lat;
    this.lng=_lng;
    this.dist=0;
}

function expandBList(){
  expandBuilding();
}

selma = null;
function drawLine(a){
  if (selma) selma.setMap(null);
  var imageSrc = 'markerSelect.png',
  imageSize = new kakao.maps.Size(47, 64),
  imageOption = {offset: new kakao.maps.Point(23, 40)};
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  selma = new kakao.maps.Marker({
    position: BuildNear[a].latlng,
    image: markerImage // 마커이미지 설정
  });
  selma.setMap(map);
  map.setCenter(BuildNear[a].latlng);
  location.href="#map";

}




  //카카오 맵 api

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}
// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}
/* 아래와 같이도 할 수 있습니다 */
/*
for (var i = 0; i < positions.length; i ++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커의 위치
    });
    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content // 인포윈도우에 표시할 내용
    });
    // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    (function(marker, infowindow) {
        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
        kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, marker);
        });
        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
        kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });
    })(marker, infowindow);
}
*/
