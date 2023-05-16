import { t_map } from '../env.js';

export default function createMapboxContainerDOM(accommodations) {
	const containerMapbox = document.querySelector('#filtering__mapbox');
	containerMapbox.innerHTML = '';

	mapboxgl.accessToken = t_map;
	let center = [10.757933, 59.911491];
	const bounds = new mapboxgl.LngLatBounds();
	const zoomLevel = 5
	
	const map = new mapboxgl.Map({
		container: containerMapbox,
		style: 'mapbox://styles/mapbox/streets-v12',
		center: center,
		zoom: zoomLevel,
		cooperativeGestures: true
	});
	
	accommodations.forEach(accommodation => {
		const markerElement = document.createElement('div');
		const coordinates = [`${accommodation.longitude.longitude}`, `${accommodation.latitude.latitude}`];

		markerElement.classList.add('marker');
		const popup = new mapboxgl
			.Popup({ offset: 27 })
			.setHTML('<a href="' + '#' + '">' + accommodation.title + '</a>')

		new mapboxgl.Marker(markerElement)
			.setLngLat(coordinates) 
			.setPopup(popup)
			.addTo(map)
		
		markerElement.addEventListener('click', () => {
			map.flyTo({
				center: ([`${accommodation.longitude.longitude}`, `${accommodation.latitude.latitude}`]),
				essential: true,
				zoom: 10  
			});
		});
		bounds.extend(coordinates);
	});
	
	map.addControl(new mapboxgl.FullscreenControl());
	map.addControl(new mapboxgl.NavigationControl());
	map.fitBounds(bounds, { padding: 30 });
}