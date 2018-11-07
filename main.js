$(updateView)

var BASE_URL = "https://zagster-service.herokuapp.com"

function updateView() {
   
  $.getJSON(BASE_URL + "/rides/count", updateRideCount);
}

function updateRideCount(data) {
  numberOfRides = Number(data.count);

  var rideCount = $("h1#rideCount");
 
  rideCount.fadeIn(1000);
  rideCount.countup(numberOfRides);
}
