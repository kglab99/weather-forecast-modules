// Normalize special characters to one used by weather API
function normalizeString(str) {
    const iMap = {
        'ð': 'd',
        'ı': 'i',
        'Ł': 'L',
        'ł': 'l',
        'ø': 'o',
        'ß': 'ss',
        'ü': 'ue'
    };
    const iRegex = new RegExp(Object.keys(iMap).join('|'), 'g')
    return str
        .replace(iRegex, (m) => iMap[m])
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '');
    }

// Convert date to weekday
function getWeekday(date){
    const date0 = new Date(date);
    const day = date0.getDay();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[day];
}

// Error display
function displayError() {
    const body = document.querySelector("body");
    const errorMessage = document.createElement("h1");
    errorMessage.textContent = "Error. Please reload page.";
    body.insertAdjacentElement("afterbegin",errorMessage);
}

// Hide geolocaiton prompt
function hidePrompt() {
    // document.querySelector("div.prompt").style.display = "none";
}

export {
    hidePrompt,
    displayError,
    getWeekday,
    normalizeString
}