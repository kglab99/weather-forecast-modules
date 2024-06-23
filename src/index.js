import * as css from "./style.css";
import { getLocation, searchLocation, forecast  } from './fetch'
import { createCharts } from './create-DOM'
import { hidePrompt, displayError, loadingAnimationOn, loadingAnimationOff, getWeekday, normalizeString} from './aditional-functions'
import Chartkick from "chartkick"
import "chartkick/chart.js"
import forward from '../assets/forward.svg';
import back from '../assets/back.svg'



document.querySelector("img.next-day-btn").src = forward;
document.querySelector("img.previous-day-btn").src = back;

getLocation();


// Keyboard support
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchLocation();

    }
})


// Additional functions


Chartkick.options = {
    // height: "400px",
    colors: ["#000000"]
  }



// getForecast()
//     .then(function(result) {
//     forecast = result;

//     createCharts();
//     createHours();
//     console.log(forecast.forecast.forecastday[0].hour);
//     console.log(condition);

// })




