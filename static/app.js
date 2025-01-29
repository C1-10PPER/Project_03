
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

let baseMaps = {
    "Street": street,
    // "Satellite": satellite,
  };
// d3.csv("./Raw_Data/Annual_Surface_Temp_Change.csv").then((data) => {
//     console.log(data);
//     L.geoJson(data).addTo(myMap);
// });