var mymap;
var myLocationMarker;
var lastLatRoute;
var lastLongRoute;
var data_engine;

document.getElementById("closeDrawer").addEventListener('click', (evt)=>{
    var elem = document.getElementById('markerSite')
    var instance = M.Sidenav.getInstance(elem);
    instance.close();
})
document.getElementById("openAllSites").addEventListener('click',(evt)=>{
    var elem = document.getElementById('allsites')
    var instance = M.Sidenav.getInstance(elem);
    instance.open();
})

document.getElementById("goTo").onclick = function(evt) {
  var latEnd=document.getElementById("localLat").innerHTML
  var longEnd=document.getElementById("localLong").innerHTML
  lastLatRoute = latEnd
  lastLongRoute = longEnd
  var elem = document.getElementById('markerSite')
  var instance = M.Sidenav.getInstance(elem);

  navigator.geolocation.getCurrentPosition((position)=>{
    let latStart = position.coords.latitude;
    let longStart = position.coords.longitude;
    fetching(latStart,longStart,latEnd,longEnd); 
    instance.close(); 
    document.getElementById("menuSteps").style.display = "flex";
  }
  , error);
}

document.getElementById("menuSteps").addEventListener('click',(evt)=>{
  var elem = document.getElementById('floatSteps')
  var myLocationButton = document.getElementById('getMyLocation')

  if(elem.style.display!="none"){
    elem.style.display="none"
    myLocationButton.style.display="flex";  
  }else{
    elem.style.display="flex"
    myLocationButton.style.display="none";  

  } 
  
})

document.getElementById("getMyLocation").addEventListener('click',(evt)=>updateRouteActualPosition())

function  updateRouteActualPosition(){
  navigator.geolocation.getCurrentPosition((position)=>{
    let latStart = position.coords.latitude;
    let longStart = position.coords.longitude;
    if(myLocationMarker!=null){
      if(( lastLatRoute!= null || lastLongRoute != null)){
        clearRoutes()
        mymap.removeLayer(myLocationMarker)
        fetching(latStart,longStart,lastLatRoute,lastLongRoute); 
        success(position, mymap)
      }else{
        mymap.removeLayer(myLocationMarker)
        success(position, mymap)
      }      
    }   
  }
  , error);
}

function clearRoutes(){
  for(i in mymap._layers) {
    if(mymap._layers[i]._path != undefined) {
        try {
          mymap.removeLayer(mymap._layers[i]);
        }
        catch(e) {
            console.log("problem with " + e + mymap._layers[i]);
        }
    }
}
}
function secondsToString(seconds) {
  var hour = Math.floor(seconds / 3600);
  hour = (hour < 10)? '0' + hour : hour;
  var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour + ':' + minute + ':' + second;
}

function fetching(lat1,long1,lat2,long2){
  let matriz=[]
  document.getElementById("floatStepsBody").innerHTML = ""
  fetch('http://router.project-osrm.org/route/v1/driving/'+long1+','+lat1+';'+long2+','+lat2+'?steps=true&overview=full')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Error: ' +
          response.status);
        return;
      }
     
      //aqui debo formeatear la data
      let count=1
      response.json().then(function(data) {
        console.log(data)
        data.routes[0].legs[0].steps.map((steps)=>{
          if(count==1){
            let iconI;
            let iconContainer= document.createElement('div')
            iconContainer.style.display="flex";
            iconContainer.style.alignItems="center";
            iconContainer.style.paddingTop = "10px"
            iconI= document.createElement('i')
            iconI.className="material-icons"
            iconI.textContent="gps_fixed"


            let ul = document.createElement('ul');
            ul.style="border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"

            let li1 = document.createElement('li');
            li1.textContent = "PASO "+count
            li1.style.display = "flex"
            li1.style.alignItems = "center"
            li1.style.paddingTop = "5px"
            li1.style.fontWeight = "600"

            let pMetros = document.createElement('span')
            pMetros.textContent = steps.distance+" mt"
            pMetros.style.color = "#0169B7"
            pMetros.style.width = "100px"
            pMetros.style.display = "flex"
            pMetros.style.justifyContent = "flex-end"


            let li2 = document.createElement('li')
            li2.textContent = "Vaya por la "+(steps.maneuver.modifier == "right" ? "derecha":"izquierda")+" hasta "+data.routes[0].legs[0].steps[1].name
            li2.style.display = "flex"
            li2.style.alignItems = "center"
            li2.style.justifyContent = "space-between"
            li2.style.marginLeft="3px";
            li2.style.fontSize = "10pt"

            li2.appendChild(pMetros)

            let li3 = document.createElement("li")
            li3.textContent = "Tiempo: "+secondsToString(parseFloat(data.routes[0].legs[0].steps[0].duration).toFixed(0))+ " min"
            li3.style.display = "flex"
            li3.style.alignItems = "center"
            li3.style.paddingTop = "10px"

            iconContainer.appendChild(iconI)
            iconContainer.appendChild(li2)

            ul.appendChild(li1)
            ul.appendChild(iconContainer)
            ul.appendChild(li3)

            document.getElementById("floatStepsBody").appendChild(ul)  
          }else if(count==data.routes[0].legs[0].steps.length-1){
            let ul = document.createElement('ul');
            ul.style="border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"
            
            let iconI;
            let iconContainer= document.createElement('div')
            iconContainer.style.display="flex";
            iconContainer.style.alignItems="center";
            if(steps.maneuver.modifier == "right"){
              iconI= document.createElement('i')
              iconI.className="material-icons"
              iconI.textContent="subdirectory_arrow_right"
    
            }else{
              iconI= document.createElement('i')
              iconI.className="material-icons"
              iconI.textContent="subdirectory_arrow_left"
 

            }
            
           
            
            let li1 = document.createElement('li');
            li1.textContent = "PASO "+count
            li1.style.display = "flex"
            li1.style.alignItems = "center"
            li1.style.paddingTop = "5px"
            li1.style.fontWeight = "600"
 

            let pMetros = document.createElement('span')
            pMetros.textContent = steps.distance+" mt"
            pMetros.style.color = "#0169B7"
            pMetros.style.width = "100px"
            pMetros.style.display = "flex"
            pMetros.style.justifyContent = "flex-end"



            let li2 = document.createElement('li')
            li2.textContent = "De vuelta hacia la "+(steps.maneuver.modifier == "right" ? "derecha":"izquierda")+ " por la calle "+steps.name
            li2.style.display = "flex"            
            li2.style.fontSize = "10pt"
            li2.style.marginLeft="3px";


            let liContainer = document.createElement('li')
            liContainer.style.display = "flex"
            liContainer.style.alignItems = "center"
            liContainer.style.justifyContent = "space-between"
            liContainer.style.paddingTop = "10px"

            iconContainer.appendChild(iconI)
            iconContainer.appendChild(li2)

    
            liContainer.appendChild(iconContainer)
            
            liContainer.appendChild(pMetros)


            let li3 = document.createElement("li")
            li3.textContent = "Tiempo: "+secondsToString(parseFloat(steps.duration).toFixed(0))+ " min"
            li3.style.display = "flex"
            li3.style.alignItems = "center"
            li3.style.paddingTop = "10px"

            ul.appendChild(li1)
            ul.appendChild(liContainer)
            ul.appendChild(li3)

            document.getElementById("floatStepsBody").appendChild(ul)   
          }

          else if(count==data.routes[0].legs[0].steps.length){
            
            let iconI;
            let iconContainer= document.createElement('div')
            iconContainer.style.display="flex";
            iconContainer.style.alignItems="center";
            iconContainer.style.paddingTop = "10px"
            iconI= document.createElement('i')
            iconI.className="material-icons"
            iconI.textContent="place"

            
            let ul = document.createElement('ul');
            ul.style="border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"

            let li1 = document.createElement('li');
            li1.textContent = "PASO "+count
            li1.style.display = "flex"
            li1.style.alignItems = "center"
            li1.style.paddingTop = "5px"
            li1.style.fontWeight = "600"

            let li2 = document.createElement("li")
            li2.textContent = "Usted ha llegado a su destino"
            li2.style.display = "flex"
            li2.style.alignItems = "center"
       
            li2.style.marginLeft="3px";

            iconContainer.appendChild(iconI)
            iconContainer.appendChild(li2)

            ul.appendChild(li1)
            ul.appendChild(iconContainer)

            document.getElementById("floatStepsBody").appendChild(ul)  
          }
          else{
            let iconI;
            let iconContainer= document.createElement('div')
            iconContainer.style.display="flex";
            iconContainer.style.alignItems="center";
            if(steps.maneuver.modifier == "right"){
              iconI= document.createElement('i')
              iconI.className="material-icons"
              iconI.textContent="subdirectory_arrow_right"
    
            }else{
              iconI= document.createElement('i')
              iconI.className="material-icons"
              iconI.textContent="subdirectory_arrow_left"
 

            }


            let ul = document.createElement('ul');
            ul.style="border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"

            let li1 = document.createElement('li');
            li1.textContent = "PASO "+count
            li1.style.display = "flex"
            li1.style.alignItems = "center"
            li1.style.paddingTop = "5px"
            li1.style.fontWeight = "600"
       
            let pMetros = document.createElement('span')
            pMetros.textContent = steps.distance+" mt"
            pMetros.style.color = "#0169B7"
            pMetros.style.width = "100px"
            pMetros.style.display = "flex"
            pMetros.style.justifyContent = "flex-end"



            let li2 = document.createElement('li')
            li2.textContent = "Dirijase hacia la "+(steps.maneuver.modifier == "right" ? "derecha":"izquierda")+ " por la calle "+steps.name+" y siga en "+steps.intersections.length+" cuadras"
            li2.style.display = "flex"            
            li2.style.fontSize = "10pt"


            let liContainer = document.createElement('li')
            liContainer.style.display = "flex"
            liContainer.style.alignItems = "center"
            liContainer.style.justifyContent = "space-between"
            liContainer.style.paddingTop = "10px"

            iconContainer.appendChild(iconI)
            iconContainer.appendChild(li2)

            liContainer.appendChild(iconContainer)
            liContainer.appendChild(pMetros)


            let li3 = document.createElement("li")
            li3.textContent = "Tiempo: "+secondsToString(parseFloat(steps.duration).toFixed(0))+ " min"
            li3.style.display = "flex"
            li3.style.alignItems = "center"
            li3.style.paddingTop = "10px"

            ul.appendChild(li1)
            ul.appendChild(liContainer)
            ul.appendChild(li3)

            document.getElementById("floatStepsBody").appendChild(ul)  
          }
          
 
          let kilometros = (parseFloat(data.routes[0].distance)/1000).toFixed(2)
 
          document.getElementById("routeResumen").style.display="flex"
          document.getElementById("distace").innerHTML= kilometros+" Km"
          document.getElementById("duration").innerHTML=secondsToString(parseFloat(data.routes[0].duration).toFixed(0))
          
 
         
          steps.intersections.map((inte)=>{
            matriz.push([inte.location[1],inte.location[0]])
             
          })
          count++
       
        })
        clearRoutes()
        let polygon = L.polyline(matriz, {color: '#007ACC', weight : 8, opacity: 0.4}).addTo(mymap)
        mymap.fitBounds(polygon.getBounds());
        var elem = document.getElementById('markerSite')
        var instance = M.Sidenav.getInstance(elem);
        instance.close();
 
     });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

/*

function fetching(lat1,long1,lat2,long2){
  let matriz=[]
  fetch('http://router.project-osrm.org/route/v1/driving/'+long1+','+lat1+';'+long2+','+lat2+'?steps=true&overview=full')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Error: ' +
          response.status);
        return;
      }
     
      //aqui debo formeatear la data
      response.json().then(function(data) {
        data.routes[0].legs[0].steps.map((steps)=>{
          let kilometros = (parseFloat(data.routes[0].distance)/1000).toFixed(2)
          document.getElementById("routeResumen").style.display="flex"
          document.getElementById("distace").innerHTML= kilometros+" Km"
          document.getElementById("duration").innerHTML=secondsToString(parseFloat(data.routes[0].duration).toFixed(0))
          

          steps.intersections.map((inte)=>{
            matriz.push([inte.location[1],inte.location[0]])
             
          })
       
        })
        clearRoutes()
        let polygon = L.polyline(matriz, {color: '#0665B2', weight: 8, opacity: 0.4}).addTo(mymap)
        mymap.fitBounds(polygon.getBounds());

     });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
*/

function success(position,mymap) {
  let latitude  = position.coords.latitude;
  let longitude = position.coords.longitude;

  var myIcon = L.icon({
    iconUrl: './src/myLocation.png',
    iconSize: [50, 50],
    iconAnchor: [22, 50],
    popupAnchor: [-3, -50],
    shadowSize: [68, 50],
    shadowAnchor: [22, 50]
  });
  var marker = L.marker([latitude,longitude], {icon: myIcon}).addTo(mymap);
  marker.bindPopup('Mi Posición').openPopup();
  marker.on('click', function(evt) { 
    var latLngs = [ marker.getLatLng() ];
    var markerBounds = L.latLngBounds(latLngs);
    mymap.fitBounds(markerBounds);
  })
  myLocationMarker = marker
  var latLngs = [ marker.getLatLng() ];
  var markerBounds = L.latLngBounds(latLngs);
  mymap.fitBounds(markerBounds);
}

function initializarMapa(){

  var elems       = document.getElementById('markerSite');
  var elementAll  = document.getElementById('allsites');
    M.Sidenav.init(elementAll, {
      edge: 'right',
      draggable: true,
      inDuration: 250,
      outDuration: 200,
    onOpenStart: function () {
        var menuSteps = document.getElementById('menuSteps')
        menuSteps.style.display="none";     
        var myLocationButton = document.getElementById('getMyLocation')
        myLocationButton.style.display="none";  
        if(lastLatRoute!=null){
          var floatStepsDialog = document.getElementById('floatSteps')
          floatStepsDialog.style.display = "none"
        }
       
      },
    onCloseEnd: function () {
   
        var myLocationButton = document.getElementById('getMyLocation')
        myLocationButton.style.display="flex";         
        if(lastLatRoute!=null){
          var floatStepsDialog = document.getElementById('floatSteps')
          floatStepsDialog.style.display = "none"
          var menuSteps = document.getElementById('menuSteps')
          menuSteps.style.display="flex";   
        }            
      },
    }); 

    var collapsibleBar = document.querySelectorAll('.collapsible');
    var instancesCollapsible = M.Collapsible.init(collapsibleBar, {}); 

    M.Sidenav.init(elems, {
      edge: 'left',
      draggable: true,
      inDuration: 250,
      outDuration: 200,
    onOpenStart: function () {
      var closeIcon = document.getElementById('closeDrawer')
      closeIcon.style.color="#FFFFFF";
      var gotoIcon = document.getElementById('goTo')
      gotoIcon.style.color="#FFFFFF";
      var menuSteps = document.getElementById('menuSteps')
        menuSteps.style.display="none";     
    },
    onCloseEnd: function () {
      var menuSteps = document.getElementById('menuSteps')
      menuSteps.style.display="flex";                
    },
  }); 
  
  mymap = L.map('mapid',{
    zoomControl: false}).setView([-1.591400, -79.002356], 7);

  L.control.zoom({position: 'bottomright'}).addTo(mymap);

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(mymap);
   
   //datos que toma del api:
    //var datos =
    //    [{
    //        "provincia": "Pichincha", "bancos":
    //            [{
    //                "name": "Comercial 1",
    //                "latitud": "-0.279776"
    //                , "longitud": "-78.553142"
    //                , "direccion": "Marcador 1",
    //                "img": "https://media.metrolatam.com/2019/11/29/capturadepantall-686e6d8228e436fe789eb941a74ab7c7-600x400.jpg"
    //            }]
    //    },
    //    {
    //        "provincia":
    //            "Guayas", "bancos":
    //            [{
    //                "name": "Comercial 2",
    //                "latitud": "-0.283467",
    //                "longitud": "-78.552736",
    //                "direccion": "Marcador 2",
    //                "img": "https://i.insider.com/5b75a0a4e361c01b008b4ff0?width=900&format=jpeg"
    //            }]
    //        }];
    ///
    var datos = data_engine;
  //esto es para abrir el side bar o drawer
  var elem = document.getElementById('markerSite')
  var instance = M.Sidenav.getInstance(elem);
  var sitis=[];

  datos.map((dataResponse)=>{
    //creo un m arcador por caea registro del data
      let liHeader = document.createElement('li');

      let iconCollapsibleHeader = document.createElement('i');
      iconCollapsibleHeader.className = "material-icons"
      iconCollapsibleHeader.innerHTML = "arrow_drop_down"

      let iconContentHeader = document.createElement('i');
      iconContentHeader.className = "material-icons"
      iconContentHeader.innerHTML = "store"
      iconContentHeader.style.color = "#C2185B"
      iconContentHeader.style.order = "-1"


      let contentHeader = document.createElement('div')
      contentHeader.innerText = dataResponse.provincia
      contentHeader.style.display = "flex"
      contentHeader.style.alignItems= "center"

      contentHeader.appendChild(iconContentHeader)

      let divCollapsibleHeader = document.createElement('div');
      divCollapsibleHeader.id = dataResponse.provincia
      divCollapsibleHeader.style.display = "flex"
      divCollapsibleHeader.style.justifyContent = "space-between"
      divCollapsibleHeader.style.alignItems = "center"
      divCollapsibleHeader.className = "collapsible-header"
      
      divCollapsibleHeader.appendChild(contentHeader)
      divCollapsibleHeader.appendChild(iconCollapsibleHeader)      

    dataResponse.bancos.map((bancos) =>{
        var marker = L.marker([bancos.latitud, bancos.longitud]).addTo(mymap);
        // y una funciona para cada marker que abre el modal pero antes cambiando el texto de los p
        marker.on('click', function(evt) {
          document.getElementById("titleDrawer").innerHTML = bancos.name
          document.getElementById("localImage").src = bancos.img;
          document.getElementById("localName").innerHTML = bancos.name
          document.getElementById("localLat").innerHTML=bancos.latitud
          document.getElementById("localLong").innerHTML=bancos.longitud
          document.getElementById("localDir").innerHTML=bancos.direccion

          var latLngs = [ marker.getLatLng() ];
          var markerBounds = L.latLngBounds(latLngs);
          mymap.fitBounds(markerBounds);
          instance.open()
        })

        let divCollapdibleBody = document.createElement('div');
        divCollapdibleBody.className = "collapsible-body"

        let spanCollapsibleItem = document.createElement('span');
        spanCollapsibleItem.textContent = bancos.name;
        spanCollapsibleItem.style.paddingLeft = "20px"
        spanCollapsibleItem.style.paddingRight = "20px"
        spanCollapsibleItem.id = dataResponse.provincia+bancos.name
        spanCollapsibleItem.style.cursor="pointer"
        divCollapdibleBody.appendChild(spanCollapsibleItem)
        liHeader.appendChild(divCollapsibleHeader)  
        liHeader.appendChild(divCollapdibleBody)  

        spanCollapsibleItem.addEventListener("click",()=>{
          mymap.panTo(new L.LatLng(bancos.latitud, bancos.longitud));
          var elem = document.getElementById('allsites')
          var instance = M.Sidenav.getInstance(elem);
          instance.close();
        },false)
       


      })  

      document.getElementById("listCollapsible").appendChild(liHeader)
                                   
    })
  
    return mymap;
}

function error() {
  alert('Unable to retrieve your location');
}
function permiso(_model) {
    data_engine=_model
  let mymap = initializarMapa();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>success(position,mymap), error);
  } else {
    console.lo("Geolocation is not supported by this browser.");
  }
}



  