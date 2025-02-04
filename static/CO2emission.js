// Select the body or a container where elements will be added
let container = d3.select("body");

// Create a div to hold both the chart and the legend side by side
let chartContainer = container.append("div")
    .attr("id", "chartContainer")
    .style("display", "flex") 
    .style("align-items", "center"); 

// Create a div for the slider and label
let sliderContainer = container.append("div").attr("id", "sliderContainer");

// Append the label for the slider
sliderContainer.append("label")
    .attr("for", "yearSlider")
    .text("Year: ");

// Append the span to display the selected year
let yearLabel = sliderContainer.append("span")
    .attr("id", "selectedYear")
    .text("");

// Append the slider input
let slider = sliderContainer.append("input")
    .attr("type", "range")
    .attr("id", "yearSlider");

// Append the div for the bar chart inside the container
let barChart = chartContainer.append("div")
    .attr("id", "bar")
    .style("width", "90%");  

// Append the legend container next to the chart
let legendContainer = chartContainer.append("div")
    .attr("id", "legendContainer")
    .style("background", "rgba(255, 255, 255, 0.8)");

// Function to create legend items
function createLegendItem(color, text) {
    let item = legendContainer.append("div")
        .style("display", "flex")
        .style("align-items", "center")
        .style("margin-bottom", "5px");

    item.append("div")
        .style("width", "15px")
        .style("height", "15px")
        .style("background-color", color)
        .style("margin-right", "5px");

    item.append("span").text(text);
}

// Load CSV file
d3.csv("./Clean_Data/Co2_Emissions.csv").then(function(data) {
    data.forEach(d => {
        d.year = +d.year;
        d.total_value = parseFloat(d.total_value);
    });

    let years = [...new Set(data.map(d => d.year))].sort((a, b) => a - b);

    slider.attr("min", d3.min(years))
          .attr("max", d3.max(years))
          .attr("value", years[0])
          .attr("step", 1);

    yearLabel.text(years[0]);

    function updateChart(selectedYear) {
        let filteredData = data.filter(d => d.year === selectedYear && d.indicator === "CO2 emissions");

        let countryData = d3.rollup(filteredData, 
            v => d3.sum(v, d => d.total_value),
            d => d.country
        );

        // Convert the rolled-up data into an array of [country, total emissions] pairs
        let countryArray = Array.from(countryData.entries());

        // Sort the array by total emissions in descending order
        countryArray.sort((a, b) => b[1] - a[1]);

        // Select the top 20 countries
        let top20Countries = countryArray.slice(0, 20);

        let countries = top20Countries.map(d => d[0]);
        let total_values = top20Countries.map(d => d[1]);

        // Dynamic color scaling
        let minValue = d3.min(total_values);
        let maxValue = d3.max(total_values);
        let midValue = (minValue + maxValue) / 2;

        const colorScale = d3.scaleThreshold()
            .domain([midValue * 0.5, midValue, maxValue * 0.9])
            .range(["green", "orange", "red"]);

        let colors = total_values.map(value => colorScale(value));

        let trace = {
            x: total_values,  
            y: countries,     
            type: "bar",
            orientation: "h", 
            marker: {
                color: colors,
                line: {
                    color: 'black',
                    width: 1
                }
            },
            name: "Total CO₂ Emissions"
        };

        let layout = {
            title: `Top 20 CO₂ Emissions by Country (${selectedYear})`,
            xaxis: { title: 'Total CO₂ Emissions' },  
            yaxis: {
            title: 'Country',
            autorange: 'reversed', 
        },            margin: { t: 30, l: 150 },               
        };

        Plotly.newPlot("bar", [trace], layout);

        // Update legend dynamically
        legendContainer.html("");

        createLegendItem("green", "Low CO₂ Emissions");
        createLegendItem("orange", "Medium CO₂ Emissions");
        createLegendItem("red", "High CO₂ Emissions");
    }

    updateChart(years[0]);

    slider.on("input", function() {
        let selectedYear = +this.value;
        yearLabel.text(selectedYear);
        updateChart(selectedYear);
    });
});