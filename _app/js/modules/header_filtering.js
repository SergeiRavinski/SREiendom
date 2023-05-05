import { sanity } from "../sanity.js";
//import createAccommodationContainerDOM from "./accommodation_container.js";

export default async function HeaderFiltering() {
	let datasetCategory = '';
	let accommodations = [];

	const sectionFronpageAccommodations = document.querySelector('.frontpage_homes');
	const filterButtons = document.querySelectorAll('.filter-buttons__container button');
	
	for (const button of filterButtons) {
		button.addEventListener('click', handleFilterButtonClick);
	}

	async function handleFilterButtonClick(event) {
		addUnderlineToActiveButton(event);
		getCategory(event);
		await fetchHomes();
		renderHTML();
	}

	function addUnderlineToActiveButton(event) {
		let currentActiveButton = event.currentTarget;
		renderHTML(currentActiveButton);
	}


	function getCategory(event) {
		datasetCategory = event.currentTarget.dataset.category;

		if (datasetCategory === 'all homes') {
			datasetCategory = '*';
		}
	}

	async function fetchHomes() {
		const query = `*[_type == 'accommodation' && category match $category] | order(price asc) {
			"image": gallery[0].asset->url,
			"county": county->name,
			city,
			beds,
			price,
			category
		}`;

		const params = {	
			category: datasetCategory
		};

		accommodations = await sanity.fetch(query, params);
	}

	//createAccommodationContainerDOM(accommodations, sectionFronpageAccommodations);
	
	function createHomeListContainerDOM() {	
		accommodations.filter(element => {
			const homeListItem = document.createElement('a');
			const homeListContainer = document.createElement('div');
			const homeListItemImage = document.createElement('img');
			const homeListItemButtonArrowLeft = document.createElement('button');
			const homeListItemIconArrowLeft = document.createElement('img');
			const homeListItemButtonArrowRight = document.createElement('button');
			const homeListItemIconArrowRight = document.createElement('img');
			const homeListItemButtonHeart = document.createElement('button');
			const homeListItemIconHeart = document.createElement('img');
			const homeListItemCounty = document.createElement('h3');
			const homeListItemBeds = document.createElement('h5');
			const homeListItemSpan = document.createElement('span');
			const homeListItemPrice = document.createElement('h4');
			const homeListItemText = document.createElement('h5');
		
			homeListItemImage.setAttribute('alt', 'Image of a house');
			homeListItemIconArrowLeft.setAttribute('alt', 'Arrow left icon');
			homeListItemIconArrowRight.setAttribute('alt', 'Arrow right icon');
			homeListItemIconHeart.setAttribute('alt', 'Heart white icon');
			homeListItemCounty.setAttribute('lang', 'no');

			homeListItem.className = 'frontpage_homes__home';
			homeListItemImage.className = 'frontpage_homes__home-image';
			homeListItemButtonArrowLeft.className = 'frontpage_homes__home-arrow-left';
			homeListItemButtonArrowRight.className = 'frontpage_homes__home-arrow-right';
			homeListItemButtonHeart.className = 'frontpage_homes__home-heart';
			
			homeListItem.href = '/';
			homeListItemImage.src = `${element.image}`;
			homeListItemIconArrowLeft.src = "/_app/assets/icons/arrow_left.svg";
			homeListItemIconArrowRight.src = "/_app/assets/icons/arrow_right.svg";
			homeListItemIconHeart.src = "/_app/assets/icons/heart_white.svg";
			homeListItemCounty.innerHTML = `${element.city}, ${element.county}`;
			homeListItemBeds.innerText = `${element.beds} beds`;
			homeListItemPrice.innerText = `${element.price} kr NOK`;
			homeListItemText.innerText = 'night';

			homeListItem.append(
				homeListContainer,
				homeListItemCounty,
				homeListItemBeds,
				homeListItemSpan
			);

			homeListContainer.append(
				homeListItemImage,
				homeListItemButtonArrowLeft,
				homeListItemButtonArrowRight,
				homeListItemButtonHeart
			);

			homeListItemButtonArrowLeft.appendChild(homeListItemIconArrowLeft);
			homeListItemButtonArrowRight.appendChild(homeListItemIconArrowRight);
			homeListItemButtonHeart.appendChild(homeListItemIconHeart);
			homeListItemSpan.append(
				homeListItemPrice,
				homeListItemText
			);

			sectionFronpageAccommodations.appendChild(homeListItem);
		});	

		return sectionFronpageAccommodations;
	}

	function renderHTML(currentActiveButton) {
		if (currentActiveButton) {

			for (const button of filterButtons) {
				button.classList.remove('filter-buttons--active');
			}

			currentActiveButton.classList.add('filter-buttons--active');
		}

		sectionFronpageAccommodations.innerHTML = '';
		createHomeListContainerDOM();
	}

	renderHTML();
}