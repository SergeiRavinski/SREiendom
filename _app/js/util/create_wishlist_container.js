//export default function createWishlistContainer(currentButton, handleButtonRemoveClick) {
//	//console.log(element)
//	const wishlist = document.querySelector('.body__wishlist');
//	const currentImage = currentButton.parentNode.childNodes[0].childNodes[0];
//	const currentLocation = currentButton.parentNode.parentNode.childNodes[1].innerHTML;
//	const currentPrice = currentButton.parentNode.parentNode.childNodes[3].childNodes[0].innerHTML;
//	//console.log(currentButton)
//	const wishlistItem = document.createElement('div');
//	const wishlistItemFirstButton = document.createElement('button');
//	const wishlistItemButtonIcon = document.createElement('img');
//	const wishlistItemImage = document.createElement('img');
//	//const wishlistItemFirstTitle = document.createElement('h3');
//	const wishlistItemSecondTitle = document.createElement('h4');
//	const wishlistItemSpan = document.createElement('span');
//	const wishlistItemSpanFirstTitle = document.createElement('h3');
//	const wishlistItemSpanSecondTitle = document.createElement('h4');
//	const wishlistItemSecondButton = document.createElement('button');

//	wishlistItemButtonIcon.setAttribute = ('alt', 'Button close icon');
//	wishlistItemImage.setAttribute = ('alt', 'Image of an accommodation');

//	wishlistItem.className = 'body__wishlist-container';
//	wishlistItemFirstButton.className = 'body__wishlist-container-removebutton';

//	wishlistItemButtonIcon.src = '/_app/assets/icons/close_white.svg';
//	wishlistItemImage.src = `${currentImage.src}`;
//	wishlistItemSecondTitle.innerHTML = `${currentLocation}`;
//	wishlistItemSpanFirstTitle.innerHTML = `${currentPrice}`;
//	wishlistItemSpanSecondTitle.textContent = 'night';
//	wishlistItemSecondButton.innerHTML = 'RESERVE';

//	wishlistItem.append(
//		wishlistItemFirstButton,
//		wishlistItemImage,
//		//wishlistItemFirstTitle,
//		wishlistItemSecondTitle,
//		wishlistItemSpan,
//		wishlistItemSecondButton
//	);

//	wishlistItemFirstButton.appendChild(wishlistItemButtonIcon);

//	wishlistItemSpan.append(
//		wishlistItemSpanFirstTitle,
//		wishlistItemSpanSecondTitle
//	)

//	wishlist.appendChild(wishlistItem);
//	return handleButtonRemoveClick(wishlistItemFirstButton);
//}