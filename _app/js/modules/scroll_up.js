export default function ScrollUp() {
	const buttonUp = document.querySelector('.main__button-scroll-up');

	window.addEventListener('scroll', handleWindowScroll);
	buttonUp.addEventListener('click', handleButtonArrowUp);

	function handleWindowScroll() {
		renderHTML();
	}

	function handleButtonArrowUp() {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function renderHTML() {
		if (window.pageYOffset >= window.innerHeight * 0.01) {
			buttonUp.classList.add('main__button-scroll-up--visible');
		} else {
			buttonUp.classList.remove('main__button-scroll-up--visible');
		}
	}
}