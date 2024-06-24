import {forecast} from './fetch'
import fullMoon from '../assets/moon/full-moon.png'
import firstQuarter from '../assets/moon/first-quarter.png'
import lastQuarter from '../assets/moon/last-quarter.png'
import newMoon from '../assets/moon/new-moon.png'
import waningCrescent from '../assets/moon/waning-crescent.png'
import waningGibbous from '../assets/moon/waning-gibbous.png'
import waxingCrescent from '../assets/moon/waxing-crescent.png'
import waxingGibbous from '../assets/moon/waxing-gibbous.png'


function moonphaseImg(i){
    let moonphase = forecast.forecast.forecastday[i].astro.moon_phase;
    let moonImg = document.querySelector("img.moonphase");
    let lat = forecast.location.lat;
    console.log(lat);

    // Show img proper to earth hemisphere of location
    if (lat >= 0) {
        switch (moonphase) {
            case "New Moon":
                moonImg.src = newMoon;
                break;
            case "Waxing Crescent":
                moonImg.src = waxingCrescent;
                break;
            case "First Quarter":
                moonImg.src = firstQuarter;
                break;
            case "Waxing Gibbous":
                moonImg.src = waxingGibbous;
                break;
            case "Full Moon":
                moonImg.src = fullMoon;
                break;
            case "Waning Gibbous":
                moonImg.src = waningGibbous;
                break;
            case "Last Quarter":
                moonImg.src = lastQuarter;
                break;
            case "Waning Crescent":
                moonImg.src = waningCrescent;
                break;
        }    
    } else if (lat < 0) {
        switch (moonphase) {
            case "New Moon":
                moonImg.src = newMoon;
                break;
            case "Waxing Crescent":
                moonImg.src = waningCrescent;
                break;
            case "First Quarter":
                moonImg.src = lastQuarter;
                break;
            case "Waxing Gibbous":
                moonImg.src = waningCrescent;
                break;
            case "Full Moon":
                moonImg.src = fullMoon;
                break;
            case "Waning Gibbous":
                moonImg.src = waxingGibbous;
                break;
            case "Last Quarter":
                moonImg.src = firstQuarter;
                break;
            case "Waning Crescent":
                moonImg.src = waxingCrescent;
                break;
        }    

    }

    
}

export {
    moonphaseImg
}