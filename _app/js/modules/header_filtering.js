import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "../util/accommodation_container.js";
import createMapboxContainerDOM from "../util/create_mapbox_container.js";
import createPopup from './create_popup.js';
import slideshow from '../util/slideshow.js';
import wishlist from './wishlist.js';

export default async function HeaderFiltering() {
	let datasetCategory = '';
	let accommodations = [];

	const sectionFronpageAccommodations = document.querySelector('.main__frontpage_accommodations');
	const filterButtons = document.querySelectorAll('.body__filter-buttons-container button');
	const checkboxes = document.querySelectorAll('.aside__filtering-checkbox');
	const asideOptions = document.querySelectorAll('.aside__filtering-collapsible-options > div');
	const asideCollapsibleButtonArrow = document.querySelectorAll('.aside__filtering-collapsible-button img');
	
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

	function addUnderlineToActiveButton(event) {
		let currentActiveButton = event.currentTarget;
		renderHTML(currentActiveButton);
	}

	function getCategory(event) {
		datasetCategory = event.currentTarget.dataset.category;

		if (datasetCategory === 'all accommodations') {
			datasetCategory = '*';
		}
	}

	async function fetchAccommodations() {
		const query = `*[_type == 'accommodation' && category match $category] | order(price asc) {
			"image": gallery[0].asset->url,
			"images": gallery[].asset->url,
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

		accommodations = await sanity.fetch(query, params);
	}

	function renderHTML(currentActiveButton) {
		for (const checkbox of checkboxes) {
			checkbox.checked = false;
		}

		for (const asideOption of asideOptions) {
			asideOption.style.display = 'none';
		}

		for (const collapsibleArrow of asideCollapsibleButtonArrow) {
			collapsibleArrow.style.transform = 'rotateX(180deg)';
		}

		if (currentActiveButton) {
			for (const button of filterButtons) {
				button.classList.remove('body__filter-buttons--active');
			}

			currentActiveButton.classList.add('body__filter-buttons--active');
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