import { sanity } from '../sanity.js';
import FrontpageAccommodations from './frontpage_accommodations.js';

export default function AsideFiltering() {
	let checkboxDataFilter = [];
	let accommodations = [];

	const checkboxes = document.querySelectorAll('.filtering__checkbox');
	const sectionFronpageAccommodations = document.querySelector('.frontpage_accommodations');

	for (const checkbox of checkboxes) {
		checkbox.addEventListener('click', handleCheckboxClick);
	}

	async function handleCheckboxClick(event) {
		getCheckboxDataFilter(event);
		await fetchAccommodations();
		renderHTML();
	}

	function getCheckboxDataFilter(event) {
		let currentCheckboxDataFilter = event.currentTarget.dataset.filter;
		let currentCheckbox = event.currentTarget;
		let index = checkboxDataFilter.indexOf(currentCheckboxDataFilter);

		if (currentCheckbox.checked) {
			checkboxDataFilter.push(currentCheckboxDataFilter);
		}	
		 else if (checkboxDataFilter === []) {
			FrontpageAccommodations()
		}
		else {
			checkboxDataFilter.splice(index, 1);
		}
	}

	async function fetchAccommodations() {
		//const query = `*[_type == 'accommodation' && property_type in $category || county->name in $category || beds in $category] | order(price asc) {
		//	"image": gallery[0].asset->url,
		//	"county": county->name,
		//	city,
		//	beds,
		//	price,
		//	category,
		//	property_type
		//}`;

		const query = `*[_type == 'accommodation' && property_type in $category || county->name in $category || beds in $category] | order(price asc) {
			"image": gallery[0].asset->url,
			"county": county->name,
			city,
			beds,
			price,
			category,
			property_type
		}`;

		const params = {
			category: checkboxDataFilter
		};

		accommodations = await sanity.fetch(query, params);
	}

	//createAccommodationContainerDOM(accommodations, sectionFronpageAccommodations);
	
	function createAccommodationListContainerDOM() {	
		accommodations.filter(element => {
			const accommodationListItem = document.createElement('a');
			const accommodationListContainer = document.createElement('div');
			const accommodationListItemImage = document.createElement('img');
			const accommodationListItemButtonArrowLeft = document.createElement('button');
			const accommodationListItemIconArrowLeft = document.createElement('img');
			const accommodationListItemButtonArrowRight = document.createElement('button');
			const accommodationListItemIconArrowRight = document.createElement('img');
			const accommodationListItemButtonHeart = document.createElement('button');
			const accommodationListItemIconHeart = document.createElement('img');
			const accommodationListItemCounty = document.createElement('h3');
			const accommodationListItemBeds = document.createElement('h5');
			const accommodationListItemSpan = document.createElement('span');
			const accommodationListItemPrice = document.createElement('h4');
			const accommodationListItemText = document.createElement('h5');
		
			accommodationListItemImage.setAttribute('alt', 'Image of a house');
			accommodationListItemIconArrowLeft.setAttribute('alt', 'Arrow left icon');
			accommodationListItemIconArrowRight.setAttribute('alt', 'Arrow right icon');
			accommodationListItemIconHeart.setAttribute('alt', 'Heart white icon');
			accommodationListItemCounty.setAttribute('lang', 'no');

			accommodationListItem.className = 'frontpage_accommodations__accommodation';
			accommodationListItemImage.className = 'frontpage_accommodations__accommodation-image';
			accommodationListItemButtonArrowLeft.className = 'frontpage_accommodations__accommodation-arrow-left';
			accommodationListItemButtonArrowRight.className = 'frontpage_accommodations__accommodation-arrow-right';
			accommodationListItemButtonHeart.className = 'frontpage_accommodations__accommodation-heart';
			
			accommodationListItem.href = '/';
			accommodationListItemImage.src = `${element.image}`;
			accommodationListItemIconArrowLeft.src = "/_app/assets/icons/arrow_left.svg";
			accommodationListItemIconArrowRight.src = "/_app/assets/icons/arrow_right.svg";
			accommodationListItemIconHeart.src = "/_app/assets/icons/heart_white.svg";
			accommodationListItemCounty.innerHTML = `${element.city}, ${element.county.charAt(0).toUpperCase() + element.county.slice(1)}`;
			accommodationListItemBeds.innerText = `${element.beds} beds`;
			accommodationListItemPrice.innerText = `${element.price} kr NOK`;
			accommodationListItemText.innerText = 'night';

			accommodationListItem.append(
				accommodationListContainer,
				accommodationListItemCounty,
				accommodationListItemBeds,
				accommodationListItemSpan
			);

			accommodationListContainer.append(
				accommodationListItemImage,
				accommodationListItemButtonArrowLeft,
				accommodationListItemButtonArrowRight,
				accommodationListItemButtonHeart
			);

			accommodationListItemButtonArrowLeft.appendChild(accommodationListItemIconArrowLeft);
			accommodationListItemButtonArrowRight.appendChild(accommodationListItemIconArrowRight);
			accommodationListItemButtonHeart.appendChild(accommodationListItemIconHeart);
			accommodationListItemSpan.append(
				accommodationListItemPrice,
				accommodationListItemText
			);

			sectionFronpageAccommodations.appendChild(accommodationListItem);
		});	

		return sectionFronpageAccommodations;
	}

	function renderHTML(currentActiveButton) {
		//if (currentActiveButton) {

		//	for (const button of filterButtons) {
		//		button.classList.remove('filter-buttons--active');
		//	}

		//	currentActiveButton.classList.add('filter-buttons--active');
		//}

		sectionFronpageAccommodations.innerHTML = '';
		createAccommodationListContainerDOM();
	}

	renderHTML();
}