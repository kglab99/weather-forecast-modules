import * as css from "./style.css";
import { getLocation, searchLocation, forecast  } from './fetch'
import "chartkick/chart.js"
import forward from '../assets/forward.svg';
import back from '../assets/back.svg'
import { divRain, divWind, divTemperature, btnRain, btnTemperature, btnWind } from "./charts-menu";

// default getLocation on window load
getLocation();

// Keyboard support for search bar
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchLocation();

    }
})




// Icon srcs
document.querySelector("img.next-day-btn").src = forward;
document.querySelector("img.previous-day-btn").src = back;
