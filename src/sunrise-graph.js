import Chartkick from "chartkick";
import "chartkick/chart.js";
import SunCalc from "suncalc3";
import { forecast } from "./fetch";
import sun from '../assets/sun.png'
import ProgressBar from 'progressbar.js';

function createSunchart2(){
  let latitude = forecast.location.lat;
  let longitude = forecast.location.lon;
  console.log(forecast.location.localtime);

  const currentDateAndTime = new Date(forecast.location.localtime);
  console.log(currentDateAndTime);

  let sunTimes = SunCalc.getSunTimes(currentDateAndTime, latitude, longitude, 0)

  let sunrise = sunTimes.sunriseStart.value;
  let sunset = sunTimes.sunsetEnd.value;

  let dayTime = Math.floor((sunset - sunrise)/60000);
  let dayTimeElapsed =  Math.floor((currentDateAndTime - sunrise)/60000);
  let dayTimePercentage= dayTimeElapsed/dayTime;

  let sunriseTime = sunrise.toString().split(" ")[4].split(":");
  sunriseTime = `${sunriseTime[0]}:${sunriseTime[1]}`;

  let sunsetTime = sunset.toString().split(" ")[4].split(":");
  sunsetTime = `${sunsetTime[0]}:${sunsetTime[1]}`;

  document.querySelector("p.sunrise").textContent = sunriseTime;
  document.querySelector("p.sunset").textContent = sunsetTime;
  let sunImg = document.querySelector("img.sun-chart");
  console.log(dayTimePercentage);
  if (dayTimePercentage < 1) {
    sunImg.src = sun;
  } else {
    sunImg.src = document.querySelector("img.moonphase").src;

  }
  console.log(sunriseTime, sunsetTime)


  createProgress(dayTimePercentage);
}

function createProgress(dayTimePercentage) {
  let bar = new ProgressBar.SemiCircle("#sun-progress", {
      strokeWidth: 4,
      color: "white",
      trailColor: "rgba(255,255,255, 0.4)",
      trailWidth: 4,
      easing: "easeIn",
      duration: 1,
      svgStyle: null,
  
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute("stroke", state.color);
        var value = Math.round(bar.value() * 100);
      },
      
    });

    if (dayTimePercentage < 1) {
      bar.animate(dayTimePercentage); // Number from 0.0 to 1.0

      moveSun(dayTimePercentage);

    } else {
      bar.animate(1); // Number from 0.0 to 1.0
      moveSun(1);

    }

}

function moveSun(dayTimePercentage) {


var path = document.querySelector('div#sun-progress > svg > path:nth-child(2)')
var obj = document.querySelector('img.sun-chart');

var pathLength = Math.floor( path.getTotalLength() );

// Move obj element along path based on percentage of total length
function moveObj(prcnt)
{
  prcnt = (prcnt*pathLength) / 100;
  let pt = path.getPointAtLength(prcnt);
  console.log(prcnt);

  // console.log(prcnt)
  if (prcnt < 15) {
    pt.x = (Math.round(pt.x)*2-12);
    pt.y = (Math.round(pt.y)*2);
  } else if (prcnt < 30) {
    pt.x = (Math.round(pt.x)*2-10);
    pt.y = (Math.round(pt.y)*2);
  } else if (prcnt < 47) {
    pt.x = (Math.round(pt.x)*2-10);
    pt.y = (Math.round(pt.y)*2);
  } else if (prcnt < 67) {
    pt.x = (Math.round(pt.x)*2);
    pt.y = (Math.round(pt.y)*2);
  } else if (prcnt < 80) {
    pt.x = (Math.round(pt.x)*2-15);
    pt.y = (Math.round(pt.y)*2);
  } else if (prcnt < 110) {
    pt.x = (Math.round(pt.x)*2-15);
    pt.y = (Math.round(pt.y)*2);
  } else if (prcnt < 127) {
    pt.x = (Math.round(pt.x)*2-15);
    pt.y = (Math.round(pt.y)*2);
  } else if (prcnt <= 150) {
    pt.x = (Math.round(pt.x)*2-12);
    pt.y = (Math.round(pt.y)*2);
  }

  // Get x and y values at a certain point in the line

  
  obj.style.transform = 'translate('+pt.x+'px,'+pt.y+'px)';

}

moveObj(dayTimePercentage*100);


}


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






  // new Chartkick.LineChart("sun-chart", data, {
  //   colors: ["#fff"],
  //   library: {
  //     scales: {},
  //     events: [],
  //     scales: { y: { display: false }, x: { grid: { color: "#fff" } } },
  //   },
  //   points: false,
  // });

  // createSunchart2();
}


export { createSunchart, createSunchart2 };
