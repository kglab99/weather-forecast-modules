import { forecast } from './fetch';


function windy() {
	const options = {
		// Required: API key
		key: 'Masr0kQb78aTZ67FGIbNe8Nyz1uHr0a1', 
	
		// Put additional console output
		verbose: false,
	
		// Optional: Initial state of the map
		lat: forecast.location.lat,
		lon: forecast.location.lon,
		zoom: 4,
	};
	
	// Initialize Windy API
	windyInit(options, windyAPI => {
		// windyAPI is ready, and contain 'map', 'store',
		// 'picker' and other usefull stuff
	
		const { map } = windyAPI;
		// .map is instance of Leaflet map
	
	});

}




export {windy}