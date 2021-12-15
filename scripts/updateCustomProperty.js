export function getCustomProperty(elem, prop) {
	// allows you to get css variables, converted the return value to float as it returns string
	return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value) {
	// set css property for an element with a value
	elem.style.setProperty(prop, value);
}

export function incrementCustomProperty(elem, prop, inc) {
	// adding inc amount to the css property
	setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
