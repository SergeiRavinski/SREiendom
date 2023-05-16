import { sanity } from '../sanity.js';
import createAccommodationContainerDOM from "./accommodation_container.js";
import createMapboxContainer from "./createMapboxContainer.js";
import createMapboxContainerDOM from "./createMapboxPopup.js"

export default async function FrontpageAccommodations() {
	const popupAccommodation = document.querySelector('.main__modal-window');
	const filterButtonsHeader = document.querySelector('.filter-buttons');
	const buttonClosePopup = document.querySelector('.main__modal-window-title button');
	const main = document.querySelector('main');
	const popupTitle = document.querySelector('.main__modal-window-title div h1');
	const popupCity = document.querySelector('.main__modal-window-title div h3');
	const popupImageContainer = document.querySelector('.main__modal-window-images');
	const popupEssentialsContainer = document.querySelector('.main__modal-window-essentials ul');
	const popupPrice = document.querySelector('.main__modal-window-form span h3');
	const popupTotalPrice = document.querySelector('.main__modal-window-totalprice-sum');

	const query = `*[_type == 'accommodation'] | order(price asc) {
		"image": gallery[0].asset->url,
		"images": gallery[].asset->url,
		"county": county->name,
		city,
		beds,
		price,
		"longitude": location{longitude},
		"latitude": location{latitude},
		title,
		essentials
	}`;
	const accommodations = await sanity.fetch(query);
	const sectionFronpageAccommodations = document.querySelector('.frontpage_accommodations');

	buttonClosePopup.addEventListener('click', handleButtomCloseClick);

	function renderHTML() {
		accommodations.forEach(element => {
			let accomodationTemplate = createAccommodationContainerDOM(element);
			sectionFronpageAccommodations.appendChild(accomodationTemplate);

			accomodationTemplate.addEventListener('click', () => {
				openPopup(element);
			});
		});
	}

	//Popup
	function openPopup(element) {
		renderPopup();
		getNewData(element);	
		createMapboxContainerDOM(element);
	}	

	function renderPopup(event) {
		window.scrollTo({
			top: 0,
			left: 0,
		})
		filterButtonsHeader.classList.add('filter-buttons--invisible');
		main.classList.add('main--invisible');
		popupAccommodation.classList.add('main__modal-window--visible');
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
		popupAccommodation.classList.remove('main__modal-window--visible');
		filterButtonsHeader.classList.remove('filter-buttons--invisible');
		main.classList.remove('main--invisible');
	}

	renderHTML();
	createMapboxContainer(accommodations);
}