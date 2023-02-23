//Set up Map
var fireballMap = L.map("map", {
    center: [0, 0],
    zoom: 3
  });
 
// add map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(fireballMap);


//get data
d3.csv().then(function(data) {
  // Plot all coordinates
layer1 =   L.geoJson(data, {
    pointToLayer: formatMarkers,
    }).addTo(fireballMap);