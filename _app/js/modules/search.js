import { sanity } from '../sanity.js';
import createMapboxContainerDOM from './createMapboxContainer.js';
import FrontpageAccommodations from './frontpage_accommodations.js';
import createAccommodationContainerDOM from "./accommodation_container.js";

export default async function Search() {
	let accommodationSearchText = '';
	let foundAccommodation = [];

	const searchListInput = document.querySelector('.filtering__search-bar');
	const searchInput = document.querySelector('.filtering__search-bar-input');	
	const foundAccommodationListResult = document.querySelector('.search-result');
	const foundAccommodationListResultTitle = document.querySelector('.search-result h2');
	const sectionFronpageAccommodations = document.querySelector('.search-result__container');
	const searchCloseButton = document.querySelector('.search-result__header button');
	const frontpageAccommodations = document.querySelector('.frontpage_accommodations');
	
	searchListInput.addEventListener('submit', handleSearchInput);
	searchCloseButton.addEventListener('click', handleCloseButton);

	async function handleSearchInput(event) {
		event.preventDefault();
		accommodationSearchText = searchInput.value;
		await fetchAccommodations();
		inputRenderHTML();
		renderHTML();
		createMapboxContainerDOM(foundAccommodation);
	}

	function handleCloseButton() {
		closeButtonRenderHTML();
		FrontpageAccommodations();
	}

	async function fetchAccommodations() {
		const query = `*[_type == 'accommodation' && [county->name, city, beds] match [$countyName + '*', $cityName + '*', $bedsQuantity + '*']] | order(price asc) {
			"image": gallery[0].asset->url,
			"county": county->name,
			city,
			beds,
			price,
			"longitude": location{longitude},
			"latitude": location{latitude},
			title
		}`;

		const params = {
			countyName: accommodationSearchText,
			cityName: accommodationSearchText,
			bedsQuantity: accommodationSearchText 
		};
    
		foundAccommodation = await sanity.fetch(query, params);
	}
	 
	function inputRenderHTML() {
		foundAccommodationListResult.classList.add('search-result--visible');
		frontpageAccommodations.classList.add('frontpage_accommodations--invisible');
		searchInput.value = '';
	}

	function closeButtonRenderHTML() {
		foundAccommodationListResult.classList.remove('search-result--visible');
		frontpageAccommodations.classList.remove('frontpage_accommodations--invisible');
	}	

	function renderHTML() {
		sectionFronpageAccommodations.innerHTML = '';

		if (foundAccommodation.length > 0) {
			foundAccommodationListResultTitle.innerText = `Search results for: ${accommodationSearchText}`; 

			foundAccommodation.forEach(element => {
				let accomodationTemplate = createAccommodationContainerDOM(element);
				sectionFronpageAccommodations.appendChild(accomodationTemplate);
			});
		} else {
			foundAccommodationListResultTitle.innerText = `Sorry, but nothing matched your search terms. Please try again with some different keywords.`; 
		}	
	}

	renderHTML();
}
