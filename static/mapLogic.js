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
   createMarkers(data)
 });

 
// Function to get average values of each data category
function getAverageIE (data) {
    var Impactenergy = 0.0
    var veloc = 0.0
    var Radiateden = 0.0
    var Alt_titude  = 0.0

    //loop through data to increase value of data category
    for (var i=0; i<data.length; i++) {
        Impactenergy = Impactenergy + (+data[i]['Calculated Total Impact Energy (kt)']);
        veloc = veloc + (+data[i]['Velocity (km/s)'])
        Radiateden = Radiateden + (+data[i]['Total Radiated Energy (J)'])
        Alt_titude = Alt_titude + (+data[i]['Altitude (km)'])
       
    }  
    // Calculate averages 
    averageIE = Impactenergy/data.length;
    averageRE = Radiateden/data.length;
    averageVe = veloc/data.length;
    averageAlt = Alt_titude/data.length;
    

}

function createMarkers(data) {

    var markers = [];

    // Create empty marker lists to filter by decades
    var radEn = [];
    var alt   = [];
    var vel = []; 
    var imEn = [];
    var tenYear = [];
    // console.log(radEn)

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
        // console.log(velo)
        // Retrieve just the year from the date value
        var dYear = date.getFullYear();
        // console.log(dYear)
        //calculate above above average values
        var aboveAveIE = (+fireball['Calculated Total Impact Energy (kt)']) > averageIE;
        var aboveAverageRE = (+fireball['Total Radiated Energy (J)']) > averageRE;
        var aboveAverageVe = (+fireball['Velocity (km/s)']) > averageVe;
        var aboveAverageAlt = (+fireball['Altitude (km)']) > averageAlt;

        //limiting data to 2012 - 2022 so maps are easier to view
        // Marker details to all sightings layer. Radius is larger of fireball has above average readings in all categories
            if (dYear >= 2012 && dYear <= 2022) {
                if(aboveAveIE && aboveAverageRE &&  aboveAverageAlt && aboveAverageVe) 
                    radius = 10, 
                    fillOpacity = 1;
                else 
                    radius = 4, 
                    fillOpacity = 1;
            var marker = L.circleMarker(location, {
                radius: radius,
                fillColor: getColor(dYear),
                color: getColor(dYear),
                weight: 1,
                opacity: 1,
                fillOpacity: fillOpacity})
            .bindPopup("<p>" + date + "</p> <hr> <p>Location: " + Lat + ", " + Lng 
            + "</p><p>Altitude): " + altt + "</p>"
            + "</p><p>Calculated Impact: " + energyIM + "</p>"
            + "</p><p>Total Radiated Energy (J): " + energy + "</p>"
            + "</p><p>Velocity: " + velo + "</p>");
            tenYear.push(marker);
            }

            // Set marker for each data category. limit datapoints to 2012-2022. 
            if ((dYear >= 2012 && dYear <= 2022) && altt!=='') {
             var marker = L.circleMarker(location, {
                radius:5,
                fillColor: "#54278f",
                color: "#54278f",
                weight: 1,
                opacity: 1,
                fillOpacity: altt/60 })
                .bindPopup("<p><h4>Altitude): " + altt + "</h4></p> <hr> <p>Location: " + Lat + ", " + Lng );
                alt.push(marker);
            }
            
            //radiated energy
            if ((dYear >= 2012 && dYear <= 2022) && energy!=='') {
            var marker = L.circleMarker(location, {
                radius:5,
                fillColor: "#253494",
                color: "#2c7fb8",
                weight: 1,
                opacity: 1,
                fillOpacity: energy/500000000000})
                .bindPopup("<p><h4>Total Radiated Energy (J): " + energy + "</h4></p> <hr> <p>Location: " + Lat + ", " + Lng );
                radEn.push(marker);
            }
            //Velocity
            if ((dYear >= 2012 && dYear <= 2022) && velo!=='') {
                 var marker = L.circleMarker(location, {
                    radius:5,
                    fillColor: "#a50f15",
                    color: "#fb6a4a",
                    weight: 1,
                    opacity: 1, 
                    fillOpacity: velo/35})
                    .bindPopup("<p><h4>Velocity: " + velo + "</h4></p> <hr> <p>Location: " + Lat + ", " + Lng );
                    vel.push(marker);
            }
            //Impact Energy
            if ((dYear >= 2012 && dYear <= 2022) && energyIM!=='') {
            var marker = L.circleMarker(location, {
                radius:5,
                fillColor: "#006d2c",
                color: "#006d2c",
                weight: 1,
                opacity: 1,
                fillOpacity: energyIM})
                .bindPopup("<p><h4>Calculated Impact: "+ energyIM + "</h4></p> <hr> <p>Location: " + Lat + ", " + Lng );
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
    var street =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    
    var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
        maxZoom: 8
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





function getColor(yr){
if (yr >= 2012 && yr < 2017)
    return "#c51b8a"; 
else 
    return "#7a0177";

}

