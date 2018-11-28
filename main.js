$(init)

var BASE_URL = "https://cs-zagster-data.herokuapp.com" 

var map;

var routeIndex = 0;

var MAPBOX_KEY = 'pk.eyJ1IjoiY3N1Y2tvdyIsImEiOiJjam56a3U2YzgxaGloM2tramJzand1aDhjIn0.GmUgLUmgtNtIduFrxCnfTg';

function init() {

    var mDatepicker = $('#datepicker');
    mDatepicker.datepicker();
    mDatepicker.datepicker().on('changeDate', (e) => {
        var isoDate = e.date.toISOString().slice(0, 10).replace('T', '');
        console.log(isoDate);
        clearRoutes();
        showDataAlert(false);
        reloadRoutes(isoDate);
    })

  mapboxgl.accessToken = MAPBOX_KEY;
  
  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-121.321807, 44.051521],
      zoom: 14
  });

  map.on('load', () => {
    loadStationPoints();
  })
}

function reloadRoutes(date) {
    $.getJSON(BASE_URL + "/rides/day?date=" + date, loadRoutes);
}

function clearRoutes() {
    map.getStyle().layers.forEach(function(layer) {
        if (layer.id.startsWith("bikeRoute")) {
            map.removeLayer(layer.id);
        }
    });
}

function loadRoutes(data) {
    if(data.length == 0) {
        console.log("No data")
        showDataAlert(true);
    } else {
        for(var i = 0; i < data.length; i++) {
            loadRoute(data[i]);
        }
    }
  
}

function showDataAlert(enable) {
    var warning = $('#data-alert');
    if(enable) {
        console.log('showing alert...');
        warning.show();
    } else {
        console.log('hiding alert');
        warning.hide();
    }
}

function loadMapData(data, index) {

  var routeData = data.routes[0].geometry;
  routeIndex++;
  //Add test route line
  map.addLayer({
    "id": "bikeRoute" + routeIndex,
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

function loadRoute(row) {
var start_lat = row.start_lat;
  var start_lon = row.start_lon;
  var end_lat = row.end_lat;
  var end_lon = row.end_lon;

  var requestUrl = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start_lon}%2C${start_lat}%3B${end_lon}%2C${end_lat}.json?access_token=${MAPBOX_KEY}&geometries=geojson`
  console.log(requestUrl);
  $.getJSON(requestUrl, loadMapData)
}

function loadStationPoints() {
    
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