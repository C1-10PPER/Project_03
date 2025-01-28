let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// d3.csv("./Raw_Data/Annual_Surface_Temp_Change.csv").then((data) => {
//     console.log(data);
//     L.geoJson(data).addTo(myMap);
// });
