document.addEventListener("DOMContentLoaded", function () {
    // Created a street tile layer
    let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // Created the map object with center and zoom options for global view
    var map = L.map('map', {
        center: [20, 0],  
        zoom: 2,         
        layers: [street]  
    });

    let heatLayer; 
    let currentYear = 2023; 

    // Function to create a heatmap
    function createHeatmap(data, year) {
        let heatData = [];

        data.forEach(row => {
            let lat = parseFloat(row.latitude);
            let lon = parseFloat(row.longitude);
            let tempChange = parseFloat(row[year]); 

            if (!isNaN(lat) && !isNaN(lon) && !isNaN(tempChange)) {
                heatData.push([lat, lon, tempChange]);
            }
        });

        console.log(`Heatmap Data for ${year}:`, heatData); 
        // Remove previous heat layer if it exists
        if (heatLayer) {
            map.removeLayer(heatLayer);
        }

        // Create new heatmap layer
        heatLayer = L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 5,
            max: 2,
            gradient: {
                0.2: "blue",
                0.5: "lime",
                0.8: "yellow",
                1.0: "red"
            }
        }).addTo(map);
    }

    // Load CSV data and create initial heatmap
    d3.csv("./Clean_Data/annual_surface_temp_change.csv").then((data) => {
        // Normalize quotes in data
        data.forEach(row => {
            for (let key in row) {
                if (row[key]) {
                    row[key] = row[key].replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
                }
            }
        });

        createHeatmap(data, currentYear); 
        // Function to add a floating year display and slider to the map
        function addYearSlider() {
            let sliderContainer = L.control({ position: "topright" });

            sliderContainer.onAdd = function () {
                let div = L.DomUtil.create("div", "year-slider");
                
                // Style adjustments for better visibility
                div.style.background = "rgba(255, 255, 255, 0.8)";
                div.style.padding = "15px";
                div.style.borderRadius = "10px";
                div.style.boxShadow = "0 0 8px rgba(0,0,0,0.4)";
                div.style.fontSize = "16px";
                div.style.textAlign = "center";

                // Create slider and floating year display
                div.innerHTML = ` 
                    <div id="yearDisplay" style="font-size: 20px; font-weight: bold; margin-bottom: 5px; color: #333;">
                        Year: <span id="yearValue">${currentYear}</span>
                    </div>
                    <input type="range" id="yearRange" min="1961" max="2023" step="1" value="${currentYear}" style="width: 200px;">
                `;

                // Add event listener to update heatmap and floating year display when scrolling
                let yearDisplay = div.querySelector("#yearValue");
                let slider = div.querySelector("#yearRange");

                slider.addEventListener("input", function (event) {
                    let selectedYear = event.target.value;

                    // Update floating year display with smooth transition
                    yearDisplay.style.opacity = "0.5";
                    setTimeout(() => {
                        yearDisplay.textContent = selectedYear;
                        yearDisplay.style.opacity = "1";
                    }, 150);

                    createHeatmap(data, selectedYear);
                });

                return div;
            };

            sliderContainer.addTo(map);
        }

        // Add the year slider to the map
        addYearSlider();

        // Function to add a legend
        function addLegend() {
            let legend = L.control({ position: "bottomright" });

            legend.onAdd = function () {
                let div = L.DomUtil.create("div", "info legend");
                div.style.background = "white";
                div.style.padding = "10px";
                div.style.borderRadius = "5px";
                div.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
                div.style.fontSize = "14px";
                div.innerHTML = ` 
                    <strong>Temperature Change</strong><br>
                    <i style="background: blue; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Cooling <br>
                    <i style="background: lime; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Stable <br>
                    <i style="background: yellow; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Warming <br>
                    <i style="background: red; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Extreme Warming
                `;
                return div;
            };

            legend.addTo(map);
        }

        // Add the legend to the map
        addLegend();

        // Add scale control
        L.control.scale({ position: 'bottomright' }).addTo(map);
    });
});
