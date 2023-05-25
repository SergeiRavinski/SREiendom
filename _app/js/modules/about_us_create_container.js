import { t_map } from '../env.js';
import { sanity } from '../sanity.js';

export default async function AboutUsCreateContainer() {
	const mapboxContainer = document.querySelector('#main__mapbox-container');

	const image = document.querySelector('.main__image img');
	const history = document.querySelector('.main__history-container p');
	const openingHoursMondayFriday = document.querySelector('.main__opening-hours-monday-friday');
	const openingHoursSaturdaySunday = document.querySelector('.main__opening-hours-saturday-sunday');
	const emailAddress = document.querySelector('.main__email-address');
	const phoneNumber = document.querySelector('.main__phone-number');
	const query = `*[_type == 'about_us'] {
		"image": image{asset->{url}},
		"history": history[0]{children[0]{text}},
		openingHoursMondayFriday,
		openingHoursSaturdaySunday,
		emailAddress,
		phoneNumber,
		"longitude": location{longitude},
  		"latitude": location{latitude}
	}`;
	const information = await sanity.fetch(query);

	information.forEach(element => {
		image.src = `${element.image.asset.url}`;
		history.innerText = `${element.history.children.text}`;
		openingHoursMondayFriday.innerText = `${element.openingHoursMondayFriday}`;
		openingHoursSaturdaySunday.innerText = `${element.openingHoursSaturdaySunday}`;
		emailAddress.innerText = `${element.emailAddress}`;
		phoneNumber.innerText = `+${element.phoneNumber}`;

		let center = [`${element.latitude.latitude}`, `${element.longitude.longitude}`];
		mapboxgl.accessToken = t_map;
		
		const map = new mapboxgl.Map({
			container: mapboxContainer, 
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
	});
}