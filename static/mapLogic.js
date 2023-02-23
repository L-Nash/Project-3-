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







