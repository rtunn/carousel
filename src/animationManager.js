import {
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
export const animationManager = (container, slides, direction, numVisibleSlides, prepFn, primaryFn) => {
    const containerWidth = container.getBoundingClientRect().width
    const slideWidth = containerWidth / numVisibleSlides

    if (direction > 0) {
        slideLeft(slides)
    } else {
        slideRight(slides)
    }

    nextPosition(slides, slideWidth, direction)
    prepAnimation(container, slides, direction, numVisibleSlides, prepFn)
    primaryAnimation(container, slides, direction, numVisibleSlides, primaryFn)
}

/**
 * prepAnimation sets appropriate position for off-screen slide
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @param {Function} animationFn function that performs the animation
 */
const prepAnimation = (container, slides, direction, numVisibleSlides, animationFn) => {
    const nextSlide = getNextSlide(slides, direction, numVisibleSlides)
    animationFn(container, nextSlide, direction)
}

/**
 * primaryAnimation calls primary animation function
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @param {Function} animationFn function that performs the animation
 */
const primaryAnimation = (container, slides, direction, numVisibleSlides, animationFn) => {
    const activeSlides = getActiveSlides(slides, direction, numVisibleSlides)
    animationFn(container, activeSlides)
}

/**
 * cleanupAnimation calls cleanup animation function on off-screen slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @param {Function} animationFn function that performs the animation
 */
const cleanupAnimation = (slides, animationFn) => {
    const offscreenSlides = getOffscreenSlides(slides)
    animationFn(offscreenSlides)
}  

/**
 * getNextSlide returns the next slide
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @returns {Object} returns a single Slide instance
 */
const getNextSlide = (slides, direction, numVisibleSlides) => {
    if (direction > 0) {
        return slides.find(slide => slide.props.currentIndex == numVisibleSlides)
    } else {
        return slides.reduce((prevSlide, nextSlide) => prevSlide.props.currentIndex > nextSlide.props.currentIndex ? prevSlide : nextSlide)
    }
}

/**
 * getActiveSlides returns slides which are or will be on-screen
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @returns {Array.<Object>} array of Slide instances
 */
const getActiveSlides = (slides, direction, numVisibleSlides) => {
    let activeSlides
    if (direction > 0) {
        activeSlides = slides.filter(slide => slide.props.currentIndex <= numVisibleSlides)
    } else {
        activeSlides = slides.filter(slide => slide.props.currentIndex < numVisibleSlides)
        const lastSlide = slides.reduce((prevSlide, nextSlide) => prevSlide.props.currentIndex > nextSlide.props.currentIndex ? prevSlide : nextSlide)
        activeSlides.push(lastSlide)
    }
    return activeSlides
}

/**
 * getOffscreenSlides returns array of slides whose current index is greater than or equal to number of visible slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} numVisibleSlides integer indicating the number of slides to be displayed
 * @returns {Array.<Object>} array of Slide instances
 */
const getOffscreenSlides = (slides, numVisibleSlides) => {
    return slides.filter(slide => slide.props.currentIndex >= numVisibleSlides)
}

/**
 * getLastSlide returns the slide with the largest currentIndex
 * @param {Array.<Object>} slides array of Slide instances
 * @returns {Object} Slide instance
 */
const getLastSlide = (slides) => {
    return slides.reduce((prevSlide, nextSlide) => prevSlide.props.currentIndex > nextSlide.props.currentIndex ? prevSlide : nextSlide)
}