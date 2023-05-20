export default function slideshow(accommodationTemplate) {
	let currentIndex = 0;

	const previousButtons = accommodationTemplate.childNodes[0].childNodes[2];
	const nextButtons = accommodationTemplate.childNodes[0].childNodes[3];
	
	previousButtons.addEventListener('click', handlePreviousButtonClick);	
	nextButtons.addEventListener('click', handleNextButtonClick);
	
	function handlePreviousButtonClick(event) {
		event.stopPropagation();
		const previousButton = event.currentTarget;
		const slides = previousButton.parentNode.childNodes[0].childNodes;
		const slideWidth = slides[0].clientWidth;
		const dots = previousButton.parentNode.childNodes[1].childNodes;

		decreaseCurrentIndex(slides);
		renderHTML(slides, slideWidth, dots);
	}
	
	function handleNextButtonClick(event) {
		event.stopPropagation();
		const nextButton = event.currentTarget;
		const slides = nextButton.parentNode.childNodes[0].childNodes;
		const slideWidth = slides[0].clientWidth;
		const dots = nextButton.parentNode.childNodes[1].childNodes;

		increaseCurrentIndex(slides);
		renderHTML(slides, slideWidth, dots);
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

	function renderHTML(slides, slideWidth, dots) {		
		for (const slide of slides) {
			slide.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
		}

		for (const dot of dots) {
			dot.classList.remove('frontpage_accommodations__dot--active');
		}

		dots[currentIndex].classList.add('frontpage_accommodations__dot--active');
	}	
}