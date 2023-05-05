export default function Header() {

	let isOpenedNavigationMobile = false;
	let isOpenedWishlist = false;
	const buttonHamburgerMenu = document.querySelector('.header__mobile-button');
	const wishlistButton = document.querySelector('.header__wishlist-link');
	const mobileNavigation = document.querySelector('.header__mobile-navigation');
	//const wishlist = document.querySelector('.main__wishlist');
	//const main = document.querySelector('.main');

	buttonHamburgerMenu.addEventListener('click', handleButtonHamburgerMenu);
	wishlistButton.addEventListener('click', handleWishlistButton);
	//main.addEventListener('click', handleClickOverBody);
	//wishlist.addEventListener('click', handleClickOverWishlist);
	mobileNavigation.addEventListener('click', handleClickOverMobileNavigation);
	window.addEventListener('keydown', handleKeyDown);

	function visibilityHamburgerMenu() {
		isOpenedNavigationMobile = !isOpenedNavigationMobile;
	}

	function visibilityWishlist() {
		isOpenedWishlist = !isOpenedWishlist;
	}

	function handleButtonHamburgerMenu() {
		visibilityHamburgerMenu();
		renderHTMLMenu();
	}

	function handleWishlistButton() {
		visibilityWishlist();
		renderHTMLWishlist();
	}

	function handleClickOverBody(event) {
		event.stopPropagation();
		renderHTMLCloseMenus();
	}

	function handleClickOverWishlist(event) {
		event.stopPropagation();
	}

	function handleClickOverMobileNavigation(event) {
		event.stopPropagation();
	}

	function handleKeyDown(event) {
		if(event.keyCode === 27) {
			(isOpenedWishlist = false);
			//wishlist.classList.remove('main__wishlist--visible');
			wishlistButton.classList.remove('header_naviga-buttontion-wishlist--active');
		}
	}

	function renderHTMLMenu() {
		if (isOpenedNavigationMobile) {
			(isOpenedWishlist = false);
			buttonHamburgerMenu.classList.add('header__mobile-button--opened');
			mobileNavigation.classList.add('header__mobile-navigation--visible')
			//wishlist.classList.remove('main__wishlist--visible');
			wishlistButton.classList.remove('header__navigation-wishlist--active');
		}
		else {
			buttonHamburgerMenu.classList.remove('header__mobile-button--opened');
			mobileNavigation.classList.remove('header__mobile-navigation--visible')
		}
	}

	function renderHTMLWishlist() {
		if (isOpenedWishlist) {
			(isOpenedNavigationMobile = false);
			//wishlist.classList.add('main__wishlist--visible');
			wishlistButton.classList.add('header__navigation-wishlist--active');
			buttonHamburgerMenu.classList.remove('header__mobile-button--opened');
			mobileNavigation.classList.remove('header__mobile-navigation--visible')
		}
		else {
			//wishlist.classList.remove('main__wishlist--visible');
			wishlistButton.classList.remove('header__navigation-wishlist--active');
		}
	}

	function renderHTMLCloseMenus() {
		buttonHamburgerMenu.classList.remove('header__mobile-button--opened');
		mobileNavigation.classList.remove('header__mobile-navigation--visible')
		//wishlist.classList.remove('main__wishlist--visible');
		wishlistButton.classList.remove('header__navigation-wishlist--active');
		(isOpenedWishlist = false);
		(isOpenedNavigationMobile = false);
	}
}