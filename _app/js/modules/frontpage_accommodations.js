import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "../util/accommodation_container.js";
import createMapboxContainer from "../util/create_mapbox_container.js";
import createPopup from "./create_popup.js";
import slideshow from '../util/slideshow.js';
import wishlist from './wishlist.js';

export default async function FrontpageAccommodations() {
	const query = `*[_type == 'accommodation'] | order(price asc) {
		"image": gallery[0].asset->url,
		"images": gallery[].asset->url,
		"imagesSlideshow": gallery_slideshow[].asset->url,
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
	const sectionFronpageAccommodations = document.querySelector('.main__frontpage_accommodations');

	function renderHTML() {
		accommodations.forEach(element => {
			let accommodationTemplate = createAccommodationContainerDOM(element);
			sectionFronpageAccommodations.appendChild(accommodationTemplate);

			accommodationTemplate.addEventListener('click', () => {
				createPopup(element);
			});

			slideshow(accommodationTemplate);
		});
	}

	renderHTML();
	createMapboxContainer(accommodations);
	wishlist();
}