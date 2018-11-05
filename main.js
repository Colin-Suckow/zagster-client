$(updateView)

var BASE_URL = "https://zagster-service.herokuapp.com"

function updateView() {
  $.getJSON(BASE_URL + "/rides/count", updateRideCount);
}

function updateRideCount(data) {
  numberOfRides = data.count;
  $("h1#rideCount").html(numberOfRides);
}
