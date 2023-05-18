export default function AnimationOnScroll() {
	const filteringHeader = document.querySelector('.filter-buttons');
	const offset = 50;
	
	window.addEventListener('scroll', animateElements);

	function animateElements() {
		renderHTML();
	}

	function renderHTML() {
		if (window.pageYOffset >= offset) {
			filteringHeader.classList.add('filter-buttons__container--animated');
		} else {
			filteringHeader.classList.remove('filter-buttons__container--animated');
		}	
	}
}