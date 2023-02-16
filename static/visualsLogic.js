// Function for updating page when year is selected
function optionChanged(selected_year) {
    console.log(selected_year);

    // Read in fireball data with D3 library
    const url= "https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/fireball_data_years.csv";

    d3.csv(url).then(function(data) {
        console.log(data);


        // Coding to create charts can go here











    });


}

// Read in file
d3.csv("https://raw.githubusercontent.com/L-Nash/Project-3-/main/Resources/fireball_data_years.csv").then(function(data) {
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
