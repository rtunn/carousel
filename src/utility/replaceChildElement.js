/**
 * replaceChildElement replaces child element with new element
 * @param newElement HTMLElement
 * @param existingElement HTMLElement - element must be attached to a parentNode
 */
export const replaceChildElement = (newElement, existingElement) => {
    if (newElement instanceof HTMLElement === false) throw 'el must be instance of HTMLElement'
    if (existingElement instanceof HTMLElement === false) return false
    if (existingElement.parentNode === null) return false
    existingElement.parentNode.replaceChild(newElement, existingElement)
    return true
}