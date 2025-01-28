var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// d3.csv("./Raw_Data/Annual_Surface_Temp_Change.csv").then((data) => {
//     console.log(data);
//     L.geoJson(data).addTo(myMap);
// });
