// Mapping Geo group members to approximate coordinates
const geoCoordinates = {
    "Global": [20, 0], // Replace with actual coordinates for each Geo group member
    // Add other Geo group members and their coordinates here
  };
  
  // Initialize the map
  const map = L.map('map').setView([20, 0], 2); // Centered globally with zoom level 2
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  // Load CSV data from the Raw_Data folder
  d3.csv('../Raw_Data/Illnesses_Related_to_Pollution.csv').then(data => {
    // Iterate through each row in the dataset
    data.forEach(entry => {
      const geoGroupMember = entry["Geo group member"];
      const meanValue = parseFloat(entry["Mean value"]); // Parse mean value for bubble size
      const coordinates = geoCoordinates[geoGroupMember]; // Get coordinates from mapping
  
      // Ensure valid coordinates and mean value
      if (coordinates && !isNaN(meanValue)) {
        // Scale bubble size based on mean value
        const bubbleSize = Math.sqrt(meanValue) / 100000; // Adjust divisor for scaling
  
        // Add a circle marker (bubble) at the specified coordinates
        const circle = L.circleMarker(coordinates, {
          radius: bubbleSize, // Radius of the bubble
          color: 'blue', // Outline color
          fillColor: 'lightblue', // Fill color
          fillOpacity: 0.6, // Opacity of the fill
          weight: 1 // Outline width
        }).addTo(map);
  
        // Bind a popup to the circle marker with detailed information
        circle.bindPopup(`
          <strong>${entry["GHE Cause"]}</strong><br>
          Geo Group Member: ${geoGroupMember}<br>
          Year: ${entry["Year"]}<br>
          Sex: ${entry["Sex"]}<br>
          Age Group: ${entry["Age group"]}<br>
          Mean Value: ${meanValue.toLocaleString()}
        `);
      } else {
        console.warn(`Invalid data for Geo group member: ${geoGroupMember}`);
      }
    });
  }).catch(error => {
    console.error("Error loading CSV data:", error);
  });
  