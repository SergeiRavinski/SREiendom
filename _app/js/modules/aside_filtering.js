import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "../util/accommodation_container.js";
import createMapboxContainerDOM from '../util/create_mapbox_container.js';
import FrontpageAccommodations from './frontpage_accommodations.js';
import createPopup from './create_popup.js';
import slideshow from '../util/slideshow.js';
import wishlist from './wishlist.js';

export default function AsideFiltering() {
	//let checkboxDataFilter = [];

	let checkboxDataFilterPropertyType = [];
	let checkboxDataFilterCounty = [];
	let checkboxDataFilterBeds = [];

	let accommodations = [];

	//const checkboxes = document.querySelectorAll('.filtering__checkbox');

	const checkboxesPropertyType = document.querySelectorAll('.filtering__checkbox-propertytype');
	const checkboxesCounty = document.querySelectorAll('.filtering__checkbox-countyname');
	const checkboxesBeds = document.querySelectorAll('.filtering__checkbox-beds');

	const sectionFronpageAccommodations = document.querySelector('.frontpage_accommodations');
	const filterButtons = document.querySelectorAll('.filter-buttons__container button');
	const filterButtonAllAccomodation = document.querySelector('.filter-buttons__allAccommodations');

	//for (const checkbox of checkboxes) {
	//	checkbox.addEventListener('click', handleCheckboxClick);
	//}


	for (const checkboxPropertyType of checkboxesPropertyType) {
		checkboxPropertyType.addEventListener('click', handleCheckboxPropertyTypeClick);
	}

	for (const checkboxCounty of checkboxesCounty) {
		checkboxCounty.addEventListener('click', handleCheckboxCountyClick);
	}
	
	for (const checkboxBeds of checkboxesBeds) {
		checkboxBeds.addEventListener('click', handleCheckboxBedsClick);
	}


	async function handleCheckboxPropertyTypeClick(event) {
		getCheckboxDataFilterPropertyType(event);
		await fetchAccommodations();
		renderHTML();
		createMapboxContainerDOM(accommodations);
		wishlist();

		if (checkboxDataFilterPropertyType.length === 0) {
			FrontpageAccommodations();
		}
	}

	async function handleCheckboxCountyClick(event) {
		getCheckboxDataFilterCounty(event);
		await fetchAccommodations();
		renderHTML();
		createMapboxContainerDOM(accommodations);
		slideshow();
		wishlist();

		if (checkboxDataFilterCounty.length === 0) {
			FrontpageAccommodations();
		}
	}

	async function handleCheckboxBedsClick(event) {
		getCheckboxDataFilterBeds(event);
		await fetchAccommodations();
		renderHTML();
		createMapboxContainerDOM(accommodations);
		slideshow();
		wishlist();

		if (checkboxDataFilterBeds.length === 0) {
			FrontpageAccommodations();
		}
	}

	function getCheckboxDataFilterPropertyType(event) {
		let currentDataFilterPropertyType = event.currentTarget.dataset.filter;
		let currentCheckboxPropertyType = event.currentTarget;
		let index = checkboxDataFilterPropertyType.indexOf(currentDataFilterPropertyType);
	
		if (currentCheckboxPropertyType.checked) {
			checkboxDataFilterPropertyType.push(currentDataFilterPropertyType);
		} else {
			checkboxDataFilterPropertyType.splice(index, 1);
		}
	}

	function getCheckboxDataFilterCounty(event) {
		let currentDataFilterCounty = event.currentTarget.dataset.filter;
		let currentCheckboxCounty = event.currentTarget;
		let index = checkboxDataFilterCounty.indexOf(currentDataFilterCounty);
	
		if (currentCheckboxCounty.checked) {
			checkboxDataFilterCounty.push(currentDataFilterCounty);
		} else {
			checkboxDataFilterCounty.splice(index, 1);
		}
	}

	function getCheckboxDataFilterBeds(event) {
		let currentDataFilterBeds = event.currentTarget.dataset.filter;
		let currentCheckboxBeds = event.currentTarget;
		let index = checkboxDataFilterBeds.indexOf(currentDataFilterBeds);
	
		if (currentCheckboxBeds.checked) {
			checkboxDataFilterBeds.push(currentDataFilterBeds);
		} else {
			checkboxDataFilterBeds.splice(index, 1);
		}
	}



	//async function handleCheckboxClick(event) {
	//	getCheckboxDataFilter(event);
	//	await fetchAccommodations();
	//	renderHTML();
	//	createMapboxContainerDOM(accommodations);

	//	if (checkboxDataFilter.length === 0) {
	//		FrontpageAccommodations();
	//	}
	//}

	//function getCheckboxDataFilter(event) {
	//	let currentCheckboxDataFilter = event.currentTarget.dataset.filter;
	//	let currentCheckbox = event.currentTarget;
	//	let index = checkboxDataFilter.indexOf(currentCheckboxDataFilter);
	
	//	if (currentCheckbox.checked) {
	//		checkboxDataFilter.push(currentCheckboxDataFilter);
	//	} else {
	//		checkboxDataFilter.splice(index, 1);
	//	}
	//}

	async function fetchAccommodations() {
		const query = `*[_type == 'accommodation' && property_type in $propertyType || county->name in $countyName || beds in $bedQuantity] | order(price asc) {
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

		//const params = {
		//	propertyType: checkboxDataFilter.legth > 0 ? checkboxDataFilter : null,
		//	countyName: checkboxDataFilter.legth > 0 ? checkboxDataFilter : null,
		//	bedQuantity: checkboxDataFilter.legth > 0 ? checkboxDataFilter : null
		//};
		const params = {
			propertyType: checkboxDataFilterPropertyType,
			countyName: checkboxDataFilterCounty,
			bedQuantity: checkboxDataFilterBeds
		};

		accommodations = await sanity.fetch(query, params);
	}

	function renderHTML() {
		for (const button of filterButtons) {
			button.classList.remove('filter-buttons--active');
		}

		filterButtonAllAccomodation.classList.add('filter-buttons--active');
	
		sectionFronpageAccommodations.innerHTML = '';

		accommodations.forEach(element =>{
			let accommodationTemplate = createAccommodationContainerDOM(element);
			sectionFronpageAccommodations.appendChild(accommodationTemplate);

			accommodationTemplate.addEventListener('click', () => {
				createPopup(element);
			});

			slideshow(accommodationTemplate);
		});
	}
}