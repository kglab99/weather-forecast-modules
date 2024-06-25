import {forecast} from './fetch'
import badImg from '../assets/air_pollution/bad-quality.jpg';
import extremeImg from '../assets/air_pollution/extreme-quality.jpg';
import goodImg from '../assets/air_pollution/good-quality.jpg';
import moderateImg from '../assets/air_pollution/moderate-quality.jpg';


function createAirQuality(i) {
    let defraIndex = forecast.forecast.forecastday[i].day.air_quality["gb-defra-index"];
    console.log(defraIndex);

    let defraDiv = document.querySelector("div#air-quality");

    let defraTitle = document.createElement("h1");
    defraTitle.className = "air-quality";
    defraTitle.textContent = "Air quality";

    let defraSubtitle = document.createElement("h2");
    defraSubtitle.className = "air-quality";

    let defraText = document.createElement("p");
    defraText.className = "air-quality";

    let defraImg = document.createElement("img");
    defraImg.className = "air-quality";

    if (defraIndex > 9) {
        defraText.textContent = "Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat.";
        defraSubtitle.textContent = "Extremely bad";
        defraImg.src = extremeImg;
    } else if (defraIndex > 6) {
        defraText.textContent = "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors.";
        defraSubtitle.textContent = "Bad";
        defraImg.src = badImg;
    } else if (defraIndex > 3) {
        defraText.textContent = "Enjoy your usual outdoor activities.";
        defraSubtitle.textContent = "Moderate";
        defraImg.src = moderateImg;
    } else if (defraIndex > 0) {
        defraText.textContent = "Enjoy your usual outdoor activities.";
        defraSubtitle.textContent = "Good";
        defraImg.src = goodImg;
    } 

    defraDiv.append(defraTitle, defraSubtitle, defraText, defraImg);
}



export {
    createAirQuality,
}