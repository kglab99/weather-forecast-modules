import {forecast} from './fetch'
import { windMap } from './create-map';
import { loadingAnimationOn, loadingAnimationOff } from './loading-animation';
import Chartkick from "chartkick"
import "chartkick/chart.js"
import { createUV } from './UV-index-chart';
import {moonphaseImg} from './moonphase'
import { createSunchart } from './sunrise-graph';

// Main function to create all DOM elements
function createDOM(i) {
    loadingAnimationOn();
    clearDOM();
    windMap();
    createCharts(i);
    createMain(i);
    createTopBar(i);
    createUV(i);
    createSunchart(i);
    moonphaseImg(i);
    loadingAnimationOff();
}

// Clear DOM before creating DOM for another day or changing location
function clearDOM() {
    document.querySelector("div#top-bar").innerHTML = "";
    document.querySelector("div#main").innerHTML = "";
    document.querySelector("div#hours").innerHTML = "";
    document.querySelector("div#UV").innerHTML = "";
}

// Line color for chart line
Chartkick.options = {
    colors: ["#000000"]
}

// Create charts with hourly forecast
function createCharts(i) {
    // Declare variables for charts data
    let temp = [];
    let wind = [];
    let rain = [];

    // Create arrays with current data in format readable by Chartkick
    forecast.forecast.forecastday[i].hour.forEach((element) => {
        temp.push([element.time.split(' ')[1], element.temp_c]);
        wind.push([element.time.split(' ')[1], element.wind_kph]);
        rain.push([element.time.split(' ')[1], element.chance_of_rain]);
    })

    // Create charts from arrays

    new Chartkick.LineChart("temperature", temp, {points: false, loading: "Loading...", suffix: "°C", empty: "No data", });
    new Chartkick.LineChart("wind", wind, {points: false, loading: "Loading...", suffix: "km/h", empty: "No data"});
    new Chartkick.LineChart("rain", rain, {points: false, loading: "Loading...", suffix: "%", empty: "No data"});
}

// Create main weather section
function createMain(i) {
    const main = document.querySelector("div#main");

    const h1 = document.createElement("h1");
    h1.classList = "current-temp";
    h1.textContent = `${forecast.forecast.forecastday[i].day.avgtemp_c}°C`;

    const divTemp = document.createElement("div");
    divTemp.classList = "min-max-temp";
    
    const minTemp = document.createElement("div");
    minTemp.classList = "min-temp";

    const pMinTemp = document.createElement("p");
    pMinTemp.classList = "min-temp";
    pMinTemp.textContent = `${forecast.forecast.forecastday[i].day.mintemp_c}°C`;

    const maxTemp = document.createElement("div");
    maxTemp.classList = "max-temp";

    const pMaxTemp = document.createElement("p");
    pMaxTemp.classList = "max-temp";
    pMaxTemp.textContent = `${forecast.forecast.forecastday[i].day.maxtemp_c}°C`

    minTemp.appendChild(pMinTemp);
    maxTemp.appendChild(pMaxTemp);

    divTemp.append(minTemp, maxTemp);


    const condition = document.createElement("p");
    condition.classList = "current-condition";
    condition.textContent = forecast.forecast.forecastday[i].day.condition.text;

    main.append(h1, divTemp, condition);
}

// Create top bar
function createTopBar(i) {
    const topBar = document.querySelector("div#top-bar");

    const city = document.createElement("p");
    city.classList = "location";
    city.textContent = `${forecast.location.name}, ${forecast.location.country}`;

    const date = document.createElement("p");
    date.classList = "date";
    date.textContent = `${forecast.forecast.forecastday[i].date.split(' ')[0].split('-')[2]}.${forecast.forecast.forecastday[i].date.split(' ')[0].split('-')[1]}.${forecast.forecast.forecastday[i].date.split(' ')[0].split('-')[0]}`;

    const day = document.querySelector("p.day");

    // Assign text value based on current day, today = today, other days = day name
    if (i != 0) {
        const newDay = new Date(forecast.forecast.forecastday[i].date);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        currentDay = newDay.getDay();
    
        day.textContent = dayNames[currentDay];
    } else if (i == 0) {
        day.textContent = "Today";
    }

    topBar.append(city, date);
}

// Function for menu allowing changing the day of foreacst
let currentDay = 0;

document.querySelector("img.next-day-btn").addEventListener("click", () => {
    nextDay(currentDay);
} );

document.querySelector("img.previous-day-btn").addEventListener("click", () => {
    previousDay(currentDay);
})

// I assume this should be done with a loop, but it generated unwanted results so for now its hard coded
// It should also be in another module but caused unexpected results
// function for appending next day
function nextDay(day) {

    switch (day) {
        case 0:
            loadingAnimationOn();
            clearDOM();
            createCharts(1);
            createMain(1);
            createTopBar(1);
            createUV(1);
            createSunchart(1);
            currentDay = 1;
            loadingAnimationOff();
            break;
        case 1:
            loadingAnimationOn();
            clearDOM();
            createCharts(2);
            createMain(2);
            createTopBar(2);
            createUV(2);
            createSunchart(2);
            currentDay = 2;
            loadingAnimationOff();
            break;
        case 2:
            loadingAnimationOn();
            clearDOM();
            createCharts(3);
            createMain(3);
            createTopBar(3);
            createUV(3);
            createSunchart(3);
            currentDay = 3;
            loadingAnimationOff();
            break;
    }

}

// function for appending previous day
function previousDay(day) {

    switch (day) {
        case 3:
            loadingAnimationOn();
            clearDOM();
            createCharts(2);
            createMain(2);
            createTopBar(2);
            createUV(2);
            createSunchart(2);
            currentDay = 2;
            loadingAnimationOff();
            break;
        case 2:
            loadingAnimationOn();
            clearDOM();
            createCharts(1);
            createMain(1);
            createTopBar(1);
            createUV(1);
            createSunchart(1);
            currentDay = 1;
            loadingAnimationOff();
            break;
        case 1:
            loadingAnimationOn();
            clearDOM();
            createCharts(0);
            createMain(0);
            createTopBar(0);
            createUV(0);
            createSunchart(0);
            currentDay = 0;
            loadingAnimationOff();
            break;
    }
}

export {
    createCharts,
    createDOM,
    clearDOM,
    createMain,
    createTopBar,

}