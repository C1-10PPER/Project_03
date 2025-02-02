

// // Created a street tile layer.
// let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// })
// // Created a satellite tile layer as a second background of the map
// // let satellite = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
// //     attribution: '© OpenStreetMap contributors, Humanitarian OpenStreetMap Team'
// //   });

// // Created the map object with center and zoom options.
// var map = L.map('map', {
//     center: [20, 0],
//     zoom: 2,
//     layers: [street]
// });

// street.addTo(map);



// // d3.csv("./Raw_Data/Annual_Surface_Temp_Change.csv").then((data) => {
// //     console.log(data);
// //     L.geoJson(data).addTo(myMap);
// // });

var baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '...',
    maxZoom: 18
  });

  var map = L.map('map', {
    center: [25.6586, -80.3568],
    zoom: 4,
    layers: [baseLayer]
  });

  var testData = [
    [24.6408, 46.7728, 3],  // [latitude, longitude, intensity]
    [50.75, -1.55, 1]
  ];

  var heat = L.heatLayer(testData, {
    radius: 25,
    blur: 15,
    maxZoom: 5
  }).addTo(map);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> 78d0bc6ab714be1553d230b9d48d18f5208aacc2
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
