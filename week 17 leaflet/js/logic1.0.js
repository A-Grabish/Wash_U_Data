
var map = L.map("map", {
    center: [ 40.7, -94.5],
    zoom: 3,
    layers: [satalite, techtonics]
  });
  

// Then send the api request 
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

        // console.log(data);
        plotData(data);        
});

function plotData(data){

  // step 1.1 + 1.2 goes here
  L.geoJson(data,
      {
        pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng);
      }, 
      style: plotStyles,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " 
        + feature.properties.place);
      }

    }).addTo(map);


function plotStyles(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    radius: (getMagnitude(feature.properties.mag)*4),
    stroke: true,
    weight: 0.5,
  };
}

function getMagnitude(mag) {
  if (mag === 0) {return .001;}
  else {return (mag);}
}

function getColor(mag) {
  if (mag <= 1) {color = "LawnGreen";}
  else if (mag<=2) {color = "yellow";}
  else if (mag<=3) {color = "gold";}
  else if (mag<=4) {color = "orange";}
  else if (mag<=5) {color = "orangered"}
  else {color = "red";}
  return color;
  
}

var info = L.control({
  position: "bottomright"
 });

info.onAdd = function(map){
  var div = L.DomUtil.create("div", "info legend"),
  grades = [0, 1, 2, 3, 4, 5],
  labels = [];

  for (var i =0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background: ' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
  }

  return div;
};

info.addTo(map);
};

var techLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_steps.json";

d3.json(techLink, function(data) {

  L.geoJson(data, {
  }).addTo(map);
});

