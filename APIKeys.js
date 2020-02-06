var settings = {
  url: "https://love-calculator.p.rapidapi.com/getPercentage?fname=&sname=",
  method: "GET",
  timeout: 0,
  headers: {
    "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
    "X-RapidAPI-Key": "18b99f286bmshe38353c7eaa74bdp16a2cbjsn5451ba1ea3ec"
  }
};

$.ajax(settings).done(function(response) {
  console.log(response);
});
