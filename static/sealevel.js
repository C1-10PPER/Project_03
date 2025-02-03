document.addEventListener("DOMContentLoaded", function () {
    // Created a street tile layer
    let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // Created a satellite tile layer as a second background of the map
    let satellite = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors, Humanitarian OpenStreetMap Team'
    });

    // Created the map object with center and zoom options
    var map = L.map('map', {
        center: [20, 0], 
        zoom: 2, 
        layers: [street] 
    });

    // Created base maps and overlays for control
    let baseMaps = {
        "Street": street,
        "Satellite": satellite
    };

    // Added layer control to the map that will allow the user
    // to change which layers are visible
    L.control.layers(baseMaps).addTo(map);

    // Set the Latitude and Longitude coordinates for each sea/ocean. 
    const locationCoords = {
        "Andaman Sea": [10.0, 95.0],
        "Arabian Sea": [15.0, 65.0],
        "Atlantic Ocean": [0.0, -30.0],
        "Baltic Sea": [58.0, 20.0],
        "Bay Bengal": [15.0, 90.0],
        "Bering Sea": [58.0, -175.0],
        "Black Sea": [44.0, 35.0],
        "Caribbean Sea": [15.0, -75.0],
        "Gulf of Mexico": [25.0, -90.0],
        "Indian Ocean": [-20.0, 80.0],
        "Mediterranean Sea": [35.0, 18.0],
        "North Sea": [56.0, 3.0],
        "Pacific Ocean": [0.0, -140.0],
        "Red Sea": [20.0, 40.0],
        "South China Sea": [12.0, 115.0]
    };

    // Declared an array for storing map circle markers, 
    // dates, and sea level data grouped by date. 
    let circles = []; 
    let dates = []; 
    let dataByDate = {}; 

    // Loaded and processed CSV data containing sea level changes
    d3.csv("./Raw_Data/Change_in_Mean_Sea_Levels.csv").then((data) => {
        let dateSet = new Set(); // Use Set to ensure unique dates

        data.forEach(row => {
            let sea = row.Measure; // Extract sea name
            let value = parseFloat(row.Value); // Parse sea level change value
            let date = row.Date; // Extract date

            // Checked if sea exists in the predefined coordinates and value is valid
            if (locationCoords[sea] && !isNaN(value)) {
                if (!dataByDate[date]) {
                    dataByDate[date] = []; // Initialized array for the date
                    dateSet.add(date); // Stored unique date
                }
                // Stored sea level data for the given date
                dataByDate[date].push({ sea, value });
            }
        });

        // Converted Set to sorted array (sorted in ascending order)
        dates = Array.from(dateSet).sort((a, b) => new Date(a) - new Date(b));

        console.log("Sorted Dates:", dates); // Debugging log to check sorted dates

        updateMap(dates[0]); // Initialized the map with the first date's data
        createSlider(); // Created a slider to navigate through dates
    });

    // Created a function to update the map with sea level data for a specific date
    function updateMap(date) {
        // Removed previous circles from the map
        circles.forEach(circle => map.removeLayer(circle));
        circles = [];

        if (dataByDate[date]) {
            dataByDate[date].forEach(entry => {
                let coords = locationCoords[entry.sea]; // Get sea coordinates
                let circle = L.circle(coords, {
                    color: entry.value > 0 ? "blue" : "green", // Blue for increase, green for decrease
                    fillColor: entry.value > 0 ? "blue" : "green",
                    fillOpacity: 0.5,
                    radius: Math.abs(entry.value) * 5000 // Scale circle size by sea level change
                }).addTo(map);
                
                // Added popup with sea level change information
                circle.bindPopup(`<b>${entry.sea}</b><br>Change: ${entry.value} mm`);
                circles.push(circle);
            });
        }
    }

    // Created a function to scroll through the data visualization over time
    function createSlider() {
        if (dates.length === 0) return; // Ensure there are valid dates

        // Created a container for the slider
        let sliderContainer = document.createElement("div");
        sliderContainer.style.position = "absolute";
        sliderContainer.style.bottom = "20px";
        sliderContainer.style.left = "50%";
        sliderContainer.style.transform = "translateX(-50%)";
        sliderContainer.style.zIndex = "1000";
        sliderContainer.style.background = "white";
        sliderContainer.style.padding = "10px";
        sliderContainer.style.borderRadius = "8px";
        sliderContainer.style.display = "flex";
        sliderContainer.style.flexDirection = "column";
        sliderContainer.style.alignItems = "center";

        // Created the range input (slider)
        let slider = document.createElement("input");
        slider.type = "range";
        slider.min = 0;
        slider.max = dates.length - 1;
        slider.value = 0;
        slider.id = "date-slider";
        slider.style.width = "300px";

        // Created a label to display the selected date
        let label = document.createElement("div");
        label.id = "date-label";
        label.innerText = dates[0];

        // Created an event listener to update the map and label as the slider moves
        slider.addEventListener("input", function () {
            let date = dates[this.value]; // Get selected date from array
            label.innerText = date; // Update label
            // console.log("Selected Date:", date); // Debugging log
            updateMap(date); // Update map with new data
        });

        // Appended the label and slider to the container, then add to document body
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(slider);
        document.body.appendChild(sliderContainer);
    }
// Created a function to add a legend to the map
function addLegend() {
    let legend = L.control({ position: "bottomleft" }); // Position at bottom left

    legend.onAdd = function (map) {
        let div = L.DomUtil.create("div", "info legend"); // Create div properly
        div.style.background = "white";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        div.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
        div.style.fontSize = "14px";
        div.innerHTML = `
            <strong>Sea Level Change</strong><br>
            <i style="background: blue; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Increase <br>
            <i style="background: green; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Decrease
        `;
        return div;
    };

    legend.addTo(map);
}

// Called the function to add the legend
addLegend();
    // Added scale control to the bottom-right corner of the map
    L.control.scale({ position: 'bottomright' }).addTo(map);
});