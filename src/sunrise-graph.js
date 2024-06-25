import Chartkick from "chartkick";
import "chartkick/chart.js";
import SunCalc from "suncalc3";
import { forecast } from "./fetch";

function createSunchart(i) {
  let lat = forecast.location.lat;
  let lon = forecast.location.lon;
  let date = forecast.forecast.forecastday[i].date;
  let data = [];

  let times = SunCalc.getSunTimes(date, lat, lon, 1, false, false);

  let sunrisePos = SunCalc.getPosition(times.sunriseStart.value, lat, lon);
  let sunriseTime = times.sunriseStart.value;

  let solarNoonPos = SunCalc.getPosition(times.solarNoon.value, lat, lon);
  let solarNoonTime = times.solarNoon.value;

  let sunsetPos = SunCalc.getPosition(times.sunsetEnd.value, lat, lon);
  let sunsetTime = times.sunsetEnd.value;

  //Convert values to HH:MM format and push data with sun position in degrees
  sunriseTime = sunriseTime.toString().split(" ")[4].split(":");
  sunriseTime = `${sunriseTime[0]}:${sunriseTime[1]}`;
  data.push([sunriseTime, sunrisePos.altitudeDegrees]);

  solarNoonTime = solarNoonTime.toString().split(" ")[4].split(":");
  solarNoonTime = `${solarNoonTime[0]}:${solarNoonTime[1]}`;
  data.push([solarNoonTime, solarNoonPos.altitudeDegrees]);

  sunsetTime = sunsetTime.toString().split(" ")[4].split(":");
  sunsetTime = `${sunsetTime[0]}:${sunsetTime[1]}`;
  data.push([sunsetTime, sunsetPos.altitudeDegrees]);

  new Chartkick.LineChart("sun-chart", data, {
    colors: ["#fff"],
    library: {
      scales: {},
      events: [],
      scales: { y: { display: false }, x: { grid: { color: "#fff" } } },
    },
    points: false,
  });
}

function convertTo24Hour(timeString) {
  let date = new Date(`01/01/2022 ${timeString}`);
  let formattedTime = date.toLocaleTimeString("en-US", { hour12: false });
  return formattedTime;
}

export { createSunchart };
