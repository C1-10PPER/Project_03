document.addEventListener("DOMContentLoaded", function () {
    let countryDropdown = document.getElementById("country");
    let disasterContainer = document.getElementById("disaster-container");
    let yearSlider = document.getElementById("year");
    let yearLabel = document.getElementById("yearLabel");
    let chartContainer = document.getElementById("chart");
    let noDataMessage = document.getElementById("no-data-message");
    let chart = echarts.init(chartContainer);

    let dataByCountry = {};
    let allDisasters = new Set();
    let dates = [];

    // Assigned unique color mapping for disasters
    const disasterColors = [
        "#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6", "#e67e22", "#34495e",
        "#1abc9c", "#d35400", "#c0392b", "#7f8c8d", "#8e44ad", "#27ae60", "#e84393"
    ];
    let disasterColorMap = {}; // Map to store assigned colors

    // Loaded CSV data
    d3.csv("Clean_Data/climate_related_disasters_frequncy.csv").then((data) => {
        let columns = data.columns.slice(11, 58); // Adjust based on actual structure
        dates = columns.map(col => col.trim());

        data.forEach(row => {
            let country = row["country"];
            let disaster = row["disaster"];

            if (!dataByCountry[country]) {
                dataByCountry[country] = {};
            }

            columns.forEach(year => {
                let count = parseInt(row[year]) || 0;

                if (!dataByCountry[country][year]) {
                    dataByCountry[country][year] = {};
                }

                dataByCountry[country][year][disaster] = count;
            });

            allDisasters.add(disaster);
        });

        // Assigned unique colors to each disaster
        let colorIndex = 0;
        allDisasters.forEach(disaster => {
            disasterColorMap[disaster] = disasterColors[colorIndex % disasterColors.length]; // Cycle if needed
            colorIndex++;
        });

        // Populated country dropdown
        Object.keys(dataByCountry).forEach(country => {
            let option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countryDropdown.appendChild(option);
        });

        // Populated disaster checkboxes
        allDisasters.forEach(disaster => {
            let label = document.createElement("label");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = disaster;
            checkbox.checked = true;

            checkbox.addEventListener("change", updateChart);
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(disaster));
            disasterContainer.appendChild(label);
        });

        createSlider();
        updateChart();
    });

    // Created and styled the slider
    function createSlider() {
        if (dates.length === 0) return;
    
        // Set correct min/max values
        yearSlider.min = 0;
        yearSlider.max = dates.length - 1;
        yearSlider.step = 1;
        yearSlider.value = 0;
        yearLabel.innerText = dates[0];
    
        // Ensured slider is fully responsive
        yearSlider.style.width = "100%";
        yearSlider.style.margin = "0";
        yearSlider.style.padding = "0";
    
        // Updated label and chart when slider moves
        yearSlider.addEventListener("input", function () {
            let index = parseInt(this.value);
            yearLabel.innerText = dates[index];
            updateChart();
        });
    
        updateChart();
    }

    // Updated pie chart
    function updateChart() {
        let selectedCountry = countryDropdown.value;
        let selectedYear = dates[yearSlider.value];
        let selectedDisasters = Array.from(
            disasterContainer.querySelectorAll("input:checked")
        ).map(checkbox => checkbox.value);

        if (!selectedCountry || !selectedYear || selectedDisasters.length === 0) {
            chartContainer.style.display = "none";
            noDataMessage.style.display = "block";
            return;
        }

        let disasterData = dataByCountry[selectedCountry]?.[selectedYear] || {};

        // Prepared chart data with unique colors
        let chartData = selectedDisasters
            .map(disaster => {
                let count = disasterData[disaster] || 0;
                if (count === 0) return null;

                return {
                    value: count,
                    name: disaster,
                    itemStyle: { color: disasterColorMap[disaster] || "#BDC3C7" }
                };
            })
            .filter(item => item !== null);

        if (chartData.length === 0) {
            chartContainer.style.display = "none"; 
            noDataMessage.style.display = "block";
        } else {
            chartContainer.style.display = "block";
            noDataMessage.style.display = "none";
            chart.setOption({
                title: { 
                    text: `Disaster Frequency in ${selectedCountry} (${selectedYear})`,
                    left: "center",
                },
                tooltip: { trigger: "item" },
                legend: { 
                    top: "5%", 
                    left: "center",
                    textStyle: { color: "#333" },
                },
                series: [{
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "50%"],
                    data: chartData,
                    label: {
                        color: "#333",
                        formatter: "{b}: {c} ({d}%)",
                    },
                }]
            });
        }
    }

    countryDropdown.addEventListener("change", updateChart);
});