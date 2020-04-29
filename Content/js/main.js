var mymap;
var myLocationMarker;
var lastLatRoute;
var lastLongRoute;
var layerGroup;
//var dist = []
//var ar = []

document.getElementById("closeDrawer").addEventListener('click', (evt) => {
    var elem = document.getElementById('markerSite')
    var instance = M.Sidenav.getInstance(elem);
    instance.close();
})
document.getElementById("openAllSites").addEventListener('click', (evt) => {
    var elem = document.getElementById('allsites')
    var instance = M.Sidenav.getInstance(elem);
    instance.open();
})

document.getElementById("goTo").onclick = function (evt) {
    var latEnd = document.getElementById("localLat").innerHTML
    var longEnd = document.getElementById("localLong").innerHTML
    lastLatRoute = latEnd
    lastLongRoute = longEnd

    navigator.geolocation.getCurrentPosition((position) => {
        let latStart = position.coords.latitude;
        let longStart = position.coords.longitude;
        window.open('https://www.google.com/maps/dir/?api=1&origin=' + latStart + ',' + longStart + '&destination=' + latEnd + ',' + longEnd + '&travelmode=driving');

    }
        , errorGoTo(latEnd, longEnd));
}



function errorGoTo(latEnd, longEnd) {
    alert('Se han denegado permisos de ubicación. Para ver la ruta completa active permisos de ubicación');
    window.open('https://maps.google.com/?q=+' + latEnd + ',' + longEnd + '');
}

    /*
    navigator.geolocation.getCurrentPosition((position) => {
        let latStart = position.coords.latitude;
        let longStart = position.coords.longitude;
        
        //fetching(latStart, longStart, latEnd, longEnd);
        instance.close();
        //document.getElementById("menuSteps").style.display = "flex";
    }
        , error);*/


/*

document.getElementById("menuSteps").addEventListener('click', (evt) => {
    var elem = document.getElementById('floatSteps')
    var myLocationButton = document.getElementById('getMyLocation')

    if (elem.style.display != "none") {
        elem.style.display = "none"
        myLocationButton.style.display = "flex";
    } else {
        elem.style.display = "flex"
        myLocationButton.style.display = "none";

    }

})
*/
document.getElementById("getNearest").addEventListener('click', (evt) => launchNearestPosition())

document.getElementById("getMyLocation").addEventListener('click', (evt) => updateRouteActualPosition())

function updateRouteActualPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        let latStart = position.coords.latitude;
        let longStart = position.coords.longitude;
        if (myLocationMarker != null) {
            /*if ((lastLatRoute != null || lastLongRoute != null)) {
                clearRoutes()
                mymap.removeLayer(myLocationMarker)
                fetching(latStart, longStart, lastLatRoute, lastLongRoute);
                success(position, mymap)
            } else {*/
            mymap.removeLayer(myLocationMarker)
            success(position, mymap)
        } else {
            success(position, mymap)
        }
    }
        , error);
}

function launchNearestPosition() {
    var gj = L.geoJson(layerGroup);    
    navigator.geolocation.getCurrentPosition((position) => {
        let latStart = position.coords.latitude;
        let longStart = position.coords.longitude;
        var nearest = leafletKnn(gj).nearest(L.latLng(latStart, longStart), 1, 10000);
        window.open('https://maps.google.com/?q=+' + nearest[0].lat + ',' + nearest[0].lon + '');
    }
    , error);  

}

function clearRoutes() {
    for (i in mymap._layers) {
        if (mymap._layers[i]._path != undefined) {
            try {
                mymap.removeLayer(mymap._layers[i]);
            }
            catch (e) {
                console.log("problem with " + e + mymap._layers[i]);
            }
        }
    }
}
function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return hour + ':' + minute + ':' + second;
}

/*
function searchMinusRoute(lat1, long1, lat2, long2) {
    fetch('https://router.project-osrm.org/route/v1/driving/' + long1 + ',' + lat1 + ';' + long2 + ',' + lat2 + '')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Error: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    let distance = -1;
                    distance = parseFloat(data.routes[0].distance)
                    dist.push(distance)
                    ar.push(lat2 + "|" + long2 + "|" + distance)
                    console.log("Hola")
                    return;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

*/

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/*async*/ function successEmbeeded(position) {
   

    let mymap = initializarMapa();

    success(position, mymap)


    var contentRequestPermisson = document.getElementById('contentRequestPermisson')
    contentRequestPermisson.style.display = "none"

    var myLocationButton = document.getElementById('getNearest')
    myLocationButton.style.display = "flex";

    var myLocationButton = document.getElementById('getMyLocation')
    myLocationButton.style.display = "flex";


    /*
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;    
   

    var myIcon = L.icon({
        iconUrl: '../Content/img/myLocation.png',
        iconSize: [50, 50],
        iconAnchor: [22, 50],
        popupAnchor: [-3, -50],
        shadowSize: [68, 50],
        shadowAnchor: [22, 50]
    });
    var marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(mymap);
    marker.bindPopup('Mi Posición').openPopup();
    marker.on('click', function (evt) {
        var latLngs = [marker.getLatLng()];
        var markerBounds = L.latLngBounds(latLngs);
        mymap.fitBounds(markerBounds);
    })
    myLocationMarker = marker
    var latLngs = [marker.getLatLng()];
    var markerBounds = L.latLngBounds(latLngs);
    mymap.fitBounds(markerBounds);  

    
    for (let i = 0; i <= nearest.length - 1; i++) {
        await searchMinusRoute(latitude, longitude, nearest[i].lat, nearest[i].lon)
    }  

    getMinusRoute(latitude, longitude)
    */
    
}

/*


function getMinusRoute(latitudeStart, longStart) {
    return sleep(2000).then(v => {
        let counter = 0;
        let minDist = 0;
        let indice = 0;

        if (ar.length > 0) {
            ar.forEach(element => {
                let vi = element.split("|")[2]
                if (counter == 0) {
                    minDist = vi
                } else {
                    if (vi < minDist) {
                        minDist = vi;
                        indice = counter
                    }
                }
                counter++;

            })

            fetching(latitudeStart, longStart, ar[indice].split("|")[0], ar[indice].split("|")[1]);
            var elem = document.getElementById('markerSite')
            var instance = M.Sidenav.getInstance(elem);
            instance.close()
            document.getElementById("menuSteps").style.display = "flex";
        } 
    })
    
}

function fetching(lat1, long1, lat2, long2) {
    console.log("entra ")
    let matriz = []
    document.getElementById("floatStepsBody").innerHTML = ""
    fetch('https://router.project-osrm.org/route/v1/driving/' + long1 + ',' + lat1 + ';' + long2 + ',' + lat2 + '?steps=true&overview=full')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Error: ' +
                        response.status);
                    return;
                }

                //aqui debo formeatear la data
                let count = 1
                response.json().then(function (data) {

                    data.routes[0].legs[0].steps.map((steps) => {
                        if (count == 1) {
                            let iconI;
                            let iconContainer = document.createElement('div')
                            iconContainer.style.display = "flex";
                            iconContainer.style.alignItems = "center"
                            iconContainer.style.paddingTop = "10px"

                            iconI = document.createElement('i')
                            iconI.className = "material-icons"
                            iconI.textContent = "gps_fixed"

                            let ul = document.createElement('ul');
                            ul.style = "border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"

                            let li1 = document.createElement('li');
                            li1.textContent = "PASO " + count
                            li1.style.display = "flex"
                            li1.style.alignItems = "center"
                            li1.style.paddingTop = "5px"
                            li1.style.fontWeight = "600"

                            let pMetros = document.createElement('p')
                            pMetros.textContent = "Distancia: " + steps.distance + " mts"
                            pMetros.style.display = "flex"
                            pMetros.style.paddingTop = "10px"

                            let bRuta = document.createElement('b')
                            bRuta.textContent = "Vaya por la " + (steps.maneuver.modifier == "right" ? "derecha" : "izquierda") + " hasta " + data.routes[0].legs[0].steps[1].name
                            bRuta.style.display = "flex"
                            bRuta.style.alignItems = "center"
                            bRuta.style.fontSize = "10pt"
                            bRuta.style.paddingLeft = "5px"

                            let li3 = document.createElement("li")
                            li3.textContent = "Tiempo: " + secondsToString(parseFloat(data.routes[0].legs[0].steps[0].duration).toFixed(0)) + " min"
                            li3.style.display = "flex"
                            li3.style.alignItems = "center"
                            li3.style.paddingTop = "10px"

                            iconContainer.appendChild(iconI)
                            iconContainer.appendChild(bRuta)

                            ul.appendChild(li1)
                            ul.appendChild(iconContainer)
                            ul.appendChild(pMetros)
                            ul.appendChild(li3)

                            document.getElementById("floatStepsBody").appendChild(ul)
                        } else if (count == data.routes[0].legs[0].steps.length - 1) {
                            let ul = document.createElement('ul');
                            ul.style = "border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"

                            let iconI;
                            let iconContainer = document.createElement('div')
                            iconContainer.style.display = "flex";
                            iconContainer.style.alignItems = "center";
                            iconContainer.style.paddingTop = "10px"

                            if (steps.maneuver.modifier == "right") {
                                iconI = document.createElement('i')
                                iconI.className = "material-icons"
                                iconI.textContent = "subdirectory_arrow_right"

                            } else {
                                iconI = document.createElement('i')
                                iconI.className = "material-icons"
                                iconI.textContent = "subdirectory_arrow_left"
                            }


                            let li1 = document.createElement('li');
                            li1.textContent = "PASO " + count
                            li1.style.display = "flex"
                            li1.style.alignItems = "center"
                            li1.style.paddingTop = "5px"
                            li1.style.fontWeight = "600"


                            let pMetros = document.createElement('p')
                            pMetros.textContent = "Distancia: " + steps.distance + " mts"
                            pMetros.style.display = "flex"
                            pMetros.style.paddingTop = "10px"


                            let bRuta = document.createElement('b')
                            bRuta.textContent = "De vuelta hacia la " + (steps.maneuver.modifier == "right" ? "derecha" : "izquierda") + " por la calle " + steps.name
                            bRuta.style.display = "flex"
                            bRuta.style.alignItems = "center"
                            bRuta.style.fontSize = "10pt"
                            bRuta.style.paddingLeft = "5px"

                            iconContainer.appendChild(iconI)
                            iconContainer.appendChild(bRuta)

                            let li3 = document.createElement("li")
                            li3.textContent = "Tiempo: " + secondsToString(parseFloat(steps.duration).toFixed(0)) + " min"
                            li3.style.display = "flex"
                            li3.style.alignItems = "center"
                            li3.style.paddingTop = "10px"

                            ul.appendChild(li1)
                            ul.appendChild(iconContainer)
                            ul.appendChild(pMetros)
                            ul.appendChild(li3)

                            document.getElementById("floatStepsBody").appendChild(ul)
                        }

                        else if (count == data.routes[0].legs[0].steps.length) {

                            let iconI;
                            let iconContainer = document.createElement('div')
                            iconContainer.style.display = "flex";
                            iconContainer.style.alignItems = "center";
                            iconContainer.style.paddingTop = "10px"
                            iconI = document.createElement('i')
                            iconI.className = "material-icons"
                            iconI.textContent = "place"


                            let ul = document.createElement('ul');
                            ul.style = "border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"

                            let li1 = document.createElement('li');
                            li1.textContent = "PASO " + count
                            li1.style.display = "flex"
                            li1.style.alignItems = "center"
                            li1.style.paddingTop = "5px"
                            li1.style.fontWeight = "600"

                            let bRuta = document.createElement("b")
                            bRuta.textContent = "Usted ha llegado a su destino"
                            bRuta.style.display = "flex"
                            bRuta.style.alignItems = "center"
                            bRuta.style.marginLeft = "3px";
                            bRuta.style.color = "#0169B7";


                            iconContainer.appendChild(iconI)
                            iconContainer.appendChild(bRuta)

                            ul.appendChild(li1)
                            ul.appendChild(iconContainer)

                            document.getElementById("floatStepsBody").appendChild(ul)
                        }
                        else {
                            let iconI;
                            let iconContainer = document.createElement('div')
                            iconContainer.style.display = "flex";
                            iconContainer.style.alignItems = "center";
                            iconContainer.style.paddingTop = "10px"

                            if (steps.maneuver.modifier == "right") {
                                iconI = document.createElement('i')
                                iconI.className = "material-icons"
                                iconI.textContent = "subdirectory_arrow_right"

                            } else {
                                iconI = document.createElement('i')
                                iconI.className = "material-icons"
                                iconI.textContent = "subdirectory_arrow_left"

                            }


                            let ul = document.createElement('ul');
                            ul.style = "border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;margin-bottom:10px;padding-bottom:10px;"

                            let li1 = document.createElement('li');
                            li1.textContent = "PASO " + count
                            li1.style.display = "flex"
                            li1.style.alignItems = "center"
                            li1.style.paddingTop = "5px"
                            li1.style.fontWeight = "600"

                            let pMetros = document.createElement('p')
                            pMetros.textContent = "Distancia: " + steps.distance + " mts"
                            pMetros.style.display = "flex"
                            pMetros.style.paddingTop = "10px"

                            let bRuta = document.createElement('b')
                            bRuta.textContent = "Dirijase hacia la " + (steps.maneuver.modifier == "right" ? "derecha" : "izquierda") + " por la calle " + steps.name + " y siga en " + steps.intersections.length + " cuadras"
                            bRuta.style.display = "flex"
                            bRuta.style.alignItems = "center"
                            bRuta.style.fontSize = "10pt"
                            bRuta.style.paddingLeft = "5px"

                            let li3 = document.createElement("li")
                            li3.textContent = "Tiempo: " + secondsToString(parseFloat(steps.duration).toFixed(0)) + " min"
                            li3.style.display = "flex"
                            li3.style.alignItems = "center"
                            li3.style.paddingTop = "10px"

                            iconContainer.appendChild(iconI)
                            iconContainer.appendChild(bRuta)

                            ul.appendChild(li1)
                            ul.appendChild(iconContainer)
                            ul.appendChild(pMetros)
                            ul.appendChild(li3)

                            document.getElementById("floatStepsBody").appendChild(ul)
                        }


                        let kilometros = (parseFloat(data.routes[0].distance) / 1000).toFixed(2)

                        //document.getElementById("routeResumen").style.display = "flex"
                        //document.getElementById("distace").innerHTML = kilometros + " Km"
                        //document.getElementById("duration").innerHTML = secondsToString(parseFloat(data.routes[0].duration).toFixed(0))


                        steps.intersections.map((inte) => {
                            matriz.push([inte.location[1], inte.location[0]])

                        })
                        count++

                    })
                    clearRoutes()
                    let polygon = L.polyline(matriz, { color: '#2665FF', weight: 12, opacity: 0.4 }).addTo(mymap)
                    mymap.fitBounds(polygon.getBounds());
                    var elem = document.getElementById('markerSite')
                    var instance = M.Sidenav.getInstance(elem);
                    instance.close();

                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
*/

function success(position, mymap) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    var myIcon = L.icon({
        iconUrl: '../Content/img/myLocation.png',
        iconSize: [50, 50],
        iconAnchor: [22, 50],
        popupAnchor: [-3, -50],
        shadowSize: [68, 50],
        shadowAnchor: [22, 50]
    });
    var marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(mymap);
    marker.bindPopup('Mi Posición').openPopup();
    marker.on('click', function (evt) {
        var latLngs = [marker.getLatLng()];
        var markerBounds = L.latLngBounds(latLngs);
        mymap.fitBounds(markerBounds);
    })
    myLocationMarker = marker
  //  var latLngs = [marker.getLatLng()];
    // var markerBounds = L.latLngBounds(latLngs);
    mymap.setView([latitude, longitude],14);
}

function initializarMapa() {

    var elems = document.getElementById('markerSite');
    var elementAll = document.getElementById('allsites');
    M.Sidenav.init(elementAll, {
        edge: 'right',
        draggable: true,
        inDuration: 250,
        outDuration: 200,
        onOpenStart: function () {
            //var menuSteps = document.getElementById('menuSteps')
            //menuSteps.style.display = "none";
            var myLocationButton = document.getElementById('getMyLocation')
            myLocationButton.style.display = "none";
            /*var floatStepsDialog = document.getElementById('floatSteps')
            var menuSteps = document.getElementById('menuSteps')
            if (lastLatRoute != null) {
                floatStepsDialog.style.display = "none"
            }
            */

        },
        onCloseEnd: function () {

            var myLocationButton = document.getElementById('getMyLocation')
            myLocationButton.style.display = "flex";
            /*var floatStepsDialog = document.getElementById('floatSteps')
            var menuSteps = document.getElementById('menuSteps')
            if (lastLatRoute != null) {
                floatStepsDialog.style.display = "none"
                menuSteps.style.display = "flex";
            } else {
                menuSteps.style.display = "none";
            }*/
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
            closeIcon.style.color = "#FFFFFF";
            var gotoIcon = document.getElementById('goTo')
            gotoIcon.style.color = "#FFFFFF";
            /*var menuSteps = document.getElementById('menuSteps')
            var floatStepsDialog = document.getElementById('floatSteps')
            var menuSteps = document.getElementById('menuSteps')
            if (lastLatRoute != null) {
                floatStepsDialog.style.display = "none"
                menuSteps.style.display = "none";
            } else {
                menuSteps.style.display = "none";
            }*/
        },
        onCloseEnd: function () {
            /*var menuSteps = document.getElementById('menuSteps')
            if (lastLatRoute != null) {
                menuSteps.style.display = "flex";
            } else {
                menuSteps.style.display = "none";
            }*/
        },
    });

    mymap = L.map('mapid', {
        zoomControl: false
    }).setView([-1.591400, -79.002356], 100);

    L.control.zoom({ position: 'bottomright' }).addTo(mymap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Chariot - 2020' }).addTo(mymap);

    //datos que toma del api:
    let datos = data_engine

    //esto es para abrir el side bar o drawer
    var elem = document.getElementById('markerSite')
    var instance = M.Sidenav.getInstance(elem);
    var markerGroup = [];

    datos.map((dataResponse) => {
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
        contentHeader.style.alignItems = "center"

        contentHeader.appendChild(iconContentHeader)

        let divCollapsibleHeader = document.createElement('div');
        divCollapsibleHeader.id = dataResponse.provincia
        divCollapsibleHeader.style.display = "flex"
        divCollapsibleHeader.style.justifyContent = "space-between"
        divCollapsibleHeader.style.alignItems = "center"
        divCollapsibleHeader.className = "collapsible-header"

        divCollapsibleHeader.appendChild(contentHeader)
        divCollapsibleHeader.appendChild(iconCollapsibleHeader)

        let divCollapdibleBody = document.createElement('div');
        divCollapdibleBody.className = "collapsible-body"

        let ulCollapsibleContentList = document.createElement('ul');
        ulCollapsibleContentList.style.padding = "10px"

        var myIcon = L.icon({
            iconUrl: '../Content/img/store_icon.png',
            iconSize: [30, 30],
            iconAnchor: [22, 30],
            popupAnchor: [-3, -30],
            shadowSize: [40, 30],
            shadowAnchor: [22, 30]
        });

        dataResponse.bancos.map((bancos) => {
            var latLngs;
            var markerBounds;
            var marker = L.marker([bancos.latitud, bancos.longitud], { icon: myIcon });
            // y una funciona para cada marker que abre el modal pero antes cambiando el texto de los p
            marker.on('click', function (evt) {
                document.getElementById("titleDrawer").innerHTML = bancos.name
                //if (bancos.img != 'HTTP') {
                //    document.getElementById("localImage").src = bancos.img;
                //    document.getElementById("localImage").style.display = "flex";
                //} else {
                //    document.getElementById("localImage").style.display = "none";
                //}
               // document.getElementById("localName").innerHTML = bancos.name
                document.getElementById("localType").innerHTML = bancos.TipoNegocio
                //document.getElementById("localOwn").innerHTML = bancos.name
                //document.getElementById("localPhone").innerHTML = bancos.Celular
                document.getElementById("localDir").innerHTML = bancos.direccion
                //document.getElementById("localProv").innerHTML = dataResponse.provincia
                document.getElementById("localCity").innerHTML = bancos.Canton
                document.getElementById("localPar").innerHTML = bancos.Parroquia
                document.getElementById("localLat").innerHTML = bancos.latitud
                document.getElementById("localLong").innerHTML = bancos.longitud

                latLngs = [marker.getLatLng()];
                markerBounds = L.latLngBounds(latLngs);
                mymap.fitBounds(markerBounds);
                instance.open()
            })

            let liCollapsibleItem = document.createElement('li');
            liCollapsibleItem.textContent = bancos.dtrmNombre;
            liCollapsibleItem.style.paddingLeft = "20px"
            liCollapsibleItem.style.paddingRight = "20px"
            liCollapsibleItem.id = dataResponse.provincia + bancos.name
            liCollapsibleItem.style.cursor = "pointer"
            ulCollapsibleContentList.appendChild(liCollapsibleItem)

            liCollapsibleItem.addEventListener("click", () => {
                mymap.panTo(new L.LatLng(bancos.latitud, bancos.longitud), 24);
                var elem = document.getElementById('allsites')
                var instance = M.Sidenav.getInstance(elem);
                instance.close();
            }, false)

            markerGroup.push(marker)

        })
        divCollapdibleBody.appendChild(ulCollapsibleContentList)

        liHeader.appendChild(divCollapsibleHeader)

        liHeader.appendChild(divCollapdibleBody)

        document.getElementById("listCollapsible").appendChild(liHeader)
    })

    layerGroup = L.layerGroup(markerGroup).addTo(mymap).toGeoJSON();

    return mymap;
}

function error() {
    alert('Se han denegado permisos de ubicación, active para acceder');
}

function permiso(_model) {
    data_engine = _model
    //se debe  poner en negado la siguiente función
    if (window.location !== window.parent.location) {
        if (navigator.geolocation) {
          
                navigator.geolocation.getCurrentPosition((position) => successEmbeeded(position), error);
      
        } else {
            console.lo("Geolocation is not supported by this browser.");
        }        

    }
    else {

        let mymap = initializarMapa();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => success(position, mymap), error);

            var contentRequestPermisson = document.getElementById('contentRequestPermisson')
            contentRequestPermisson.style.display = "none"

            var myLocationButton = document.getElementById('getNearest')
            myLocationButton.style.display = "flex";

            var myLocationButton = document.getElementById('getMyLocation')
            myLocationButton.style.display = "flex";

        } else {
            console.lo("Geolocation is not supported by this browser.");
        }
    }
}

  