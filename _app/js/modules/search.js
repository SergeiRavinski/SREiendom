import { sanity } from '../sanity.js';
import createMapboxContainerDOM from '../util/create_mapbox_container.js';
import createAccommodationContainerDOM from "../util/accommodation_container.js";
import createPopup from './create_popup.js';
import slideshow from '../util/slideshow.js';
import wishlist from './wishlist.js';

export default async function Search() {
	let accommodationSearchText = '';
	let foundAccommodation = [];

	const searchListInput = document.querySelector('.aside__filtering-search-bar');
	const searchInput = document.querySelector('.aside__filtering-search-bar-input');	
	const foundAccommodationListResult = document.querySelector('.main__search-result');
	const foundAccommodationListResultTitle = document.querySelector('.main__search-result h2');
	const sectionFronpageAccommodations = document.querySelector('.main__search-result-container');
	const searchCloseButton = document.querySelector('.main__search-result-header button');
	const frontpageAccommodations = document.querySelector('.main__frontpage');
	
	searchListInput.addEventListener('submit', handleSearchInput);
	searchCloseButton.addEventListener('click', handleCloseButton);

	async function handleSearchInput(event) {
		event.preventDefault();
		accommodationSearchText = searchInput.value;
		await fetchAccommodations();
		inputRenderHTML();
		renderHTML();
		createMapboxContainerDOM(foundAccommodation);
		wishlist();
	}

	function handleCloseButton() {
		closeButtonRenderHTML();
	}

	//Fetch accommodations
	async function fetchAccommodations() {
		const query = `*[_type == 'accommodation' && [county->name, city, beds] match [$countyName + '*', $cityName + '*', $bedsQuantity + '*']] | order(price asc) {
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
		const params = {
			countyName: accommodationSearchText,
			cityName: accommodationSearchText,
			bedsQuantity: accommodationSearchText 
		};
    
		foundAccommodation = await sanity.fetch(query, params);
	}
	 
	function inputRenderHTML() {
		foundAccommodationListResult.classList.add('main__search-result--visible');
		frontpageAccommodations.classList.add('main__frontpage--invisible');
		searchInput.value = '';
	}

	function closeButtonRenderHTML() {
		foundAccommodationListResult.classList.remove('main__search-result--visible');
		frontpageAccommodations.classList.remove('main__frontpage--invisible');
	}	

	function renderHTML() {
		sectionFronpageAccommodations.innerHTML = '';

		if (foundAccommodation.length > 0) {
			foundAccommodationListResultTitle.innerText = `Search results for: ${accommodationSearchText}`; 

			foundAccommodation.forEach(element => {
				let accommodationTemplate = createAccommodationContainerDOM(element);
				sectionFronpageAccommodations.appendChild(accommodationTemplate);

				accommodationTemplate.addEventListener('click', () => {
					createPopup(element);
				});

				slideshow(accommodationTemplate);
			});
		} else {
			foundAccommodationListResultTitle.innerText = `Sorry, but nothing matched your search terms. Please try again with some different keywords.`; 
		}	
	}

	renderHTML();
}