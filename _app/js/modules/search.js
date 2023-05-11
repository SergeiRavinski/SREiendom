import { sanity } from '../sanity.js';

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
	}

	function handleCloseButton() {
		closeButtonRenderHTML();
	}

	async function fetchAccommodations() {
		const query = `*[_type == 'accommodation' && [county->name, city, beds] match [$countyName + '*', $cityName + '*', $bedsQuantity + '*']] | order(price asc) {
			"image": gallery[0].asset->url,
			"county": county->name,
			city,
			beds,
			price
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

	function createFoundAccommodationListContainerDOM() {
		if (foundAccommodation.length > 0) {
			foundAccommodationListResultTitle.innerText = `Search results for: ${accommodationSearchText}`; 

			foundAccommodation.forEach(element => {
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

		} else {
			foundAccommodationListResultTitle.innerText = `Sorry, but nothing matched your search terms. Please try again with some different keywords.`; 
		}
		
		return sectionFronpageAccommodations;
	}

	function closeButtonRenderHTML() {
		foundAccommodationListResult.classList.remove('search-result--visible');
		frontpageAccommodations.classList.remove('frontpage_accommodations--invisible');
	}	

	function renderHTML() {
		sectionFronpageAccommodations.innerHTML = '';
		createFoundAccommodationListContainerDOM();
	}

	renderHTML();
}
