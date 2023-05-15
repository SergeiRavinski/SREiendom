import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "./accommodation_container.js";
import createMapboxContainer from "./createMapboxContainer.js";

export default async function FrontpageAccommodations() {

	const query = `*[_type == 'accommodation'] | order(price asc) {
		"image": gallery[0].asset->url,
		"county": county->name,
		city,
		beds,
		price
	}`;
	const accommodations = await sanity.fetch(query);
	const sectionFronpageAccommodations = document.querySelector('.frontpage_accommodations');

	createAccommodationContainerDOM(accommodations, sectionFronpageAccommodations);

	//function renderHTML() {
	//	createAccommodationContainerDOM();
	//}

	createMapboxContainer(accommodations);
}