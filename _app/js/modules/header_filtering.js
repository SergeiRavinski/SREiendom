import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "../util/accommodation_container.js";
import createMapboxContainerDOM from "../util/create_mapbox_container.js";
import createPopup from './create_popup.js';
import slideshow from '../util/slideshow.js';
import wishlist from './wishlist.js';

//Filtering by category in the header
export default async function HeaderFiltering() {
	let datasetCategory = '';
	let accommodations = [];

	const sectionFronpageAccommodations = document.querySelector('.main__frontpage_accommodations');
	const filterButtons = document.querySelectorAll('.body__filter-buttons-container button');
	const checkboxes = document.querySelectorAll('.aside__filtering-checkbox');
	const asideOptions = document.querySelectorAll('.aside__filtering-collapsible-options > div');
	const asideCollapsibleButtonArrow = document.querySelectorAll('.aside__filtering-collapsible-button img');
	const priceInput = document.querySelectorAll('.aside__filtering-price');
	const messageTitle = document.querySelector('.main__frontpage_accommodations-message');
	
	//Loop through filter buttons in the header
	for (const button of filterButtons) {
		button.addEventListener('click', handleFilterButtonClick);
	}

	async function handleFilterButtonClick(event) {
		addUnderlineToActiveButton(event);
		getCategory(event);
		await fetchAccommodations();
		renderHTML();
		createMapboxContainerDOM(accommodations);
		wishlist();
	}

	//Display the active button
	function addUnderlineToActiveButton(event) {
		let currentActiveButton = event.currentTarget;
		renderHTML(currentActiveButton);
	}

	//Get current category
	function getCategory(event) {
		datasetCategory = event.currentTarget.dataset.category;

		if (datasetCategory === 'all accommodations') {
			datasetCategory = '*';
		}
	}

	//Fetch accommodations
	async function fetchAccommodations() {
		const loadingPopup = document.querySelector('.body__loader-popup');
		const messagePopup = document.querySelector('.body__message-popup');
		const message = document.querySelector('.body__message-popup h3');
		const query = `*[_type == 'accommodation' && category match $category] | order(price asc) {
			"image": gallery[0].asset->url,
			"images": gallery[].asset->url,
			"imagesSlideshow": gallery_slideshow[].asset->url,
			"county": county->name,
			city,
			beds,
			price,
			category,
			"longitude": location{longitude},
			"latitude": location{latitude},
			title,
			essentials
		}`;
		const params = {	
			category: datasetCategory
		};

		//Handle request
		try {
			showLoadingAnimation();
			accommodations = await sanity.fetch(query, params);
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
	}

	function renderHTML(currentActiveButton) {
		//Remove all parameters from the aside filtering
		for (const checkbox of checkboxes) {
			checkbox.checked = false;
		}

		for (const asideOption of asideOptions) {
			asideOption.style.display = 'none';
		}

		for (const collapsibleArrow of asideCollapsibleButtonArrow) {
			collapsibleArrow.style.transform = 'rotateX(180deg)';
		}

		if (priceInput) {
			for (const price of priceInput) {
				price.value = '';
			}
		}

		//Add the active button
		if (currentActiveButton) {
			for (const button of filterButtons) {
				button.classList.remove('body__filter-buttons--active');
			}

			currentActiveButton.classList.add('body__filter-buttons--active');
		}

		if (messageTitle) {
			messageTitle.classList.remove('main__frontpage_accommodations-message--visible');
		}
		
		sectionFronpageAccommodations.innerHTML = '';
		accommodations.forEach(element => {
			let accommodationTemplate = createAccommodationContainerDOM(element);
			sectionFronpageAccommodations.appendChild(accommodationTemplate);

			accommodationTemplate.addEventListener('click', () => {
				createPopup(element);
			});

			slideshow(accommodationTemplate);
		});
	}
}