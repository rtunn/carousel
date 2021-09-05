import { loadLazyImages } from './loadLazyImages'


/**
 * getElementHeight returns the height of the element
 * @param {HTMLElement} element 
 * @returns {Number} height of the element
 */
export const getElementHeight = (element) => {
    loadLazyImages(element).then(_ => {
        return element.getBoundingClientRect().height
    })
}