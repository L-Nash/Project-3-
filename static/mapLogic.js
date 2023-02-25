// Store URL
const url = "https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/fireball_sqlite.csv";

var averageIE = 0.0;
var averageVe = 0.0;
var averageRE = 0.0;
var averageAlt = 0.0;
// Read in fireball data with D3 library
d3.csv(url).then(function(data){
    console.log(data)
   getAverageIE(data)
    createMarkers(data);
});
function getAverageIE (data) {
    var Impactenergy = 0.0
    var veloc = 0.0
    var Radiateden = 0.0
    var Alt_titude  = 0.0

    for (var i=0; i<data.length; i++) {
        Impactenergy = Impactenergy + (+data[i]['Calculated Total Impact Energy (kt)']);
        veloc = veloc + (+data[i]['Velocity (km/s)'])
        Radiateden = Radiateden + (+data[i]['Total Radiated Energy (J)'])
        Alt_titude = Alt_titude + (+data[i]['Altitude (km)'])
       
    }   
    averageIE = Impactenergy/data.length;
    averageRE = Radiateden/data.length;
    averageVe = veloc/data.length;
    averageAlt = Alt_titude/data.length;
    

}

// function setRadius (data, i, IE) {
//     var list = data[IE].sort();
//      var newList = list.slice(10);
//  // compare value to new list to see if they match
//  for (var i=0; i<newList.length; i++) {
//      row = newlist[i];
//  if (row[IE] = data[IE])
//   return 10
//   else return 5};
 
//  }

function createMarkers(data) {

    var markers = [];

    // Create empty marker lists to filter by decades
    var radEn = [];
    var alt   = [];
    var vel = []; 
    var imEn = [];
    var tenYear = [];
    console.log(radEn)

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
        var velo = fireball['Velocity (km/s)'];
        var altt = fireball['Altitude (km)'];
        // Retrieve just the year from the date value
        var dYear = date.getFullYear();
        var aboveAveIE = (+fireball['Calculated Total Impact Energy (kt)']) > averageIE;
        var aboveAverageRE = (+fireball['Total Radiated Energy (J)']) > averageRE;
        var aboveAverageVe = (+fireball['Velocity (km/s)']) > averageVe;
        var aboveAverageAlt = (+fireball['Altitude (km)']) > averageAlt;


        // Marker details according to year
            if (dYear >= 2012 && dYear <= 2022) {
                if(aboveAveIE + aboveAverageRE + aboveAverageAlt +aboveAverageVe) 
                    radius = 10; 
                else 
                    radius = 4;
            var marker = L.circleMarker(location, {
                radius: radius,
                fillColor: "green",
                color: "green",
                weight: 1,
                opacity: 1,
                fillOpacity: .5})
            .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
            + energy + "</p>");
            tenYear.push(marker);
            }

            if (dYear >= 2012 && dYear <= 2022) {
            var marker = L.circleMarker(location, {
                // radius:energy/50000000000000,
                fillColor: "white",
                color: "white",
                weight: 1,
                opacity: 1,
                fillOpacity: altt/10})
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            alt.push(marker);
            }
     
            if ((dYear >= 2012 && dYear <= 2022)) {
            var marker = L.circleMarker(location, {
                // radius:energy/50000000000000,
                fillColor: "red",
                color: "red",
                weight: 1,
                opacity: 1,
                fillOpacity: energy/500000000000})
            .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            radEn.push(marker);
            }
       
            if ((dYear >= 2012 && dYear <= 2022)) {
            var marker = L.circleMarker(location, {
                // radius:energy/50000000000000,
                fillColor: "yellow",
                color: "yellow",
                weight: 1,
                opacity: 1,
                fillOpacity: velo})
                .bindPopup("<p>Date: " + date + "</p><p>Location: " + Lat + ", " + Lng + "</p><p>Total Radiated Energy (J): " 
                    + energy + "</p>");
            vel.push(marker);
            }
            

            if ((dYear >= 2012 && dYear <= 2022) && energyIM >= .2) {
            var marker = L.circleMarker(location, {
            fillColor: "purple",
            color: "purple",
            weight: 1,
            opacity: 1,
            fillOpacity: energyIM})
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
    var street =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
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
        "All Sightings 2012-2022": markerLayers[0],
        "Altitude": markerLayers[1],
        "Calculated Total Impact Energy": markerLayers[4],
        "Total Radiated Energy": markerLayers[2],
        "Velocity": markerLayers[3],        
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