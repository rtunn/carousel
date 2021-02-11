import { getElementHeight } from './getElementHeight'

/**
 * getTallestElementHeight returns the height of the tallest element
 * @param {Array.<HTMLElement>} elements array of elements to compare
 * @param {Number} minHeight minimum height
 * @returns {Number} the height of the tallest element or minHeight - whichever is greater
 */
export const getTallestElementHeight = (elements, minHeight) => {
    if (Number.isFinite(minHeight) === false) throw 'minHeight must be a number'
    return elements.reduce((tallest, currentElement) => {
        const currentHeight = getElementHeight(currentElement)
        return tallest > currentHeight ? tallest : currentHeight
    }, minHeight)
}