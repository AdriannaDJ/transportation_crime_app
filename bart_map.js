// Initialize the map
var map = L.map('map').setView([37.7749, -122.4194], 10);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var url = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y'
d3.json(url).then(function(data) {
    // Process station data
    var stations = data['root']['stations']['station'];

    // Loop through each station
    stations.forEach(function(station) {
        // Create a marker for each station
        L.marker([station['gtfs_latitude'], station['gtfs_longitude']])
            .addTo(map)
            .bindPopup(`<b>${station['name']}</b><br>${station['address']}`);
    });
})

