import Chartkick from "chartkick"
import "chartkick/chart.js"
import SunCalc from "suncalc3"
import { forecast } from "./fetch"

function createSunchart(i) {
    let lat = forecast.location.lat;
    let lon = forecast.location.lon;
    let date = forecast.forecast.forecastday[i].date;
    console.log(date);
    let data = [];

    //Get sunrise sunset time and convert to 24H format
    let sunrise = convertTo24Hour(forecast.forecast.forecastday[i].astro.sunrise);
    sunrise = sunrise.split(":");
    sunrise = `${sunrise[0]}:${sunrise[1]}`
    
    let sunset = convertTo24Hour(forecast.forecast.forecastday[i].astro.sunset);
    sunset = sunset.split(":");
    sunset = `${sunset[0]}:${sunset[1]}`

    // Calculate solar noon for date and location, then convert to time in HH:MM
    let solarNoon = SunCalc.getSunTimes(date, lat, lon, 1, false, false).solarNoon.value.toString();
    solarNoon = solarNoon.split(" ")[4];
    solarNoon = solarNoon.split(":");
    solarNoon = `${solarNoon[0]}:${solarNoon[1]}`

    data.push([sunrise, "0"])
    data.push([solarNoon, "100"])
    data.push([sunset, "0"])

    new Chartkick.LineChart("sun-chart", data, {library: {events: [], scales: {y: {display: false}}}});
} 

function convertTo24Hour(timeString) {
    let date = new Date(`01/01/2022 ${timeString}`);
    let formattedTime = date.toLocaleTimeString('en-US',
        { hour12: false });
    return formattedTime;
}

export {
    createSunchart
}