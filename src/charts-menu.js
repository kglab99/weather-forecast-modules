// Adds charts menu to choose chart dynamically

const divTemperature = document.querySelector("div#temperature");
const divRain = document.querySelector("div#rain");
const divWind = document.querySelector("div#wind");

const btnTemperature = document.querySelector("h2.temperature-btn");
const btnWind = document.querySelector("h2.wind-btn");
const btnRain = document.querySelector("h2.rain-btn");

btnTemperature.addEventListener("click", () => {
    divRain.style.display = "none";
    divTemperature.style.display = "flex";
    divWind.style.display = "none";


    btnWind.style.fontWeight = "400";
    btnTemperature.style.fontWeight = "600";
    btnRain.style.fontWeight = "400";
})

btnRain.addEventListener("click", () => {
    divRain.style.display = "flex";
    divTemperature.style.display = "none";
    divWind.style.display = "none";

    btnWind.style.fontWeight = "400";
    btnTemperature.style.fontWeight = "400";
    btnRain.style.fontWeight = "600";
})

btnWind.addEventListener("click", () => {
    divRain.style.display = "none";
    divTemperature.style.display = "none";
    divWind.style.display = "flex";

    btnWind.style.fontWeight = "600";
    btnTemperature.style.fontWeight = "400";
    btnRain.style.fontWeight = "400";
})

export {
    divTemperature, divRain, divWind, btnRain, btnTemperature, btnWind
}