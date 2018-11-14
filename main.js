$(updateView)

var BASE_URL = "https://zagster-service.herokuapp.com"

var map;

var MAPBOX_KEY = 'pk.eyJ1IjoiY3N1Y2tvdyIsImEiOiJjam56a3U2YzgxaGloM2tramJzand1aDhjIn0.GmUgLUmgtNtIduFrxCnfTg';

function updateView() {

  mapboxgl.accessToken = MAPBOX_KEY;
  
  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
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

  var requestUrl = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start_lon}%2C${start_lat}%3B${end_lon}%2C${end_lat}.json?access_token=${MAPBOX_KEY}&geometries=geojson`
  console.log(requestUrl);
  var mapLine = $.getJSON(requestUrl, loadMapData)
}

function loadMapData(data) {

  var routeData = data.routes[0].geometry;

  console.log(routeData);
  
  //Add test route line
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

  //Add station points
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-121.32598,  44.048745]
                },
                "properties": {
                    "title": "Columbia Simpson",
                    "icon": "monument"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-121.31667, 44.058705]
                },
                "properties": {
                    "title": "Drake Park",
                    "icon": "monument"
                }
            }, {
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [-121.31425, 44.05733]
              },
              "properties": {
                  "title": "G5",
                  "icon": "monument"
              }
          }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.328415, 44.056495]
            },
            "properties": {
                "title": "Gavleston",
                "icon": "monument"
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.324075, 44.04412]
            },
            "properties": {
                "title": "Graduate Research Center",
                "icon": "monument"
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.316145, 44.04351]
            },
            "properties": {
                "title": "Old Mill",
                "icon": "monument"
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.333995, 44.04276]
            },
            "properties": {
                "title": "OSU Cascades",
                "icon": "monument"
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.313305, 44.060185]
            },
            "properties": {
                "title": "Ten Barrel",
                "icon": "monument"
            }
        }]
        }
    },
    "layout": {
        "icon-image": "{icon}-15",
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
    }
});

}