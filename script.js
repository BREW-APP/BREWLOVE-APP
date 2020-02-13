init();
function clickedButton(){
    console.log("clicked the search btn..")
}

// reference to the map in html
var map = document.getElementById("mapDisplay");

// mock api data
var breweries = [
  {
    city: {
      name: "Dallas",
      desciption: "We make 324 beer",
      lat: 32.7767,
      lon: -96.797
    }
  },
  {
    city: {
      name: "Austin",
      desciption: "We make 23 beer",
      lat: 30.2672,
      lon: -97.7431
    }
  },
  {
    city: {
      name: "Houston",
      desciption: "We make 324 beer",
      lat: 29.7604,
      lon: -95.3698
    }
  }
];

// This runs first
function init() {
  console.log("initialized da script...")
  document.getElementById("mapDisplay").textContent = "Loading ...";
  // calls getLocation
  getLocation();
}

function getLocation() {
  //   get location checks to see if you allow geolocation
  if (navigator.geolocation) {
    // if so, let's find the user's current position
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("no geolocation allowed");

    // default lat and lng for center
    initMap(34.0522, -118.2437);
  }
}

function showPosition(position) {
  // the position object has information about the users position
  // console.log(position) log this out to see what else is on the obj

  // we'll pull off the latitude and longitude from the coordinates
  const { latitude, longitude } = position.coords;
  // and pass them into initMap
  initMap(latitude, longitude);
}

//   this function processes all the google map information
function initMap(lat, lon) {
  map = new google.maps.Map(document.getElementById("mapDisplay"), {
    zoom: 13,
    //   set center to appropriate place
    center: { lat, lng: lon },
    mapTypeId: "terrain"
  });

  // after ajax .then once you have the response from the api
  // Loop through the results array and place a marker for each
  // set of coordinates.
  breweries.forEach(brewery => {
    console.log(brewery);
    var latLng = new google.maps.LatLng(
      brewery.city.lat,
      brewery.city.lon
    );
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: "Uluru (Ayers Rock)"
    });
    var infowindow = new google.maps.InfoWindow({
      content: brewery.city.desciption
    });
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
  });
}

