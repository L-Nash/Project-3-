//Set up Map
var fireballMap = L.map("map", {
    center: [0, 0],
    zoom: 3
  });
 
// add map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(fireballMap);

// var csv= "https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/cleaned_fireball_data.csv";

var csv = "Resources/fireball_dropna.csv"


// // //get data
d3.csv(csv).then(function(data) {
layer1 =   L.geoJson(data, {
    pointToLayer: createMarkers(data),
    }).addTo(fireballMap); 


 L.marker([33.1, 173.7]).addTo(fireballMap);
 
var long = data['Longitud (dg.)'];
var lat = data['Latitude (deg.)'];

function createMarkers(data, latlng) {
        console.log(data);
          return L.circleMarker([latlng]).bindPopup("hello");

};


});

// d3.csv(csv).then(function(data) {

// // var long = data['Longitud (dg.)'];
// // var lat = data['Latitude (deg.)'];

// for (var i = 0; i < data.length; i++) {
//   layer1 =   L.geoJson(data, {
//   L.marker(latlng, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
    
//     radius: 10
//   }).addTo(fireballMap)};

// }

// });







    createMap(markerLayers);
}

// Function to create map
function createMap(markerLayers) {

    // Create the base layers
    // Street map and topographic map
    var street = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });

    var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Create a baseMaps object
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    // Create object to hold marker overlay
    var overlayMaps = {
        "1988 - 1999": markerLayers[0],
        "2000 - 2009": markerLayers[1],
        "2010 - 2019": markerLayers[2],
        "2020 - 2023": markerLayers[3]
    };
    
    // Create the map object
    var fireballMap = L.map("map", {
        center: [0.00, 0.00],
        zoom: 2,
        layers: [street, markerLayers[0]]
    }); 

    console.log(fireballMap);

    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(fireballMap); 

    return fireballMap;
}
