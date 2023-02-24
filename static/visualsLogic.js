// Function for updating page when year is selected
function optionChanged(selected_year) {
    console.log(selected_year);

    // Read in fireball data with D3 library
    const url= "https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/fireball_sqlite.csv";

    d3.csv(url).then(function(data) {
        console.log(data);

        // Coding to create charts can go here
        
        
        // Create variables for Total Radiated Energy and Altitude
        var totalEnergy = [];
        var altitude = [];

        // Assign data to fireball variable
        // If selected year from dropdown = year for data row, get values for columns
        for (var i = 0; i<data.length; i++) {
            var fireball = data [i];

            if (fireball['year'] == selected_year) {
                totalEnergy.push(fireball['Total Radiated Energy (J)']);
                altitude.push(fireball['Altitude (km)'])
            }

        }


        // Altitude - Total Radiated Energy corrleation plot setup
        var altEnergyScatter = [{
            x: altitude,
            y: totalEnergy,
            text: altitude,
            type: 'scatter',
            mode: "markers",
            marker: {
            //    color: [35, 10, 50, 40, 18, 30, 60],
                size: 14,
            //    sizemode: 'area',
            color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
            }
        }];


        // Chart layout 
        var layout_A = {
            xaxis: {title: "Altitude (km)"},
            yaxis: {title: "Total Radiated Energy (J)"},
            title: "Do Fireballs Have the Higher Total Radiated Energy at Certain Altitudes?",
            width: 800,
        };

        // Plot chart
        Plotly.newPlot("chart1", altEnergyScatter, layout_A);


        // Next section of coding here

    });


}

// Year dropdown setup
// Read in file
d3.csv("https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/fireball_year_count.csv").then(function(data) {
    console.log(data);

    var dropdownMenu = d3.select("#selDataset");

    // Create elements for each year 
    for (var i=0; i<data.length; i++) {
        var entry = data[i];
        dropdownMenu.append("option").text(entry['year']);
    }
    
    // Set default plots
    optionChanged("2023");

});
