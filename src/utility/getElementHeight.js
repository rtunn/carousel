/**
 * getElementHeight returns the height of the element
 * @param {HTMLElement} element 
 * @returns {Number} height of the element
 */
export const getElementHeight = (element) => {
    return element.getBoundingClientRect().height
}