import { displayError, getWeekday, normalizeString} from './aditional-functions'
import { loadingAnimationOn } from './loading-animation';
import { createDOM } from './create-DOM'

// Initialize variables
let geolocation;
let city;
let latitude;
let longitude;
let forecast;


// Initialize getOn(...) when user uses search input, change placeholder if value isn't present
function searchLocation() {
    city = document.querySelector("input.search").value;

    if (city != "") {
        getOnSearchAndAppendDOM();
        document.querySelector("input.search").value = "";
    } else {
        document.querySelector("input.search").placeholder = "Type to search";
    }

 
}

// Initializing function to get geolocation data and run proper function
function getLocation() {
    navigator.geolocation.getCurrentPosition(setPosition,error);
}

// Set current position and run fetch function
function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWithGeolocation();
}

// When geolocation isn't available, run fetch forecast based on IP
function error(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        case error.POSITION_UNAVAILABLE:
        case error.UNKNOWN_ERROR:
        case error.TIMEOUT:
            fetchWithIPandCreateDom();
            break;
    }
  }


// Get forecast with IP and create DOM
function fetchWithIPandCreateDom() {
    getForecastIP()
      .then(function(result) {
        forecast = result;
        createDOM(0);
      })
}

// Check geolocation, then run proper function
function getWithGeolocation (){
  geolocation = getGeolocation()
    .then(function(result){
      geolocation = result;
      if (geolocation.address.city == undefined && geolocation.address.village != undefined) {  
            // when geolocation returns village name instead of a city, append village name to city var
            city = normalizeString(geolocation.address.village);
            fetchWithCityAndCreateDom();

      } else if (geolocation.address.city == undefined && geolocation.address.village == undefined) {
            // when gealocation doesnt return neither city nor village, locate with IP to prevent errors
            fetchWithIPandCreateDom();

      } else if (geolocation.address.city != undefined && geolocation.address.village == undefined) {
            city = normalizeString(geolocation.address.city);

            fetchWithCityAndCreateDom();

      } else {
            //fallback for unknown cases
            fetchWithIPandCreateDom();
      }
    
      });
}


function fetchWithCityAndCreateDom() {
    getForecast()
      .then(function(result) {
        forecast = result;

        console.log(forecast);
        createDOM(0);

      })

}

function getOnSearchAndAppendDOM () {
    loadingAnimationOn();
    getForecast()
            .then(function(result) {
                if (result != "error") {
                    forecast = result;
                    longitude =  forecast.location.lon;
                    latitude = forecast.location.lat;
                    createDOM(0);

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
}