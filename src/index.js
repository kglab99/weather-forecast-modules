import * as css from "./style.css";
import { getLocation, searchLocation, forecast  } from './fetch'
import Chartkick from "chartkick"
import "chartkick/chart.js"
import forward from '../assets/forward.svg';
import back from '../assets/back.svg'
import { Colors } from 'chart.js';


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
    colors: ["#000000"]

}



