// Store URL
const url = "https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/cneos_fireball_data.csv";

// Read in fireball data with D3 library
d3.csv(url).then(function(data){

    createMarkers(data);
});

function createMarkers(data) {

    var markers = [];

    // Create empty marker lists to filter by decades
    var year90s = [];
    var year00s = [];
    var year10s = []; 
    var year20s = [];

    // Loop to get data for each record
    for (var i=0; i<data.length; i++) {

        // Store data from record
        var fireball = data[i];
        var latitude;
        var longitude;
       
        // Pull values from columns
        Lat = fireball['Latitude (deg.)'];
        Lng = fireball['Longitude (deg.)'];

        // Try catch to split geoetic markers
        try {
            
            // Remove end value (directional marker) and store as a variable
            latDm = Lat.slice(-1);
            lngDm = Lng.slice(-1);

            // Store just the numeric values 
            numLat = Number(Lat.slice(0,-1));
            numLng = Number(Lng.slice(0,-1));
        }
        catch (exception) {
            // Exit if exception encountered
            break; 
        }


        // Get negative value according to directional marker
        if (lngDm == "W") {
            longitude = numLng * -1;
        }
        else {longitude = numLng;}

        if (latDm == "S") {
            latitude = numLat * -1;
        }
        else {latitude = numLat;}
        
        

        // Popup text variables
        var date = (new Date(fireball['Peak Brightness Date/Time (UT)']));
        var location = [latitude, longitude];
        var energy = fireball['Total Radiated Energy (J)'];

        // Retrieve just the year from the date value
        var dYear = date.getFullYear();

        // Marker details according to year
        if (dYear <= 1999) {
            var marker = L.marker(location, {icon: goldIcon})
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            year90s.push(marker);
        }
        else if (dYear >= 2000 && dYear < 2010) {
            var marker = L.marker(location, {icon: greenIcon})
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            year00s.push(marker);
        }
        else if (dYear >= 2010 && dYear < 2020) {
            var marker = L.marker(location, {icon: violetIcon})
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            year10s.push(marker);
        }
        else if (dYear >= 2020) {
            var marker = L.marker(location, {icon: redIcon})
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            year20s.push(marker);
        }
    }

    // Create marker layers then store into array
    var year90L = L.layerGroup(year90s);
    var year00L = L.layerGroup(year00s);
    var year10L = L.layerGroup(year10s);
    var year20L = L.layerGroup(year20s);

    // Store all layers into a single array
    var markerLayers = [year90L, year00L, year10L, year20L];


    createMap(markerLayers);
}

// Function to create map
function createMap(markerLayers) {

    // Create the base layers
    // Street map and topographic map
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
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
