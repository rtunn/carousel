import {
    cleanup,
    nextPosition,
    slideLeft,
    slideRight
} from './slide-functions'

/**
 * animationManager performs animation in 3 steps: preparation, primary, and cleanup
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @param {Function} prepFn function that performs preparatory animation
 * @param {Function} primaryFn function that performs primary animation
 */
export const animationManager = (slides, direction, numVisibleSlides, prepFn, primaryFn) => {
    if (direction > 0) {
        slideLeft(slides)
    } else {
        slideRight(slides)
    }

    nextPosition(slides, direction)
    Promise.all(prepAnimation(slides, numVisibleSlides, prepFn))
        .then(_ => Promise.all(primaryFn(slides)))
        .then(_ => cleanup(slides))
}

/**
 * prepAnimation sets appropriate position for off-screen slide
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @param {Function} animationFn function that performs the animation
 * @returns {Array.<Promise>} 
 */
const prepAnimation = (slides, numVisibleSlides, animationFn) => {
    const offscreenSlides = getOffscreenSlides(slides, numVisibleSlides)
    return animationFn(offscreenSlides)
}

/**
 * primaryAnimation calls primary animation function
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @param {Function} animationFn function that performs the animation
 * @returns {Array.<Promise>}
 */
const primaryAnimation = (slides, animationFn) => {
    return animationFn(slides)
}

/**
 * getOffscreenSlides returns array of slides whose current index is greater than or equal to number of visible slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @returns {Array.<Object>} array of Slide instances
 */
const getOffscreenSlides = (slides, numVisibleSlides) => {
    const offscreenSlides = slides.filter(slide => slide.currentIndex >= numVisibleSlides)
    return offscreenSlides
}