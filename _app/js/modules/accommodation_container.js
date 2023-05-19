export default function createAccommodationContainerDOM(accommodationData) {	
		const images = accommodationData.images;

		const accommodationListItem = document.createElement('button');
		const accommodationListContainer = document.createElement('div');


		const accommodationListContainerGallery = document.createElement('div');
		for (const image of images) {
			const accommodationListItemImage = document.createElement('img');
			accommodationListItemImage.setAttribute('alt', 'Image of a house');
			accommodationListItemImage.className = 'frontpage_accommodations__accommodation-image';
			accommodationListItemImage.src = `${image}`;
			accommodationListContainerGallery.appendChild(accommodationListItemImage)
		}

		//const accommodationListItemImage = document.createElement('img');
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
	
		//accommodationListItemImage.setAttribute('alt', 'Image of a house');
		accommodationListItemIconArrowLeft.setAttribute('alt', 'Arrow left icon');
		accommodationListItemIconArrowRight.setAttribute('alt', 'Arrow right icon');
		accommodationListItemIconHeart.setAttribute('alt', 'Heart white icon');
		accommodationListItemCounty.setAttribute('lang', 'no');

		accommodationListItem.className = 'frontpage_accommodations__accommodation';
		//accommodationListItemImage.className = 'frontpage_accommodations__accommodation-image';
		accommodationListContainerGallery.className = 'frontpage_accommodations__container-gallery';
		accommodationListItemButtonArrowLeft.className = 'frontpage_accommodations__accommodation-arrow-left';
		accommodationListItemButtonArrowRight.className = 'frontpage_accommodations__accommodation-arrow-right';
		accommodationListItemButtonHeart.className = 'frontpage_accommodations__accommodation-heart';
		
		//accommodationListItem.href = './modal_window/index.html';
		//accommodationListItemImage.src = `${accommodationData.image}`;
		accommodationListItemIconArrowLeft.src = "/_app/assets/icons/arrow_left.svg";
		accommodationListItemIconArrowRight.src = "/_app/assets/icons/arrow_right.svg";
		accommodationListItemIconHeart.src = "/_app/assets/icons/heart_white.svg";
		accommodationListItemCounty.innerHTML = `${accommodationData.city}, ${accommodationData.county.charAt(0).toUpperCase() + accommodationData.county.slice(1)}`;
		accommodationListItemBeds.innerText = `${accommodationData.beds} beds`;
		accommodationListItemPrice.innerText = `${accommodationData.price} kr NOK`;
		accommodationListItemText.innerText = 'night';

		accommodationListItem.append(
			accommodationListContainer,
			accommodationListItemCounty,
			accommodationListItemBeds,
			accommodationListItemSpan
		);
		accommodationListContainer.append(
			//accommodationListItemImage,
			accommodationListContainerGallery,
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
		
	return accommodationListItem;
}