import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "../util/accommodation_container.js";
import createMapboxContainerDOM from '../util/create_mapbox_container.js';
//import FrontpageAccommodations from './frontpage_accommodations.js';
import createPopup from './create_popup.js';
import slideshow from '../util/slideshow.js';
import wishlist from './wishlist.js';

export default async function AsideFiltering() {
	let checkboxDataFilterPropertyType = [];
	let checkboxDataFilterCounty = [];
	let checkboxDataFilterBeds = [];
	let propertyParameter = '';
	let countyParameter = '';
	let bedsParameter = '';
	let accommodations = [];
	let minPrice = '';
	let maxPrice = '';
	let minPriceParameter = '';
	let maxPriceParameter = '';

	const groqQuery = `_type == 'accommodation' `;
	const asideButtons = document.querySelectorAll('.filtering__collapsible-button');
	const sectionFronpageAccommodations = document.querySelector('.frontpage_accommodations');
	const filterButtons = document.querySelectorAll('.filter-buttons__container button');
	const filterButtonAllAccomodation = document.querySelector('.filter-buttons__allaccommodations');
	const priceForm = document.querySelector('.filtering__price-range');
	const minPriceInput = document.querySelector('.filtering__price-range-min-price');
	const maxPriceInput = document.querySelector('.filtering__price-range-max-price');
	const messageTitle = document.querySelector('.frontpage_accommodations__message');

	for (const asideButton of asideButtons) {
		asideButton.addEventListener('click', handleAsideButtonClick);
	}

	function handleAsideButtonClick(event) {
		const currentCheckboxSection = event.currentTarget.parentNode;
		const currentCheckboxes = currentCheckboxSection.querySelectorAll('.filtering__checkbox');

		for (const currentCheckbox of currentCheckboxes) {
			currentCheckbox.addEventListener('click', handleCheckboxClick);
		}
	}

	priceForm.addEventListener('submit', handlePriceFilteringButtonClick);

	async function handleCheckboxClick(event) {
		getCheckboxDataFilter(event);
		addPropertyTypeParameter();
		addCountyParameter();
		addBedsParameter();
		await fetchAccommodations();
		renderHTML();
		createMapboxContainerDOM(accommodations);
		wishlist();
	}

	async function handlePriceFilteringButtonClick(event) {
		event.preventDefault();
		addMinPriceFiltering();
		addMaxPriceFiltering();
		await fetchAccommodations();
		renderHTML();
		createMapboxContainerDOM(accommodations);
		wishlist();
	}

	function addAndRemoveDataFilterPropertyType(currentDataFilter, currentCheckbox) {
		let index = checkboxDataFilterPropertyType.indexOf(currentDataFilter);

		if (currentCheckbox.checked) {
			checkboxDataFilterPropertyType.push(currentDataFilter);
		} else {
			checkboxDataFilterPropertyType.splice(index, 1);
		}
	}

	function addAndRemoveDataFilterCounty(currentDataFilter, currentCheckbox) {
		let index = checkboxDataFilterCounty.indexOf(currentDataFilter);

		if (currentCheckbox.checked) {
			checkboxDataFilterCounty.push(currentDataFilter);
		} else {
			checkboxDataFilterCounty.splice(index, 1);
		}
	}

	function addAndRemoveDataFilterBeds(currentDataFilter, currentCheckbox) {
		let index = checkboxDataFilterBeds.indexOf(currentDataFilter);

		if (currentCheckbox.checked) {
			checkboxDataFilterBeds.push(currentDataFilter);
		} else {
			checkboxDataFilterBeds.splice(index, 1);
		}
	}

	function getCheckboxDataFilter(event) {
		const currentDataFilter = event.currentTarget.dataset.filter;
		const currentCheckbox = event.currentTarget;

		if (currentCheckbox.className === 'filtering__checkbox filtering__checkbox-propertytype') {
			addAndRemoveDataFilterPropertyType(currentDataFilter, currentCheckbox);
		}

		else if (currentCheckbox.className === 'filtering__checkbox filtering__checkbox-countyname') {
			addAndRemoveDataFilterCounty(currentDataFilter, currentCheckbox);
		}

		else if (currentCheckbox.className === 'filtering__checkbox filtering__checkbox-beds') {
			addAndRemoveDataFilterBeds(currentDataFilter, currentCheckbox);	
		}

		//if (checkboxDataFilterPropertyType.length === 0 && checkboxDataFilterCounty.length === 0 && checkboxDataFilterBeds.length === 0) {
		//	FrontpageAccommodations();
		//}
	}

	function addPropertyTypeParameter() {
		if (checkboxDataFilterPropertyType.length > 0) {
			propertyParameter = `&& property_type in $propertyType `;
		} else {
			propertyParameter = '';
		}
	}

	function addCountyParameter() {
		if (checkboxDataFilterCounty.length > 0) {
			countyParameter = `&& county->name in $countyName `;
		} else {
			countyParameter = '';
		}
	}

	function addBedsParameter() {
		if (checkboxDataFilterBeds.length > 0) {
			bedsParameter = `&& beds in $bedQuantity`;
		} else {
			bedsParameter = '';
		}
	}

	function addMinPriceFiltering() {
		minPrice = minPriceInput.value;

		if (minPrice !== '') {
			minPriceParameter = ` && price >= $lowestPrice`;
		} else {
			minPriceParameter = '';
		}
	}

	function addMaxPriceFiltering() {
		maxPrice = maxPriceInput.value;

		if (maxPrice !== '') {
			maxPriceParameter = ` && price <= $highestPrice`;
		} else {
			maxPriceParameter = '';
		}
	}

	async function fetchAccommodations() {
		let query = `*[${groqQuery}${propertyParameter}${countyParameter}${bedsParameter}${minPriceParameter}${maxPriceParameter}] | order(price asc) {
			"image": gallery[0].asset->url,
			"images": gallery[].asset->url,
			"county": county->name,
			city,
			beds,
			price,
			category,
			property_type,
			"longitude": location{longitude},
			"latitude": location{latitude},
			title,
			essentials
		}`;

		const params = {
			propertyType: checkboxDataFilterPropertyType,
			countyName: checkboxDataFilterCounty,
			bedQuantity: checkboxDataFilterBeds,
			lowestPrice: Number(minPrice),
			highestPrice: Number(maxPrice)
		};

		accommodations = await sanity.fetch(query, params);
	}

	function renderHTML() {
		if (accommodations.length === 0) {
			messageTitle.classList.add('frontpage_accommodations__message--visible');
		} else {
			messageTitle.classList.remove('frontpage_accommodations__message--visible');
		}

		for (const button of filterButtons) {
			button.classList.remove('filter-buttons--active');
		}

		filterButtonAllAccomodation.classList.add('filter-buttons--active');
	
		sectionFronpageAccommodations.innerHTML = '';
		minPriceInput.value = '';
		maxPriceInput.value = '';
		minPriceParameter = '';
		maxPriceParameter = '';

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