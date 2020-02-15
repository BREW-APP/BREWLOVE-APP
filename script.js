var zipcode = $("#searchBar").val();

$("#searchButton").click(function(e){

  displayDadJoke();

  console.log("clicked the search button GO")
  var zipcode = $("#searchBar").val().trim();
  console.log(zipcode);
  getBreweries(zipcode);
  e.preventDefault();



//!!!!!!!!!!!!!!!!!!!




      // create the on click listener
      // grab the zip from the input .val().trim()
      // pass that zip to your getBreweries(zip) function
      // $("#submit-btn").on("click", function(e) {
        // e.preventDefault();
        // var zipCode = $('#zip').val().trim();
        // getBreweries(zipCode);
      
      // })
      // const getBreweries = zipCode => {
      //   $.ajax({
      //     url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=brewery&location=${zipCode}`,
      //     method: "GET",
      //     headers: {
      //       'Authorization':
      //         "Bearer bvfT3iWDcpR-4Muk889vmNcivjsGMRCxzB3k1TagHYfLTnUunGHZq5fWVIOSNm6L5dwwzoXTsBmkU42-YT353irMrVF8kdd_kGAUSHLc-0dnINfstgnOCmw7qC0_XnYx",
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Credentials': true,
      //     }
      //   })
      //     .then(function(response) {
      //       // do something with the response
      //       console.log(response)
      //     })
      //     .catch(function(e) {
      //       console.log(e);
      //     });
      // };




//!!!!!!!!!!!!!!!!!!!!!!!!!!

})
const getBreweries = zipcode => {
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=brewery&location=${zipcode}`,
    method: "GET",
    headers: {
      'Authorization':
        "Bearer bvfT3iWDcpR-4Muk889vmNcivjsGMRCxzB3k1TagHYfLTnUunGHZq5fWVIOSNm6L5dwwzoXTsBmkU42-YT353irMrVF8kdd_kGAUSHLc-0dnINfstgnOCmw7qC0_XnYx",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  })
    .then(function(response) {
      console.log(response);
      // do something with the response
      console.log(response.businesses[0].alias)
      $("#listItem0").text(response.businesses[0].name);
      console.log(response.businesses[1].name)
      $("#listItem1").text(response.businesses[1].name);
      console.log(response.businesses[2].name)
      $("#listItem2").text(response.businesses[2].name);
    })
    .catch(function(e) {
      console.log(e);
    });
};


// THIS IS ALL THE STUFF PERTAINING TO THE GOOGLE MAP DISPLAY YO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// reference to the map in html
init();
var map = document.getElementById("mapDisplay");

// This runs first
function init() {
  console.log("initialized the script...")
  document.getElementById("mapDisplay").textContent = "Loading ...";
  // calls getLocation
  getLocation();
}

// reference to the map in html
var map;

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


function getLocation() {
  //   get location checks to see if you allow geolocation
  if (navigator.geolocation) {
    // if so, let's find the user's current position
    console.log("eagle mode. ")
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
    // mapTypeId: "terrain"
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
//THIS CONCLUDES ALL THE STUFF PERTAINING TO THE MAP DISPLAY API !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//dad joke code..
function displayDadJoke(){
  console.log("and also here's a random dad joke... LOL")
  $("#dadJokes").text("I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!")
}