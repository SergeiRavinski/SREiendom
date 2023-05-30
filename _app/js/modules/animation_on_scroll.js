//Add shadow to the filter section in the header if scroll down
export default function AnimationOnScroll() {
	const filteringHeader = document.querySelector('.body__filter-buttons');
	const offset = 50;
	
	window.addEventListener('scroll', animateElements);

	function animateElements() {
		renderHTML();
	}

	function renderHTML() {
		if (window.pageYOffset >= offset) {
			filteringHeader.classList.add('body__filter-buttons-container--animated');
		} else {
			filteringHeader.classList.remove('body__filter-buttons-container--animated');
		}	
	}
}