import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "./accommodation_container.js";
import createMapboxContainerDOM from "./create_mapbox_container.js";
import createPopup from './create_popup.js';

export default async function HeaderFiltering() {
	let datasetCategory = '';
	let accommodations = [];

	const sectionFronpageAccommodations = document.querySelector('.frontpage_accommodations');
	const filterButtons = document.querySelectorAll('.filter-buttons__container button');
	const checkboxes = document.querySelectorAll('.filtering__checkbox');
	const asideOptions = document.querySelectorAll('.filtering__collapsible-options > div');
	const asideCollapsibleButtonArrow = document.querySelectorAll('.filtering__collapsible-button img');
	
	for (const button of filterButtons) {
		button.addEventListener('click', handleFilterButtonClick);
	}

	async function handleFilterButtonClick(event) {
		addUnderlineToActiveButton(event);
		getCategory(event);
		await fetchAccommodations();
		renderHTML();
		createMapboxContainerDOM(accommodations);
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
				button.classList.remove('filter-buttons--active');
			}

			currentActiveButton.classList.add('filter-buttons--active');
		}

		sectionFronpageAccommodations.innerHTML = '';
		accommodations.forEach(element => {
			let accomodationTemplate = createAccommodationContainerDOM(element);
			sectionFronpageAccommodations.appendChild(accomodationTemplate);

			accomodationTemplate.addEventListener('click', () => {
				createPopup(element);
			});
		});
	}

	renderHTML();
}