var zipcode = $("#searchBar").val();
const jokeE1 = document.getElementById("dadJokes");

$(".resultsContainer").hide();
$("#dadJokes").hide();
$("#jokeButton").click(function(){
  console.log("ay g u want a dad joke :>")
  displayDadJoke();
})

$("#searchButton").click(function(e){
  $(".resultsContainer").show();
 

  console.log("clicked the search button GO")
  var zipcode = $("#searchBar").val().trim();
  console.log(zipcode);
  getBreweries(zipcode);
  e.preventDefault();

  //uh trying to get the lat lon from da zippy...
  var queryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/Vt32WkzfKroF1XG9RY4ZvTY3gT1sJTR1MqWGOIxWUg8ZMc57gg6mOPzvLsZ5SFhI/info.json/" + zipcode + "/radians"
  $.ajax({
    url: queryURL,
    crossDomain: true,
    headers: {"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,},
    type: "GET"
  }).then(function(response) {
    

    console.log(response.lat);
    console.log(response.lng);
  });
  //done with that ... 


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
      console.log(response.businesses[0].url)
      console.log(response.businesses[0].alias)
      $("#thumbnail0").attr("src", response.businesses[0].image_url)
      $("#listItem0").text(response.businesses[0].name);
      $("#listItemLink0").attr("href", response.businesses[0].url);
      $("#result0Address").text(response.businesses[0].location.display_address)
      $("#result0PhoneNumber").text(response.businesses[0].display_phone)
      console.log(response.businesses[1].name)
      $("#thumbnail1").attr("src", response.businesses[1].image_url)
      $("#listItem1").text(response.businesses[1].name);
      $("#listItemLink1").attr("href", response.businesses[0].url);
      $("#result1Address").text(response.businesses[1].location.display_address)
      $("#result1PhoneNumber").text(response.businesses[1].display_phone)
      console.log(response.businesses[2].name)
      $("#thumbnail2").attr("src", response.businesses[2].image_url)
      $("#listItem2").text(response.businesses[2].name);
      $("#listItemLink2").attr("href", response.businesses[0].url);
      $("#result2Address").text(response.businesses[2].location.display_address)
      $("#result2PhoneNumber").text(response.businesses[2].display_phone)
      console.log(response.businesses[3].name)
      $("#thumbnail3").attr("src", response.businesses[3].image_url)
      $("#listItem3").text(response.businesses[3].name);
      $("#listItemLink3").attr("href", response.businesses[0].url);
      $("#result3Address").text(response.businesses[3].location.display_address)
      $("#result3PhoneNumber").text(response.businesses[3].display_phone)
      console.log(response.businesses[4].name)
      $("#thumbnail4").attr("src", response.businesses[4].image_url)
      $("#listItem4").text(response.businesses[4].name);
      $("#listItemLink4").attr("href", response.businesses[0].url);
      $("#result4Address").text(response.businesses[4].location.display_address)
      $("#result4PhoneNumber").text(response.businesses[4].display_phone)
    })
    .catch(function(e) {
      console.log("HERE IS THE RESPONSE URL" + response.businesses[0].url);
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






async function displayDadJoke() {
  $("#dadJokes").show();
  console.log("here's yer dad joke G")
  const jokeRes = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });
  const joke = await jokeRes.json();
console.log(joke.joke)
  $("#dadJokes").text(joke.joke);
}