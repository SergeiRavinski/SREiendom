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
	const sectionFronpageAccommodations = document.querySelector('.main__frontpage_accommodations');
	const loadingPopup = document.querySelector('.body__loader-popup');
	const messagePopup = document.querySelector('.body__message-popup');
	const message = document.querySelector('.body__message-popup h3');

	let accommodations;

	//Handle request
	try {
		showLoadingAnimation();
		accommodations = await sanity.fetch(query);
		hideLoadingAnimation();
	} catch {
		hideLoadingAnimation();
		handleError();
	}
	
	function showLoadingAnimation() {
		loadingPopup.classList.add('body__loader-popup--visible');
	}
	
	function hideLoadingAnimation() {
		loadingPopup.classList.remove('body__loader-popup--visible');
	}
	
	function handleError() {
		messagePopup.classList.add('body__message-popup--visible');
		message.textContent = new Error('Something went wrong');
	}

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