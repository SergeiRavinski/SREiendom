import createMapboxPopupDOM from "./create_mapbox_popup.js"

//Create Popup on the front page
export default function createPopup(element) {
	const popupAccommodation = document.querySelector('.body__popup');
	const filterButtonsHeader = document.querySelector('.body__filter-buttons');
	const buttonClosePopup = document.querySelector('.body__popup-title button');
	const main = document.querySelector('main');
	const popupTitle = document.querySelector('.body__popup-title div h1');
	const popupCity = document.querySelector('.body__popup-title div h3');
	const popupImageContainer = document.querySelector('.body__popup-images');
	const popupEssentialsContainer = document.querySelector('.body__popup-essentials ul');
	const popupPrice = document.querySelector('.body__popup-form span h3');
	const popupTotalPrice = document.querySelector('.body__popup-totalprice-sum');

	//EventListener to close the active Popup
	buttonClosePopup.addEventListener('click', handleButtomCloseClick);

	renderHTML();
	getNewData(element);	
	createMapboxPopupDOM(element);

	function renderHTML() {
		window.scrollTo({
			top: 0,
			left: 0,
		})
		filterButtonsHeader.classList.add('body__filter-buttons--invisible');
		main.classList.add('main--invisible');
		popupAccommodation.classList.add('body__popup--visible');
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

	//Close Popup
	function handleButtomCloseClick() {
		popupAccommodation.classList.remove('body__popup--visible');
		filterButtonsHeader.classList.remove('body__filter-buttons--invisible');
		main.classList.remove('main--invisible');
	}
}