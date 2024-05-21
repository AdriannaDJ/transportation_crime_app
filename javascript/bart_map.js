// // Initialize the map
// var map = L.map('map').setView([37.7749, -122.4194], 10);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// var url = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y'
// d3.json(url).then(function(data) {
//     // Process station data
//     var stations = data['root']['stations']['station'];

//     // Loop through each station
//     stations.forEach(function(station) {
//         // Create a marker for each station
//         L.marker([station['gtfs_latitude'], station['gtfs_longitude']])
//             .addTo(map)
//             .bindPopup(`<b>${station['name']}</b><br>${station['address']}`);
//     });
// })

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups that we'll use.
let layers = {
    ALL: new L.LayerGroup(),
    BLUE: new L.LayerGroup(),
    GREEN: new L.LayerGroup(),
    ORANGE: new L.LayerGroup(),
    RED: new L.LayerGroup(),
    YELLOW: new L.LayerGroup(),
    BEIGE: new L.LayerGroup()
  };
  // Create the map with our layers.
let map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [
      layers.ALL,
      layers.BLUE,
      layers.GREEN,
      layers.ORANGE,
      layers.RED,
      layers.YELLOW,
      layers.BEIGE
    ]
  });
// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);
// Create an overlays object to add to the layer control.
let overlays = {
    'All stations':layers.ALL,
    "Blue Line": layers.BLUE,
    "Green Line": layers.GREEN,
    "Orange Line": layers.ORANGE,
    "Red Line": layers.RED,
    "Yellow Line": layers.YELLOW,
    'Beige Lines': layers.BEIGE
  };
// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map.
let info = L.control({
    position: "topright"
  });
  // When the layer control is added, insert a div with the class of "legend".
info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map.
  info.addTo(map);
  // Initialize an object that contains icons for each layer group.
let icons = {
    ALL: L.ExtraMarkers.icon({
      iconColor: "black",
      markerColor: "black",
      shape: "star"
    }),
    BLUE: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),
    OUT_OF_ORDER: L.ExtraMarkers.icon({
      icon: "ion-minus-circled",
      iconColor: "white",
      markerColor: "blue-dark",
      shape: "penta"
    }),
    LOW: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
    }),
    NORMAL: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    })
  };