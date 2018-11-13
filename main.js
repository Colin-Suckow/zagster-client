$(updateView)

var BASE_URL = "https://zagster-service.herokuapp.com"

var map;

var MAPBOX_KEY = 'pk.eyJ1IjoiY3N1Y2tvdyIsImEiOiJjam56a3U2YzgxaGloM2tramJzand1aDhjIn0.GmUgLUmgtNtIduFrxCnfTg';

function updateView() {

  mapboxgl.accessToken = MAPBOX_KEY;
  
  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-121.321807, 44.056626],
      zoom: 13
  });

  $.getJSON(BASE_URL + "/rides/example", mapTest);


}

function mapTest(data) {
  var start_lat = data.start_lat;
  var start_lon = data.start_lon;
  var end_lat = data.end_lat;
  var end_lon = data.end_lon;

  var requestUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start_lon}%2C${start_lat}%3B${end_lon}%2C${end_lat}.json?access_token=${MAPBOX_KEY}&geometries=geojson`
  console.log(request);
  var mapLine = $.getJSON(requestUrl, loadMapData)
}

function loadMapData(data) {

  var routeData = data.routes[0].geometry;

  console.log(routeData);
  
  map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": routeData
    },
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "#38afff",
      "line-width": 4
  }
  });
}