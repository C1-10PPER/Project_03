
// Created a street tile layer.
let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
// Created a satellite tile layer as a second background of the map
// let satellite = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//     attribution: '© OpenStreetMap contributors, Humanitarian OpenStreetMap Team'
//   });

// Created the map object with center and zoom options.
var map = L.map('map', {
    center: [20, 0],
    zoom: 2,
    layers: [street]
});

street.addTo(map);

// Function to handle dropdown change
function handleDropdownSelection(selectedOption) {
    if (selectedOption === "Climate Change") {
        // Example: Display relevant data on the map
        console.log("Selected Climate Change");
        // Add related map layers, markers, or data visualization here
    } else if (selectedOption === "CO2 Emission") {
        // Example: Display CO2 emission data
        console.log("Selected CO2 Emission");
        // Update map with CO2 emission data
    } else if (selectedOption === "Sea Level Change") {
        // Example: Display sea level change data
        console.log("Selected Sea Level Change");
        // Update map with sea level change data
    } else if (selectedOption === "Climate Related Disaster") {
        // Example: Display disaster-related data
        console.log("Selected Climate Related Disaster");
        // Update map with climate-related disaster data
    } else if (selectedOption === "Illness Related to Pollution") {
        // Example: Display illness data related to pollution
        console.log("Selected Illness Related to Pollution");
        // Update map with illness-related data
    }
}

// Event listener to handle dropdown change
$(document).ready(function () {
    $('.dropdown-menu li a').click(function (event) {
        // Get the selected option text
        let selectedOption = $(this).text();
        
        // Call the function with the selected option
        handleDropdownSelection(selectedOption);
    });
});
// d3.csv("./Raw_Data/Annual_Surface_Temp_Change.csv").then((data) => {
//     console.log(data);
//     L.geoJson(data).addTo(myMap);
// });