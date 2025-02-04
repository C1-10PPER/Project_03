// Select the body or a container where elements will be added
let container = d3.select("body");

// Create a div for the slider and label
let sliderContainer = d3.select("#sliderContainer");

// Append the input slider for selecting years
let yearSlider = sliderContainer.append("input")
    .attr("type", "range")
    .attr("id", "yearSlider")
    .attr("min", 0) // Placeholder, will be set dynamically
    .attr("max", 0) // Placeholder, will be set dynamically
    .attr("step", 1)
    .attr("value", 0);

// Append the span to display the selected year
let yearLabel = d3.select("#selectedYear");

// Load CSV file
d3.csv("Clean_Data/Co2_Emissions.csv").then(function(data) {
    // Convert year and value to numbers
    data.forEach(d => {
        d.year = +d.year;
        d.total_value = parseFloat(d.total_value);
    });

    // Extract unique years and sort them
    let years = [...new Set(data.map(d => d.year))].sort((a, b) => a - b);

    // Update the slider range dynamically
    yearSlider.attr("min", 0)
              .attr("max", years.length - 1)
              .attr("value", 0); // Default to first year

    // Function to update chart based on selected year
    function updateChart(selectedYear) {
        let filteredData = data.filter(d => d.year === selectedYear && d.indicator === "CO2 emissions");

        let countryData = d3.rollup(filteredData, 
            v => d3.sum(v, d => d.total_value),
            d => d.country
        );

        let countryArray = Array.from(countryData.entries());
        countryArray.sort((a, b) => b[1] - a[1]);
        let top20Countries = countryArray.slice(0, 20);

        let countries = top20Countries.map(d => d[0]);
        let total_values = top20Countries.map(d => d[1]);

        let minValue = d3.min(total_values);
        let maxValue = d3.max(total_values);
        let midValue = (minValue + maxValue) / 2;

        const colorScale = d3.scaleThreshold()
            .domain([midValue * 0.5, midValue, maxValue * 0.9])
            .range(["green", "orange", "red"]);

        let colors = total_values.map(value => colorScale(value));

        let ctx = document.getElementById("co2emission").getContext("2d");
        if (window.barChartInstance) {
            window.barChartInstance.destroy();
        }
        window.barChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: countries,
                datasets: [{
                    label: "Total CO₂ Emissions",
                    data: total_values,
                    backgroundColor: colors,
                    borderColor: "black",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                indexAxis: "y",
                plugins: {
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            boxWidth: 20,
                            boxHeight: 20,
                            generateLabels: function(chart) {
                                return [
                                    { text: "Low CO₂ Emissions", fillStyle: "green" },
                                    { text: "Medium CO₂ Emissions", fillStyle: "orange" },
                                    { text: "High CO₂ Emissions", fillStyle: "red" }
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: { title: { display: true, text: "Total CO₂ Emissions" } },
                    y: { title: { display: true, text: "Country" } }
                }
            }
        });
    }

    // Initial chart load
    updateChart(years[0]);
    yearLabel.text(years[0]);

    // Listen to slider input changes
    yearSlider.on("input", function() {
        let selectedYear = years[this.value];
        yearLabel.text(selectedYear);
        updateChart(selectedYear);
    });
});