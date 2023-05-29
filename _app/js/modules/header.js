export default function Header() {
	let isOpenedNavigationMobile = false;
	let isOpenedWishlist = false;

	const buttonHamburgerMenu = document.querySelector('.header__mobile-button');
	const wishlistButton = document.querySelector('.header__wishlist-button');
	const mobileNavigation = document.querySelector('.body__mobile-navigation');
	const wishlist = document.querySelector('.body__wishlist');
	const main = document.querySelector('main');

	buttonHamburgerMenu.addEventListener('click', handleButtonHamburgerMenu);
	wishlistButton.addEventListener('click', handleWishlistButton);
	main.addEventListener('click', handleClickOverMain);
	wishlist.addEventListener('click', handleClickOverWishlist);
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

	function handleClickOverMain(event) {
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
			wishlist.classList.remove('body__wishlist--visible');
			wishlistButton.classList.remove('header__wishlist-button--active');
		}
	}

	function renderHTMLMenu() {
		if (isOpenedNavigationMobile) {
			(isOpenedWishlist = false);
			buttonHamburgerMenu.classList.add('header__mobile-button--opened');
			mobileNavigation.classList.add('body__mobile-navigation--visible')
			wishlist.classList.remove('body__wishlist--visible');
			wishlistButton.classList.remove('header__wishlist-button--active');
		}
		else {
			buttonHamburgerMenu.classList.remove('header__mobile-button--opened');
			mobileNavigation.classList.remove('body__mobile-navigation--visible')
		}
	}

	function renderHTMLWishlist() {
		if (isOpenedWishlist) {
			(isOpenedNavigationMobile = false);
			wishlist.classList.add('body__wishlist--visible');
			wishlistButton.classList.add('header__wishlist-button--active');
			buttonHamburgerMenu.classList.remove('header__mobile-button--opened');
			mobileNavigation.classList.remove('body__mobile-navigation--visible')
		}
		else {
			wishlist.classList.remove('body__wishlist--visible');
			wishlistButton.classList.remove('header__wishlist-button--active');
		}
	}

	function renderHTMLCloseMenus() {
		buttonHamburgerMenu.classList.remove('header__mobile-button--opened');
		mobileNavigation.classList.remove('body__mobile-navigation--visible')
		wishlist.classList.remove('body__wishlist--visible');
		wishlistButton.classList.remove('header__wishlist-button--active');
		(isOpenedWishlist = false);
		(isOpenedNavigationMobile = false);
	}
}