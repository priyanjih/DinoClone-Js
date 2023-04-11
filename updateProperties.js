// Getting the value of a CSS property
export function getProperty(element, property) {
    return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;
}

// Setting the value of a CSS property
export function setProperty(element, property, value){
    element.style.setProperty(property, value);
} 

//incrementing a CSS property
export function incrementProperty(element, property, value) {
    setProperty(element, property, getProperty(element, property) + value);
}