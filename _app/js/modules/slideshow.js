export default function slideshow() {
	let currentIndex = 0;
	
	/**
	 * @TODO Add currentIndex into teh loop to get correct index
	 */

	const previousButtons = document.querySelectorAll('.frontpage_accommodations__accommodation-arrow-left');
	const nextButtons = document.querySelectorAll('.frontpage_accommodations__accommodation-arrow-right');
	
	//window.addEventListener('keydown', handleKeydown);

	previousButtons.forEach(element => {
		element.addEventListener('click', handlePreviousButtonClick);
	});
	
	nextButtons.forEach(element => {
		element.addEventListener('click', handleNextButtonClick);
	});
	
	function handlePreviousButtonClick(event) {
		event.stopPropagation();
		const previousButton = event.currentTarget;
		const slides = previousButton.parentNode.childNodes[0].childNodes;
		const slideWidth = slides[0].clientWidth;

		decreaseCurrentIndex(slides);
		renderHTML(slides, slideWidth);
	}
	
	function handleNextButtonClick(event) {
		event.stopPropagation();
		const nextButton = event.currentTarget;
		const slides = nextButton.parentNode.childNodes[0].childNodes;
		const slideWidth = slides[0].clientWidth;

		increaseCurrentIndex(slides);
		renderHTML(slides, slideWidth);
	}

	function decreaseCurrentIndex(slides) {
		if(currentIndex > 0) {
			currentIndex -= 1;
		} else {
			currentIndex = slides.length -1;
		}
	}

	function increaseCurrentIndex(slides) {
		if (currentIndex < slides.length -1) {
			currentIndex += 1;
		} else {
			currentIndex = 0;
		}
	}

	//function handleKeydown(event, slideWidth) {
		
	//	if (event.key === 'ArrowLeft') {
	//		decreaseCurrentIndex(slides);
	//		renderSlideshowHTML(slides, slideWidth);
	
	//	} else if (event.key === 'ArrowRight') {
	//		increaseCurrentIndex(slides);
	//		renderSlideshowHTML(slides, slideWidth);
	//	}
	//}

	function renderHTML(slides, slideWidth) {		
		for (const slide of slides) {
			slide.style.transform = `translateX(-${slideWidth * currentIndex}px)`
		}
	}	
}