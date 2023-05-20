import createMapboxPopupDOM from "./create_mapbox_popup.js"

export default function createPopup(element) {
	const popupAccommodation = document.querySelector('.main__popup');
	const filterButtonsHeader = document.querySelector('.filter-buttons');
	const buttonClosePopup = document.querySelector('.main__popup-title button');
	const main = document.querySelector('main');
	const popupTitle = document.querySelector('.main__popup-title div h1');
	const popupCity = document.querySelector('.main__popup-title div h3');
	const popupImageContainer = document.querySelector('.main__popup-images');
	const popupEssentialsContainer = document.querySelector('.main__popup-essentials ul');
	const popupPrice = document.querySelector('.main__popup-form span h3');
	const popupTotalPrice = document.querySelector('.main__popup-totalprice-sum');

	buttonClosePopup.addEventListener('click', handleButtomCloseClick);

	renderPopup();
	getNewData(element);	
	createMapboxPopupDOM(element);

	function renderPopup() {
		window.scrollTo({
			top: 0,
			left: 0,
		})
		filterButtonsHeader.classList.add('filter-buttons--invisible');
		main.classList.add('main--invisible');
		popupAccommodation.classList.add('main__popup--visible');
	}

	function getNewData(element) {
		const gallery = element.images;
		const essentials = element.essentials;
		
		popupImageContainer.innerHTML = '';
		popupEssentialsContainer.innerHTML = '';
		popupTitle.innerText = `${element.title}`;
		popupCity.innerText = `${element.city}, Norway`;
		
		for (const image of gallery) {
			const accomodationPopupImage = document.createElement('img');
			accomodationPopupImage.setAttribute('alt', 'Image of a accommodation');
			accomodationPopupImage.src = `${image}`
			popupImageContainer.appendChild(accomodationPopupImage);
		}

		for (const essential of essentials) {
			const accomodationPopupEssential = document.createElement('li');
			accomodationPopupEssential.innerText = `${essential}`;
			popupEssentialsContainer.appendChild(accomodationPopupEssential)
		}

		popupPrice.innerText = `${element.price} kr NOK`;
		popupTotalPrice.innerText = `${element.price} kr NOK`;
	}

	function handleButtomCloseClick() {
		popupAccommodation.classList.remove('main__popup--visible');
		filterButtonsHeader.classList.remove('filter-buttons--invisible');
		main.classList.remove('main--invisible');
	}
}