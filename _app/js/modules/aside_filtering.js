import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "../util/accommodation_container.js";
import createMapboxContainerDOM from '../util/create_mapbox_container.js';
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
	const asideButtons = document.querySelectorAll('.aside__filtering-collapsible-button');
	const sectionFronpageAccommodations = document.querySelector('.main__frontpage_accommodations');
	const filterButtons = document.querySelectorAll('.body__filter-buttons-container button');
	const filterButtonAllAccomodation = document.querySelector('.body__filter-buttons-allaccommodations');
	const priceForm = document.querySelector('.aside__filtering-price-range');
	const minPriceInput = document.querySelector('.aside__filtering-price-range-min-price');
	const maxPriceInput = document.querySelector('.aside__filtering-price-range-max-price');
	const messageTitle = document.querySelector('.main__frontpage_accommodations-message');

	//Loop through collapsible buttons
	for (const asideButton of asideButtons) {
		asideButton.addEventListener('click', handleAsideButtonClick);
	}

	//Get current checkbox section and loop through current checkboxes
	function handleAsideButtonClick(event) {
		const currentCheckboxSection = event.currentTarget.parentNode;
		const currentCheckboxes = currentCheckboxSection.querySelectorAll('.aside__filtering-checkbox');

		for (const currentCheckbox of currentCheckboxes) {
			currentCheckbox.addEventListener('click', handleCheckboxClick);
		}
	}

	//EventListener for the filtering by price
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

	//Direct to the correct function depending on the checkbox class name
	function getCheckboxDataFilter(event) {
		const currentDataFilter = event.currentTarget.dataset.filter;
		const currentCheckbox = event.currentTarget;

		if (currentCheckbox.className === 'aside__filtering-checkbox aside__filtering-checkbox-propertytype') {
			addAndRemoveDataFilterPropertyType(currentDataFilter, currentCheckbox);
		}

		else if (currentCheckbox.className === 'aside__filtering-checkbox aside__filtering-checkbox-countyname') {
			addAndRemoveDataFilterCounty(currentDataFilter, currentCheckbox);
		}

		else if (currentCheckbox.className === 'aside__filtering-checkbox aside__filtering-checkbox-beds') {
			addAndRemoveDataFilterBeds(currentDataFilter, currentCheckbox);	
		}
	}

	//Push and remove current value to the property type array
	function addAndRemoveDataFilterPropertyType(currentDataFilter, currentCheckbox) {
		let index = checkboxDataFilterPropertyType.indexOf(currentDataFilter);

		if (currentCheckbox.checked) {
			checkboxDataFilterPropertyType.push(currentDataFilter);
		} else {
			checkboxDataFilterPropertyType.splice(index, 1);
		}
	}

	//Push and remove current value to the county array
	function addAndRemoveDataFilterCounty(currentDataFilter, currentCheckbox) {
		let index = checkboxDataFilterCounty.indexOf(currentDataFilter);

		if (currentCheckbox.checked) {
			checkboxDataFilterCounty.push(currentDataFilter);
		} else {
			checkboxDataFilterCounty.splice(index, 1);
		}
	}

	//Push and remove current value to the beds array
	function addAndRemoveDataFilterBeds(currentDataFilter, currentCheckbox) {
		let index = checkboxDataFilterBeds.indexOf(currentDataFilter);

		if (currentCheckbox.checked) {
			checkboxDataFilterBeds.push(currentDataFilter);
		} else {
			checkboxDataFilterBeds.splice(index, 1);
		}
	}

	//Add and remove parameters for property type in query to avoid the problem when an array is empty
	function addPropertyTypeParameter() {
		if (checkboxDataFilterPropertyType.length > 0) {
			propertyParameter = `&& property_type in $propertyType `;
		} else {
			propertyParameter = '';
		}
	}

	//Add and remove parameters for county in query to avoid the problem when an array is empty
	function addCountyParameter() {
		if (checkboxDataFilterCounty.length > 0) {
			countyParameter = `&& county->name in $countyName `;
		} else {
			countyParameter = '';
		}
	}

	//Add and remove parameters for beds in query to avoid the problem when an array is empty
	function addBedsParameter() {
		if (checkboxDataFilterBeds.length > 0) {
			bedsParameter = `&& beds in $bedQuantity`;
		} else {
			bedsParameter = '';
		}
	}

	//Add and remove parameters for minimum price in query to avoid the problem when an array is empty
	function addMinPriceFiltering() {
		minPrice = minPriceInput.value;

		if (minPrice !== '') {
			minPriceParameter = ` && price >= $lowestPrice`;
		} else {
			minPriceParameter = '';
		}
	}

	//Add and remove parameters for maximum price in query to avoid the problem when an array is empty
	function addMaxPriceFiltering() {
		maxPrice = maxPriceInput.value;

		if (maxPrice !== '') {
			maxPriceParameter = ` && price <= $highestPrice`;
		} else {
			maxPriceParameter = '';
		}
	}

	//Fetch accommodations
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
		//Display the message with recommendations if nothing found
		if (accommodations.length === 0) {
			messageTitle.classList.add('main__frontpage_accommodations-message--visible');
		} else {
			messageTitle.classList.remove('main__frontpage_accommodations-message--visible');
		}

		//Remove active button if it not all accommodations in the header filtering
		for (const button of filterButtons) {
			button.classList.remove('body__filter-buttons--active');
		}

		filterButtonAllAccomodation.classList.add('body__filter-buttons--active');
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