document.addEventListener("DOMContentLoaded", function () {
    const csvFilePath = "./Clean_Data/illnesses_related_to_pollution.csv";
    let chartInstance = null;
    
    async function fetchData() {
        const response = await fetch(csvFilePath);
        const data = await response.text();
        return parseCSV(data);
    }

    function parseCSV(data) {
        const rows = data.split("\n").slice(1);
        let parsedData = [];
        
        rows.forEach(row => {
            const columns = row.split(",");
            if (columns.length >= 5) {
                parsedData.push({
                    year: columns[0].trim(),
                    ageGroup: columns[1].trim(),
                    cause: columns[2].trim(),
                    avgMeanValue: parseFloat(columns[3].trim())
                });
            }
        });
        return parsedData;
    }

    function generateChart(data, selectedYear) {
        const ctx = document.getElementById("illnessChart").getContext("2d");

        // Filter data by selected year
        const filteredData = data.filter(d => d.year === selectedYear);
        
        // Extract unique causes for different colors
        const uniqueCauses = [...new Set(filteredData.map(d => d.cause))];

        // Assign colors to causes
        const colorMap = {};
        const colors = [
                "rgb(128, 0, 128)",   // Bold Purple
                "rgb(255, 140, 0)",   // Bold Orange
                "rgb(30, 144, 255)",  // Dodger Blue
                "rgb(255, 69, 0)",    // Red-Orange
                "rgb(0, 128, 128)"    // Teal
        
        ];
        uniqueCauses.forEach((cause, index) => {
            colorMap[cause] = colors[index % colors.length];
        });

        // Group data by age group
        const groupedData = {};
        filteredData.forEach(d => {
            if (!groupedData[d.ageGroup]) {
                groupedData[d.ageGroup] = [];
            }
            groupedData[d.ageGroup].push(d);
        });

        // Create datasets
        const datasets = uniqueCauses.map(cause => {
            return {
                label: cause,
                backgroundColor: colorMap[cause],
                data: Object.keys(groupedData).map(ageGroup => {
                    const record = groupedData[ageGroup].find(d => d.cause === cause);
                    return record ? record.avgMeanValue : 0;
                })
            };
        });

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(groupedData),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Age Group"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Average Mean Value"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: "right"
                    }
                }
            }
        });
    }

    function populateYearFilter(data) {
        const yearFilter = document.getElementById("yearFilter");
        const uniqueYears = [...new Set(data.map(d => d.year))];

        uniqueYears.forEach(year => {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });

        yearFilter.addEventListener("change", () => {
            generateChart(data, yearFilter.value);
        });

        // Initialize with the first year
        generateChart(data, uniqueYears[0]);
    }

    fetchData().then(data => {
        populateYearFilter(data);
    });
});
