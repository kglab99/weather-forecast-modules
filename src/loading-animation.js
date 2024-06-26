// Loading animation on/off as a placeholder for fetching APIs that happen to be time consuming
function loadingAnimationOn() {
  document.querySelector("div.container").style.display = "flex";
  document.querySelector("div#search").style.display = "none";
  document.querySelector("div#menu").style.display = "none";
  document.querySelector("div#top-bar").style.display = "none";
  document.querySelector("div#main").style.display = "none";
  document.querySelector("div#charts").style.display = "none";
  document.querySelector("div#windy").style.display = "none";
  document.querySelector("div#UV-container").style.display = "none";
  document.querySelector("div#moonphase").style.display = "none";
  document.querySelector("div#air-quality").style.display = "none";
  document.querySelector("div#sun-time").style.display = "none";
  // document.querySelector("div#details").style.display = "none";
  document.querySelector("div#sun-time").style.display = "none";
  document.querySelector("div#hero").style.display = "none";
  document.querySelector("div#bottom").style.display = "none";


}

function loadingAnimationOff() {
  document.querySelector("div.container").style.display = "none";
  document.querySelector("div#search").style.display = "flex";
  document.querySelector("div#menu").style.display = "flex";
  document.querySelector("div#top-bar").style.display = "flex";
  document.querySelector("div#main").style.display = "flex";
  document.querySelector("div#charts").style.display = "flex";
  document.querySelector("div#windy").style.display = "flex";
  document.querySelector("div#UV-container").style.display = "flex";
  document.querySelector("div#moonphase").style.display = "flex";
  document.querySelector("div#air-quality").style.display = "flex";
  document.querySelector("div#sun-time").style.display = "flex";
  // document.querySelector("div#details").style.display = "flex";
  document.querySelector("div#sun-time").style.display = "flex";
  document.querySelector("div#hero").style.display = "flex";
  document.querySelector("div#bottom").style.display = "flex";


}

export { loadingAnimationOff, loadingAnimationOn };
