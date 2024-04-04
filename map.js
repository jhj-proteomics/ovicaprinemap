var map = L.map('map').setView([0, 0], 2); // Initialize map with a global view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

var markers = L.layerGroup().addTo(map); // Create a layer group for markers

// Function to add markers based on filters
function addMarkers(filters) {
    markers.clearLayers(); // Remove existing markers

    data.forEach(function(item) {
        if ((filters.country && filters.country !== 'all' && item.Country !== filters.country) ||
            (filters.period && filters.period !== 'all' && item.Period !== filters.period)) {
            return; // Skip if not matching the filter
        }

        var marker = L.marker([item.N, item.E]);
        marker.bindPopup('<b>Title:</b> ' + item.Title +
                         '<br><b>Author(s):</b> ' + item['Author(s)'] +
                         '<br><b>Year:</b> ' + item.Year +
                         '<br><b>Country:</b> ' + item.Country +
                         '<br><b>Period:</b> ' + item.Period +
                         (item.Data ? '<br><a href="' + item.Data + '">Data Link</a>' : ''));
        markers.addLayer(marker);
    });
}

// Populate filter dropdowns
function populateFilters() {
    var countries = [...new Set(data.map(item => item.Country))].sort();
    var periods = [...new Set(data.map(item => item.Period))].sort();

    var countrySelect = document.getElementById('country-filter');
    countries.forEach(function(country) {
        if (country) {
            countrySelect.innerHTML += '<option value="' + country + '">' + country + '</option>';
        }
    });

    var periodSelect = document.getElementById('period-filter');
    periods.forEach(function(period) {
        if (period) {
            periodSelect.innerHTML += '<option value="' + period + '">' + period + '</option>';
        }
    });
}

// Function to apply filters
function applyFilters() {
    var filters = {
        country: document.getElementById('country-filter').value,
        period: document.getElementById('period-filter').value,
    };
    addMarkers(filters);
}

// Event listeners for filter changes
document.getElementById('country-filter').addEventListener('change', applyFilters);
document.getElementById('period-filter').addEventListener('change', applyFilters);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    populateFilters();
    applyFilters(); // Apply filters initially to load all markers
});
