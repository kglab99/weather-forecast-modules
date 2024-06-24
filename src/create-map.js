// Import forecast to get current location data
import { forecast } from './fetch';

// Fetch and create wind map based on coordinates
function windMap() {
	const options = {
		key: 'Masr0kQb78aTZ67FGIbNe8Nyz1uHr0a1', 
	
		verbose: false,
	
		lat: forecast.location.lat,
		lon: forecast.location.lon,
		zoom: 4,
	};
	
	windyInit(options);

}

export {windMap}