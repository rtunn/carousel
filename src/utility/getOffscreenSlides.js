/**
 * getOffscreenSlides returns array of slides whose current index is greater than or equal to number of visible slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @returns {Array.<Object>} array of Slide instances
 */
export const getOffscreenSlides = (slides, numVisibleSlides) => {
    const offscreenSlides = slides.filter(slide => slide.currentIndex >= numVisibleSlides)
    return offscreenSlides
}