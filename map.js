var map = L.map('map').setView([0, 0], 2); // Initializes map

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Loop through the dataset to add markers
data.forEach(function(item) {
    var marker = L.marker([item.N, item.E]).addTo(map);
    marker.bindPopup('<b>Title:</b> ' + item.Title + '<br><b>Author(s):</b> ' + item['Author(s)'] + 
                     '<br><b>Year:</b> ' + item.Year + '<br><b>Country:</b> ' + item.Country + 
                     '<br><b>Region:</b> ' + (item.Region || 'N/A') + '<br><b>Period:</b> ' + item.Period +
                     (item.Data ? '<br><a href="' + item.Data + '" target="_blank">Link to Data</a>' : ''));
});
