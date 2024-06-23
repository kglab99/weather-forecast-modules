import {forecast, today} from './fetch'

let temp = [];
let wind = [];
let rain = [];
let condition = [];

function createCharts(i) {
    temp = [];
    wind = [];
    rain = [];
    forecast.forecast.forecastday[i].hour.forEach((element) => {
        temp.push([element.time.split(' ')[1], element.temp_c]);
        wind.push([element.time.split(' ')[1], element.wind_kph]);
        rain.push([element.time.split(' ')[1], element.chance_of_rain]);
    })

    new Chartkick.LineChart("temperature", temp, {ytitle: "Temperature", points: false, loading: "Loading...", suffix: "°C", empty: "No data"});
    new Chartkick.LineChart("wind", wind, {ytitle: "Wind speed", points: false, loading: "Loading...", suffix: "km/h", empty: "No data"});
    new Chartkick.LineChart("rain", rain, {ytitle: "Chance of rain", points: false, loading: "Loading...", suffix: "%", empty: "No data"});
}

function createHours(i) {
    condition = [];
    forecast.forecast.forecastday[i].hour.forEach((element) => {
        condition.push([element.time.split(' ')[1], element.condition.text, element.condition.icon]);
    })

    let hoursBody = document.querySelector("div#hours");

    condition.forEach((element) => {
        const div = document.createElement("div");
        div.classList = "hour";

        const p = document.createElement("p");
        p.classList = "hour-time";
        p.textContent = element[0];

        const img = document.createElement("img");
        img.classList = "hour-condition";
        img.src = element[2];

        div.appendChild(p);
        div.appendChild(img);
        hoursBody.appendChild(div);
    })
}

function createMain(i) {
    const main = document.querySelector("div#main");

    const h1 = document.createElement("h1");
    h1.classList = "current-temp";
    h1.textContent = `${forecast.forecast.forecastday[i].day.avgtemp_c}°C`;

    const condition = document.createElement("p");
    condition.classList = "current-condition";
    condition.textContent = forecast.forecast.forecastday[i].day.condition.text;

    main.append(h1, condition);
}

function createTopBar(i) {
    const topBar = document.querySelector("div#top-bar");

    const city = document.createElement("p");
    city.classList = "location";
    city.textContent = `${forecast.location.name}, ${forecast.location.country}`;

    const date = document.createElement("p");
    date.classList = "date";
    date.textContent = `${forecast.forecast.forecastday[i].date.split(' ')[0].split('-')[2]}.${forecast.forecast.forecastday[i].date.split(' ')[0].split('-')[1]}.${forecast.forecast.forecastday[i].date.split(' ')[0].split('-')[0]}`;

    const day = document.querySelector("p.day");

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

function createDOM(i) {
    clearDOM();
    createCharts(i);
    createHours(i);
    createMain(i);
    createTopBar(i);
}

function clearDOM() {
    document.querySelector("div#top-bar").innerHTML = "";
    document.querySelector("div#main").innerHTML = "";
    document.querySelector("div#hours").innerHTML = "";
}


let currentDay = 0;

document.querySelector("img.next-day-btn").addEventListener("click", () => {
    nextDay(currentDay);
} );

document.querySelector("img.previous-day-btn").addEventListener("click", () => {
    previousDay(currentDay);
})

function nextDay(day) {

    if (day == 0) {
        clearDOM();
        createCharts(1);
        createHours(1);
        createMain(1);
        createTopBar(1);
        currentDay = 1;
    } else if (day == 1 ) {
        clearDOM();
        createCharts(2);
        createHours(2);
        createMain(2);
        createTopBar(2);
        currentDay = 2;
    } else if (day == 2) {
        clearDOM();
        createCharts(3);
        createHours(3);
        createMain(3);
        createTopBar(3);
        currentDay = 3;
    }

}

function previousDay(day) {

    if (day == 3) {
        clearDOM();
        createCharts(2);
        createHours(2);
        createMain(2);
        createTopBar(2);
        currentDay = 2;
    } else if (day == 2 ) {
        clearDOM();
        createCharts(1);
        createHours(1);
        createMain(1);
        createTopBar(1);
        currentDay = 1;
    } else if (day == 1) {
        clearDOM();
        createCharts(0);
        createHours(0);
        createMain(0);
        createTopBar(0);
        currentDay = 0;
    }

}



export {
    createCharts,
    createHours,
    createDOM
}