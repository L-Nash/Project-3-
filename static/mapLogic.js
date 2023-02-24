// Store URL
const url = "https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/fireball_sqlite.csv";

// Read in fireball data with D3 library
d3.csv(url).then(function(data){
    console.log(data)
    createMarkers(data);
});

function createMarkers(data) {

    var markers = [];

    // Create empty marker lists to filter by decades
    var radEn = [];
    var alt   = [];
    var vel = []; 
    var imEn = [];
    var tenYear = [];

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
        var energyIM = fireball['Calculated Total Impact Energy (kt)'];
        var velo = fireball['Velocity (km/s'];
        // Retrieve just the year from the date value
        var dYear = date.getFullYear();

        // Marker details according to year
            if (dYear >= 2013) {
            var marker = L.circleMarker(location)
            .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
            + energy + "</p>");
            tenYear.push(marker);
            }

            if (dYear >=2013) {
            var marker = L.circleMarker(location)
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            alt.push(marker);
            }
     
            if (dYear >= 2013 && energy >= 500000000000) {
            var marker = L.circleMarker(location, {
                // radius:energy/50000000000000,
                fillColor: "red",
                color: "red",
                weight: 1,
                opacity: 1,
                fillOpacity: energy/5000000000000
            }).bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            radEn.push(marker);
            }
       
            if (dYear >= 2013 && velo >= 500) {
            var marker = L.circleMarker(location)
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            vel.push(marker);
            }
            
            if (dYear >= 2013 && energyIM >= .7) {
            var marker = L.circleMarker(location)
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            imEn.push(marker);
            }


    // Create marker layers then store into array
    var All = L. layerGroup(tenYear);
    var Altitude = L.layerGroup(alt);
    var Total_RE= L.layerGroup(radEn);
    var Velocity = L.layerGroup(vel);
    var Total_IE = L.layerGroup(imEn);
     

    // Store all layers into a single array
    var markerLayers = [All, Altitude, Total_RE, Velocity, Total_IE];
    }

    createMap(markerLayers);
}

// Function to create map
function createMap(markerLayers) {

    // Create the base layers
    // Street map and topographic map
    var street =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16
    });
    
    var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Create a baseMaps object
    var baseMaps = {
        "World Map": street,
        "Topographic Map": topo
    };

    // Create object to hold marker overlay
    var overlayMaps = {
        "All Sightings 2013-2023": markerLayers[4],
        "High Altitude": markerLayers[0],
        "High Velocity": markerLayers[1],
        "High Total Radiated Energy": markerLayers[2],
        "High Total Impact Energy": markerLayers[3],
         
    };
    
    // Create the map object
    var fireballMap = L.map("map", {
        center: [0.00, 0.00],
        zoom: 2,
        layers: [street, markerLayers[0]]
    }); 

//     console.log(fireballMap);

    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(fireballMap); 

    return fireballMap;
}
