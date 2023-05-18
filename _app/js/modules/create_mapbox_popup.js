import { t_map } from '../env.js';

export default function createMapboxPopupDOM(element) {
	let containerMapboxPopup = document.querySelector('#main__popup-mapbox');
	containerMapboxPopup.innerHTML = '';
	let center = [`${element.longitude.longitude}`, `${element.latitude.latitude}`];
	mapboxgl.accessToken = t_map;
	
	const map = new mapboxgl.Map({
		container: containerMapboxPopup, 
		style: 'mapbox://styles/mapbox/streets-v12',
		center: center,
		zoom: 10,
	});

	const markerElement = document.createElement('div');
	markerElement.classList.add('marker');

	new mapboxgl.Marker(markerElement)
		.setLngLat(center)
		.addTo(map);

	markerElement.addEventListener('click', () => {
		map.flyTo({
			center: center,
			essential: true,
			zoom: 14,
		});
	});

	map.addControl(new mapboxgl.FullscreenControl());
	map.addControl(new mapboxgl.NavigationControl());
}	