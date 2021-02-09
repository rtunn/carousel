import * as nextCoord from "./getNextCoord"

/**
 * animateFrame moves slide incrementally until reaching desired position
 * @param {Object} slide Slide instance
 * @param {Number} maxIncrement Float indicating max amplitude of position change
 * @returns {Boolean}
 */
export const animateFrame = (slide, maxIncrement) => {
    if (slide.currentPosition === slide.nextPosition) return true

    const limit = slide.nextPosition > slide.currentPosition ? maxIncrement : -1 * maxIncrement
    slide.currentPosition = nextCoord.getNextCoord(slide.currentPosition, slide.nextPosition, limit)
    window.requestAnimationFrame(() => slide.element.style.transform = `translateX(${slide.currentPosition}px)`)
    return false
}