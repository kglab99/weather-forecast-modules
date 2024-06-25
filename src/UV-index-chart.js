import ProgressBar from "progressbar.js/dist/progressbar";
import { forecast } from "./fetch";

function createUV(i) {
  var bar = new ProgressBar.SemiCircle(UV, {
    strokeWidth: 4,
    color: "#000",
    trailColor: "#eee",
    trailWidth: 1,
    easing: "easeInOut",
    duration: 500,
    svgStyle: null,
    text: {
      value: "",
      alignToBottom: false,
    },
    from: { color: setUVColor(i) },
    to: { color: setUVColor(i) },
    // Set default step function for all animate calls
    step: (state, bar) => {
      bar.path.setAttribute("stroke", state.color);
      var value = Math.round(bar.value() * 11);
      if (value === 0) {
        bar.setText("");
      } else {
        bar.setText(value);
      }

      bar.text.style.color = state.color;
    },
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = "2rem";

  bar.animate(forecast.forecast.forecastday[i].day.uv / 1.1 / 10);

  customizeUV();
  addUVDescription(i);
}

function customizeUV() {
  document.querySelector("div.progressbar-text").style.bottom = "30px";
  document.querySelector(
    "div#UV > svg > path:nth-child(2)"
  ).style.strokeLinecap = "round";
}

function setUVColor(i) {
  let color;

  let UV = forecast.forecast.forecastday[i].day.uv;
  if (UV > 10) {
    color = "#ff0000";
  } else if (UV > 7) {
    color = "#ff5800";
  } else if (UV > 5) {
    color = "#ffff00";
  } else if (UV > 2) {
    color = "#FFD900";
  } else if (UV > 0) {
    color = "#00ff00";
  }

  return color;
}

function addUVDescription(i) {
  let div = document.querySelector("div#UV");
  let descriptionP = document.createElement("p");
  descriptionP.className = "UV-description";

  let UV = forecast.forecast.forecastday[i].day.uv;
  let description;

  if (UV > 10) {
    description = "Extreme";
  } else if (UV > 7) {
    description = "Very high";
  } else if (UV > 5) {
    description = "High";
  } else if (UV > 2) {
    description = "Moderate";
  } else if (UV > 0) {
    description = "Low";
  }

  descriptionP.textContent = description;
  div.appendChild(descriptionP);
}

export { createUV };
