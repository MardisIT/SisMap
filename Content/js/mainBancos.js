var mymap;
var myLocationMarker;
var lastLatRoute;
var lastLongRoute;
var layerGroup;
//var dist = []
//var ar = []

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var mapbgmm3 = document.getElementById("Abrir")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "none";
    WiLoad2();
    LoadMapEmpty();
    mapbgmm3.click();
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "block";
    }
}

document.getElementById("closeDrawer").addEventListener('click', (evt) => {
    var elem = document.getElementById('markerSite')
    var instance = M.Sidenav.getInstance(elem);
    instance.close();
})
//document.getElementById("opensearch").addEventListener('click', (evt) => {
//    var elem = document.getElementById('opensearch')
//    var elem1 = document.getElementById('mapbg')
//    var elem1 = document.getElementById('mapbg')
//    elem1.style.display = "flex";
//    elem.style.display = "none";


//})
//document.getElementById("idcerrar").addEventListener('click', (evt) => {
//    var elem = document.getElementById('opensearch')
//    var elem1 = document.getElementById('mapbg')
//    elem.style.display = "flex";
//    elem1.style.display = "none";
//    //var id = $("#mapbg").attr('name')
//    //if (id === 'i') {
//    //    elem.style.display = "none";
//    //    $("#mapbg").attr('name', 'n')
//    //} else {
//    //    elem.style.display = "flex";
//    //    $("#mapbg").attr('name', 'i')
//    //}



//})

document.getElementById("goTo").onclick = function (evt) {
    var latEnd = document.getElementById("localLat").innerHTML
    var longEnd = document.getElementById("localLong").innerHTML
    lastLatRoute = latEnd
    lastLongRoute = longEnd

    var checkDevice = checkMobile();

    if (!checkDevice) {
        navigator.geolocation.getCurrentPosition((position) => getRoute(position, latEnd, longEnd), errorGoTo);
    } else {
        window.open('https://maps.google.com/?q=+' + lastLatRoute + ',' + lastLongRoute + '');
    }

    //successEmbeeded(position), error);

}

function getRoute(position, latEnd, longEnd) {
    console.log("entra en success")
    let latStart = position.coords.latitude;
    let longStart = position.coords.longitude;
    window.open('https://www.google.com/maps/dir/?api=1&origin=' + latStart + ',' + longStart + '&destination=' + latEnd + ',' + longEnd + '&travelmode=driving');
}

function errorGoTo() {
    alert('Se han denegado permisos de ubicación. Para ver la ruta completa active permisos de ubicación');
    window.open('https://maps.google.com/?q=+' + lastLatRoute + ',' + lastLongRoute + '');
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
//document.getElementById("getNearest").addEventListener('click', (evt) => launchNearestPosition())

document.getElementById("getMyLocation").addEventListener('click', (evt) => updateRouteActualPosition())

function checkMobile() {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}



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

    var checkDevice = checkMobile();

    if (!checkDevice) {
        navigator.geolocation.getCurrentPosition((position) => {
            let latStart = position.coords.latitude;
            let longStart = position.coords.longitude;
            var nearest = leafletKnn(gj).nearest(L.latLng(latStart, longStart), 1, 10000);
            window.open('https://maps.google.com/?q=+' + nearest[0].lat + ',' + nearest[0].lon + '');
        }
            , error);
    } else if (myLocationMarker != null) {
        var latLngs = myLocationMarker.getLatLng();
        var nearest = leafletKnn(gj).nearest(L.latLng(latLngs.lat, latLngs.lng), 1, 10000);
        window.open('https://maps.google.com/?q=+' + nearest[0].lat + ',' + nearest[0].lon + '');

    } else {
        alert('Se han denegado permisos de ubicación. Para ver la ruta completa active permisos de ubicación');
    }

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

    //var myLocationButton = document.getElementById('getNearest')
    //myLocationButton.style.display = "flex";

    //var myLocationButton = document.getElementById('getMyLocation')
    //myLocationButton.style.display = "flex";


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
    marker.bindPopup('Mi Ubicación').openPopup();
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
    marker.bindPopup('Estas aquí').openPopup();
    marker.on('click', function (evt) {
        var latLngs = [marker.getLatLng()];
        var markerBounds = L.latLngBounds(latLngs);
        mymap.fitBounds(markerBounds);
    })
    myLocationMarker = marker
    //  var latLngs = [marker.getLatLng()];
    // var markerBounds = L.latLngBounds(latLngs);
    mymap.setView([latitude, longitude], 14);
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
            var elem1 = document.getElementById('mapbg')
            elem1.style.display = "none";
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
            var elem1 = document.getElementById('mapbg')
            var elem8 = document.getElementById('mapbg9')
            elem8.style.display = "none";
            elem1.style.display = "none";
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
            var elem8 = document.getElementById('mapbg')
            elem8.style.display = "flex";
            var elem1 = document.getElementById('mapbg9')
            elem1.style.display = "flex";
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

        //var myIcon = L.icon({
        //    iconUrl: '../Content/img/store_icon.png',
        //    iconSize: [30, 30],
        //    iconAnchor: [22, 30],
        //    popupAnchor: [-3, -30],
        //    shadowSize: [40, 30],
        //    shadowAnchor: [22, 30]
        //});

        dataResponse.bancos.map((bancos) => {
            var latLngs;
            var markerBounds;
            let uconbank = '../Content/img/bg/agencias.png'
            switch (bancos.icon) {
                case "atm":
                    uconbank = '../Content/img/bg/atm.png'
                    break;
                case "mlf":
                    uconbank = '../Content/img/bg/mtf.png'
                    break;
                case "bdb":
                    uconbank = '../Content/img/bg/bdb.png'
                    break;
                case "atb":
                    uconbank = '../Content/img/bg/autobanco.png'
                    break;
                default:
                // code block
            }

            let myIconI = L.icon({
                iconUrl: uconbank,
                iconSize: [30, 30],
                iconAnchor: [22, 30],
                popupAnchor: [-3, -30],
                shadowSize: [40, 30],
                shadowAnchor: [22, 30]
            });
            var marker = L.marker([bancos.latitud, bancos.longitud], { icon: myIconI, id: 1 });
            // y una funciona para cada marker que abre el modal pero antes cambiando el texto de los p
            marker.on('click', function (evt) {
                let uconbank = '../Content/img/bg/agenciasS.png'
                switch (bancos.icon) {
                    case "atm":
                        uconbank = '../Content/img/bg/atmS.png'
                        break;
                    case "mlf":
                        uconbank = '../Content/img/bg/mtfS.png'
                        break;
                    case "bdb":
                        uconbank = '../Content/img/bg/bdbS.png'
                        break;
                    case "atb":
                        uconbank = '../Content/img/bg/autobancoS.png'
                        break;
                    default:
                    // code block
                }

                let myIconI = L.icon({
                    iconUrl: uconbank,
                    iconSize: [50, 50],
                    iconAnchor: [22, 30],
                    popupAnchor: [-3, -30],
                    shadowSize: [40, 30],
                    shadowAnchor: [22, 30]
                });
                evt.target.setIcon(myIconI);
                //document.getElementById("titleDrawer").innerHTML = bancos.name
                //if (bancos.img != 'HTTP') {
                //    document.getElementById("localImage").src = bancos.img;
                //    document.getElementById("localImage").style.display = "flex";
                //} else {
                //    document.getElementById("localImage").style.display = "none";
                //}
                document.getElementById("localnames").innerHTML = bancos.name
                document.getElementById("localType").innerHTML = bancos.TipoNegocio
                document.getElementById("AgType").innerHTML = bancos.tipo
                //document.getElementById("localOwn").innerHTML = bancos.name
                //document.getElementById("localPhone").innerHTML = bancos.Celular
                document.getElementById("localDir").innerHTML = bancos.direccion
                //document.getElementById("localProv").innerHTML = dataResponse.provincia
                document.getElementById("localCity").innerHTML = bancos.Canton
                //document.getElementById("localPar").innerHTML = bancos.Parroquia
                document.getElementById("localLat").innerHTML = bancos.latitud
                document.getElementById("localLong").innerHTML = bancos.longitud
                document.getElementById("localHorarioL").innerHTML = bancos.LV;
                document.getElementById("localHorariosS").innerHTML = bancos.S;
                document.getElementById("localHorariosD").innerHTML = bancos.D;
                let ilv = ""

                var res = Service(bancos.icon);

                var _servicio = res

                _servicio.map((ser) => {
                    lis = "";
                    ser.caract.map((cart) => {
                        lis += "<li style='display: none; padding-left: 30px;'> -" + cart.caract + "</li>"

                    })
                    if (lis !== "")
                        ilv += "<ul class='ulServ' onclick= 'openli(this)'>  <img src='../Content/img/Ellipse1.png'  class='ElipLis'/>" + ser.servicio + "<img src='../Content/img/VectorArriba.png'  class='ElipLisV'/>" + lis + "</ul>"
                    if (lis === "")
                        ilv += "<ul class='ulServ' onclick= 'openli(this)'>  <img src='../Content/img/Ellipse1.png'  class='ElipLis'/>" + ser.servicio + "</ul>"
                })
                document.getElementById("idUSerc").innerHTML = ilv;
                if (bancos.icon === "bdb") {

                    var elembb = document.getElementById('bgb')
                    var elembg = document.getElementById('bbb')
                    var elemsec = document.getElementById('idsehorario')
                    elemsec.style.display = "none";
                    elembb.style.display = "none";
                    elembg.style.display = "flex";
                } else {

                    var elembb1 = document.getElementById('bgb')
                    var elembg1 = document.getElementById('bbb')
                    var elemsec1 = document.getElementById('idsehorario')
                    elemsec1.style.display = "block";
                    elembb1.style.display = "flex";
                    elembg1.style.display = "none";
                }
                latLngs = [marker.getLatLng()];
                markerBounds = L.latLngBounds(latLngs);
                console.log(markerBounds)
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
    //alert('Se han denegado permisos de ubicación, active para acceder');
    let latitude = -0.002247;
    let longitude = -78.458078;

    var myIcon = L.icon({
        iconUrl: '../Content/img/myLocation.png',
        iconSize: [50, 50],
        iconAnchor: [22, 50],
        popupAnchor: [-3, -50],
        shadowSize: [68, 50],
        shadowAnchor: [22, 50]
    });
    var marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(mymap);
    marker.bindPopup('Estas aquí').openPopup();
    marker.on('click', function (evt) {
        var latLngs = [marker.getLatLng()];
        var markerBounds = L.latLngBounds(latLngs);
        mymap.fitBounds(markerBounds);
    })
    myLocationMarker = marker
    //  var latLngs = [marker.getLatLng()];
    // var markerBounds = L.latLngBounds(latLngs);
    mymap.setView([latitude, longitude], 14);
}

function error2() {
    let latitude = -1.4595837;
    let longitude = -78.3308247;

    var myIcon = L.icon({
        iconUrl: '../Content/img/myLocation.png',
        iconSize: [50, 50],
        iconAnchor: [22, 50],
        popupAnchor: [-3, -50],
        shadowSize: [68, 50],
        shadowAnchor: [22, 50]
    });
    var marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(mymap);
    marker.bindPopup('Estas aquí').openPopup();
    marker.on('click', function (evt) {
        var latLngs = [marker.getLatLng()];
        var markerBounds = L.latLngBounds(latLngs);
        mymap.fitBounds(markerBounds);
    })
    myLocationMarker = marker
    //  var latLngs = [marker.getLatLng()];
    // var markerBounds = L.latLngBounds(latLngs);
    mymap.setView([latitude, longitude], 6);
}

function permiso(_model) {
    data_engine = [];
    data_engine = _model
    //se debe  poner en negado la siguiente función
    if (window.location !== window.parent.location) {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => successEmbeeded(position), error);

        } else {
            console.log("Geolocation is not supported by this browser.");
        }

    }
    else {

        let mymap = initializarMapa();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => success(position, mymap), error2);

            var contentRequestPermisson = document.getElementById('contentRequestPermisson')
            contentRequestPermisson.style.display = "none"

            //var myLocationButton = document.getElementById('getNearest')
            //myLocationButton.style.display = "flex";

            //var myLocationButton = document.getElementById('getMyLocation')
            //myLocationButton.style.display = "flex";

        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
}

function errorModal() {
    let cargando = document.getElementById('cargando')
    let contenido = document.getElementById('modalContent')
    //let imagen = document.getElementById('imgCargando')
    var waux = screen.width;

    cargando.style.paddingLeft = "40%"

    if (waux > 550) {
        cargando.style.paddingTop = "5%"
    } else {
        cargando.style.paddingTop = "50%"
        //imagen.width = "30%"
        //imagen.height = "20%"
    }
    console.log("SOY PRIMERO Wiload");
    contenido.style.width = "80%";

    var mobil = whatMobile();
    if (isMobile()) {
        if (mobil == "ios") {modal.style.paddingInlineEnd = "25%"; }
        else if (mobil == "android") { modal.style.paddingInlineEnd = "20%"; }
        }

    modal.style.display = "block";
}

function successModal() {
    let cargando = document.getElementById('cargando')
    var waux = screen.width;

    cargando.style.paddingLeft = "30%"

    if (waux > 550) {
        cargando.style.paddingTop = "5%"
    } else {
        cargando.style.paddingTop = "50%"
    }
    modal.style.display = "none";
    GetGeo();
    LoadMap();
    WiLoad2();
    mapbgmm3.click();
}

function GetGeo() {

    //se debe  poner en negado la siguiente función
    if (window.location !== window.parent.location) {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => InitGeo(position), error);

        } else {
            console.lo("Geolocation is not supported by this browser.");
        }
    }
    else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => InitGeo(position), error);
        } else {
            console.lo("Geolocation is not supported by this browser.");
        }
    }
}
function InitGeo(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    localStorage.setItem("Lat", latitude);
    localStorage.setItem("lng", longitude);
}
function changedata(_model) {
    data_engine = [];
    data_engine = _model
    //se debe  poner en negado la siguiente función
    if (window.location !== window.parent.location) {
        let mymap = ReolizarMapa();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => success(position, mymap), error);

            let contentRequestPermisson = document.getElementById('contentRequestPermisson')
            contentRequestPermisson.style.display = "none"
            //navigator.geolocation.getCurrentPosition((position) => successEmbeeded(position), error);

        } else {
            console.lo("Geolocation is not supported by this browser.");
        }

    }
    else {

        let mymap = ReolizarMapa();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => success(position, mymap), error);

            let contentRequestPermisson = document.getElementById('contentRequestPermisson')
            contentRequestPermisson.style.display = "none"

            //var myLocationButton = document.getElementById('getNearest')
            //myLocationButton.style.display = "flex";

            //var myLocationButton = document.getElementById('getMyLocation')
            //myLocationButton.style.display = "flex";

        } else {
            console.lo("Geolocation is not supported by this browser.");
        }
    }
}
function ReolizarMapa() {

    var elems = document.getElementById('markerSite');
    var elementAll = document.getElementById('allsites');

    clearRoutes()
    mymap.remove();
    mymap = L.map('mapid', {
        zoomControl: false
    }).setView([-1.591400, -79.002356], 100);

    L.control.zoom({ position: 'bottomright' }).addTo(mymap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Chariot - 2020' }).addTo(mymap);
    document.getElementById("listCollapsible").innerHTML = "";

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

        //var myIcon = L.icon({
        //    iconUrl: '../Content/img/atm.png',
        //    iconSize: [30, 30],
        //    iconAnchor: [22, 30],
        //    popupAnchor: [-3, -30],
        //    shadowSize: [40, 30],
        //    shadowAnchor: [22, 30]
        //});

        dataResponse.bancos.map((bancos) => {
            var latLngs;
            var markerBounds;
            let uconbank = '../Content/img/bg/agencias.png'
            switch (bancos.icon) {
                case "atm":
                    uconbank = '../Content/img/bg/atm.png'
                    break;
                case "mlf":
                    uconbank = '../Content/img/bg/mtf.png'
                    break;
                case "bdb":
                    uconbank = '../Content/img/bg/bdb.png'
                    break;
                case "atb":
                    uconbank = '../Content/img/bg/autobanco.png'
                    break;
                default:
                // code block
            }



            let myIconI = L.icon({
                iconUrl: uconbank,
                iconSize: [30, 30],
                iconAnchor: [22, 30],
                popupAnchor: [-3, -30],
                shadowSize: [40, 30],
                shadowAnchor: [22, 30]
            });
            var marker = L.marker([bancos.latitud, bancos.longitud], { icon: myIconI });
            myIconI = null
            // y una funciona para cada marker que abre el modal pero antes cambiando el texto de los p
            marker.on('click', function (evt) {
                let uconbank = '../Content/img/bg/agenciasS.png'
                switch (bancos.icon) {
                    case "atm":
                        uconbank = '../Content/img/bg/atmS.png'
                        break;
                    case "mlf":
                        uconbank = '../Content/img/bg/mtfS.png'
                        break;
                    case "bdb":
                        uconbank = '../Content/img/bg/bdbS.png'
                        break;
                    case "atb":
                        uconbank = '../Content/img/bg/autobancoS.png'
                        break;
                    default:
                    // code block
                }

                let myIconI = L.icon({
                    iconUrl: uconbank,
                    iconSize: [30, 30],
                    iconAnchor: [22, 30],
                    popupAnchor: [-3, -30],
                    shadowSize: [40, 30],
                    shadowAnchor: [22, 30]
                });
                evt.target.setIcon(myIconI);
                //document.getElementById("titleDrawer").innerHTML = bancos.name
                //if (bancos.img != 'HTTP') {
                //    document.getElementById("localImage").src = bancos.img;
                //    document.getElementById("localImage").style.display = "flex";
                //} else {
                //    document.getElementById("localImage").style.display = "none";
                //}
                // document.getElementById("localName").innerHTML = bancos.name
                document.getElementById("localnames").innerHTML = bancos.name;
                document.getElementById("localType").innerHTML = bancos.TipoNegocio
                document.getElementById("AgType").innerHTML = bancos.tipo
                //document.getElementById("localOwn").innerHTML = bancos.name
                //document.getElementById("localPhone").innerHTML = bancos.Celular
                document.getElementById("localDir").innerHTML = bancos.direccion
                //document.getElementById("localProv").innerHTML = dataResponse.provincia
                document.getElementById("localCity").innerHTML = bancos.Canton
                //document.getElementById("localPar").innerHTML = bancos.Parroquia
                document.getElementById("localLat").innerHTML = bancos.latitud
                document.getElementById("localLong").innerHTML = bancos.longitud
                document.getElementById("localHorarioL").innerHTML = bancos.LV;
                document.getElementById("localHorariosS").innerHTML = bancos.S;
                document.getElementById("localHorariosD").innerHTML = bancos.D;
                let ilv = ""

                var res = Service(bancos.icon);

                var _servicio = res

                _servicio.map((ser) => {
                    lis = "";
                    ser.caract.map((cart) => {
                        lis += "<li style='display: none; padding-left: 30px;'> -" + cart.caract + "</li>"

                    })
                    if (lis !== "")
                        ilv += "<ul class='ulServ' onclick= 'openli(this)'>  <img src='../Content/img/Ellipse1.png'  class='ElipLis'/>" + ser.servicio + "<img src='../Content/img/VectorArriba.png'  class='ElipLisV'/>" + lis + "</ul>"
                    if (lis === "")
                        ilv += "<ul class='ulServ' onclick= 'openli(this)'>  <img src='../Content/img/Ellipse1.png'  class='ElipLis'/>" + ser.servicio + "</ul>"
                })
                document.getElementById("idUSerc").innerHTML = ilv;
                if (bancos.icon === "bdb") {

                    var elembb = document.getElementById('bgb')
                    var elembg = document.getElementById('bbb')
                    var elemsec = document.getElementById('idsehorario')
                    elemsec.style.display = "none";
                    elembb.style.display = "none";
                    elembg.style.display = "flex";
                } else {

                    var elembb1 = document.getElementById('bgb')
                    var elembg1 = document.getElementById('bbb')
                    var elemsec1 = document.getElementById('idsehorario')
                    elemsec1.style.display = "block";
                    elembb1.style.display = "flex";
                    elembg1.style.display = "none";
                }
                latLngs = [marker.getLatLng()];
                markerBounds = L.latLngBounds(latLngs);
                console.log(markerBounds)
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
function zoomPunto(lat, lng) {
    //mymap.setZoom(24);
    //mymap.panTo(new L.LatLng(lat, lng));
    mymap.setView(new L.LatLng(lat, lng), 24);
   
 ///   mymap.ZoomToResolution(140, new L.LatLng(lat, lng));  
}
function zoomIN() {
  //  mymap.setZoom(24);
  

}
function Service(_tpo) {
    var datserv;

    $.ajax({
        url: "/Bancos/Servicios",
        type: 'POST',
        async: false,
        data: {
            tpo: _tpo
        },
        success: function (result) {

            datserv = result;

        },
        error: function () {

        }
    });

    return datserv;
}
