export default function wishlist() {
	let removeButtons = [];

	const buttonWishlist = document.querySelector('.header__wishlist-button');
	const addToWishlistButtons = document.querySelectorAll('.main__frontpage_accommodations-accommodation-heart');
	const wishlist = document.querySelector('.body__wishlist');
	
	addToWishlistButtons.forEach(button => {
		button.addEventListener('click', handleAddToWishlistButtonClick);
	});

	function handleAddToWishlistButtonClick(event) {
		event.stopPropagation();
		const currentButton = event.currentTarget;
		createWishlistContainer(currentButton);
		renderHTML(currentButton);
	}
	
	function handleButtonRemoveClick(button) {
		removeButtons.push(button);

		for (const removeButton of removeButtons) {
			removeButton.addEventListener('click', handleButtonClick);
		}
	}

	function handleButtonClick(event) {
		const card = event.currentTarget.parentNode;
		card.style.display = 'none';
	}

	function createWishlistContainer(currentButton) {
		const currentImage = currentButton.parentNode.childNodes[0].childNodes[0];
		const currentLocation = currentButton.parentNode.parentNode.childNodes[1].innerHTML;
		const currentPrice = currentButton.parentNode.parentNode.childNodes[3].childNodes[0].innerHTML;

		const wishlistItem = document.createElement('div');
		const wishlistItemFirstButton = document.createElement('button');
		const wishlistItemButtonIcon = document.createElement('img');
		const wishlistItemImage = document.createElement('img');
		const wishlistItemSecondTitle = document.createElement('h4');
		const wishlistItemSpan = document.createElement('span');
		const wishlistItemSpanFirstTitle = document.createElement('h3');
		const wishlistItemSpanSecondTitle = document.createElement('h4');
		const wishlistItemSecondButton = document.createElement('button');

		wishlistItemButtonIcon.setAttribute = ('alt', 'Button close icon');
		wishlistItemImage.setAttribute = ('alt', 'Image of an accommodation');

		wishlistItem.className = 'body__wishlist-container';
		wishlistItemFirstButton.className = 'body__wishlist-container-removebutton';

		wishlistItemButtonIcon.src = '/_app/assets/icons/close_white.svg';
		wishlistItemImage.src = `${currentImage.src}`;
		wishlistItemSecondTitle.innerHTML = `${currentLocation}`;
		wishlistItemSpanFirstTitle.innerHTML = `${currentPrice}`;
		wishlistItemSpanSecondTitle.textContent = 'night';
		wishlistItemSecondButton.innerHTML = 'RESERVE';

		wishlistItem.append(
			wishlistItemFirstButton,
			wishlistItemImage,
			wishlistItemSecondTitle,
			wishlistItemSpan,
			wishlistItemSecondButton
		);

		wishlistItemFirstButton.appendChild(wishlistItemButtonIcon);

		wishlistItemSpan.append(
			wishlistItemSpanFirstTitle,
			wishlistItemSpanSecondTitle
		)

		wishlist.appendChild(wishlistItem);
		handleButtonRemoveClick(wishlistItemFirstButton);
	}

	function renderHTML(currentButton) {
		buttonWishlist.classList.add('body__mobile-navigation-links-wishlist--indicate');
		currentButton.classList.add('main__frontpage_accommodations-accommodation-heart--animated');
		
		function removeIndicator() {
			buttonWishlist.classList.remove('body__mobile-navigation-links-wishlist--indicate');
		}	

		function removeAnimatedButton() {
			currentButton.classList.remove('main__frontpage_accommodations-accommodation-heart--animated');
		}

		setTimeout(removeIndicator, 1000);
		setTimeout(removeAnimatedButton, 1000);
	}
}