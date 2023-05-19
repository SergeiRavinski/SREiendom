import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "./accommodation_container.js";
import createMapboxContainer from "./create_mapbox_container.js";
import createPopup from "./create_popup.js";
import slideshow from './slideshow.js';

export default async function FrontpageAccommodations() {
	const query = `*[_type == 'accommodation'] | order(price asc) {
		"image": gallery[0].asset->url,
		"images": gallery[].asset->url,
		"county": county->name,
		city,
		beds,
		price,
		"longitude": location{longitude},
		"latitude": location{latitude},
		title,
		essentials
	}`;
	const accommodations = await sanity.fetch(query);
	const sectionFronpageAccommodations = document.querySelector('.frontpage_accommodations');

	function renderHTML() {
		accommodations.forEach(element => {
			let accomodationTemplate = createAccommodationContainerDOM(element);
			sectionFronpageAccommodations.appendChild(accomodationTemplate);

			accomodationTemplate.addEventListener('click', () => {
				createPopup(element);
			});
		});
	}

	renderHTML();
	createMapboxContainer(accommodations);
	slideshow();
}