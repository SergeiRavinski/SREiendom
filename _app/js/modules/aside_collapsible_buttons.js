export default function asideCollapsibleButtons() {
	//let isCollapsed = true;

	const filterButtons = document.querySelectorAll('.filtering__collapsible-button');

	for (const button of filterButtons) {
		button.addEventListener('click', handleClickFilterButton);
	}
	
	//function filterSectionVisibility() {
	//	isCollapsed = !isCollapsed;
	//}

	function handleClickFilterButton(event) {
		//filterSectionVisibility();
		renderHTML(event);
	}

	function renderHTML(event) {
		const currentOptions = event.currentTarget.parentNode.childNodes[3].childNodes[1];
		const currentButtonArrow = event.currentTarget.childNodes[3];
		
		currentOptions.style.display = currentOptions.style.display === 'block' ? 'none' : 'block';
		currentButtonArrow.style.transform = currentButtonArrow.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';

		//if (isCollapsed === false) {
		//	currentOptions.classList.add('filtering__property-type-options--visible');
		//} else {
		//	currentOptions.classList.remove('filtering__property-type-options--visible');
		//}
	}
}