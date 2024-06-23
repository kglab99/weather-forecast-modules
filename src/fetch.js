import { hidePrompt, displayError, loadingAnimationOn, loadingAnimationOff, getWeekday, normalizeString} from './aditional-functions'
import { createDOM } from './create-DOM'

let geolocation;
let today;
let city;
let latitude;
let longitude;
let forecast;


// Search input

function searchLocation() {
    city = document.querySelector("input.search").value;

    if (city != "") {
        loadingAnimationOn();
        getOnSearch();
        document.querySelector("input.search").value = "";
    } else {
        document.querySelector("input.search").placeholder = "Type to search";
    }

 
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(setPosition,error);
}

function error(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        hidePrompt();
        document.querySelector("div#locate-btn").style.display = "none";
        locateWithIP();
      break;
      case error.POSITION_UNAVAILABLE:
        hidePrompt();
        locateWithIP();
      break;
      case error.TIMEOUT:
        hidePrompt();
        locateWithIP();
      break;
      case error.UNKNOWN_ERROR:
        hidePrompt();
        locateWithIP();
      break;
    }
  }

function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    hidePrompt();
    getWithGeolocation();
}

function locateWithIP() {
    getForecastIP()
      .then(function(result) {
        forecast = result;
        today = getWeekday(forecast.location.localtime.split(' ')[0]);
        createDOM(0);
        loadingAnimationOff();
        
      })
}

function getWithGeolocation (){
  geolocation = getGeolocation()
    .then(function(result){
      geolocation = result;
      if (geolocation.address.city == undefined && geolocation.address.village != undefined) {
          city = normalizeString(geolocation.address.village);

          getWithCity();

      } else if (geolocation.address.city == undefined && geolocation.address.village == undefined) {
          locateWithIP();

      } else if (geolocation.address.city != undefined && geolocation.address.village == undefined) {
          city = normalizeString(geolocation.address.city);

          getWithCity();

      } else {
          locateWithIP();
      }
    
      });
}

function getWithCity() {
    getForecast()
      .then(function(result) {
        forecast = result;
        today = getWeekday(forecast.location.localtime.split(' ')[0]);

        console.log(forecast);
        createDOM(0);

        loadingAnimationOff(); 
      })

}

function getOnSearch () {
    getForecast()
            .then(function(result) {
                if (result != "error") {
                    forecast = result;
                    today = getWeekday(forecast.location.localtime.split(' ')[0]);
                    longitude =  forecast.location.lon;
                    latitude = forecast.location.lat;
                    createDOM(0);

                    loadingAnimationOff();
                } else {
                    displayError();
                }

                    
        })
}

// Async functions

// Get user city based on coordinates from geolocation
async function getGeolocation() {
    try {
        const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=pk.9fdc1490ae4d809ce9ece84b2c3bda46&lat=${latitude}&lon=${longitude}&format=json&accept-language=en&`, {mode: 'cors'});
        const city = await response.json();
        return city;
    } catch (e) {
    }
}

// Get forecast and astronomy forecast based on city name
async function getForecast() {
    try {

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b97a7289e4e24edbbb8101327242006&q=${city}&days=8`, {mode: 'cors'});
        if (response.ok == true) {
            const forecast = await response.json();
            return forecast;
        } else {
            displayError();
        }

    } catch (e) {
        return "error";
    }
}

//// Get forecast and astronomy forecast based on IP adress
async function getForecastIP() {
    try {

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b97a7289e4e24edbbb8101327242006&q=auto:ip&days=8`, {mode: 'cors'});
        const forecast = await response.json();
        return forecast;
    } catch (e) {
    }
}

export {
    getLocation,
    searchLocation,
    forecast,
    today
}