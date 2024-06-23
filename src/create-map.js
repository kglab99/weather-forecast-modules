import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { forecast } from './fetch';

// let lat;
// let lng;

// navigator.geolocation.getCurrentPosition(setPosition);

// function setPosition(position) {
//     lat = position.coords.latitude;
//     lng = position.coords.longitude;
// }

function map() {
    console.log(forecast);
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2dsYWIiLCJhIjoiY2x4bmprcWRiMDN4bjJrc2V6dW96aW5kdSJ9.lYprz-oxnt8vd-hJgwiX4g';
    const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [forecast.location.lon, forecast.location.lat], // starting position [lng, lat]
	zoom: 9, // starting zoom
});
}

export {map}