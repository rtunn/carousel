import { cleanup } from "./slide-functions"

/**
 * prepareAnimation moves the slide into the position it's expected to be in to perform the primary animation
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @returns {Array.<Promise>}
 */
export const prepareAnimation = (container, slides, direction, numVisibleSlides) => {
    const promises = []
    for (let slide of slides) {
        let nextPosition
        if (slide.props.nextPosition < 0 || slide.props.nextPosition > container.getBoundingClientRect().width) {
            nextPosition = slide.props.nextPosition
        } else {
            nextPosition = direction > 0 ? container.getBoundingClientRect().width : slide.props.width * -1
        }
        slide.props.element.style.opacity = 0
        slide.props.element.style.transform = `translateX(${nextPosition}px)`
        slide.props.currentPosition = nextPosition
        const completedPrep = new Promise((resolve, reject) => {
            setTimeout(() => {
                slide.props.element.style.opacity = 1
                resolve()
            }, 1)
        })
        promises.push(completedPrep)
    }
    return promises
}

/**
 * executeAnimation moves on-screen slides into position
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} duration number of milliseconds to complete animation
 * @returns {Array.<Promise>}
 */
export const executeAnimation = (container, slides, duration) => {
    const msFps = 16.67
    const numFrames = Math.ceil(duration / msFps)
    const slidePromises = []

    /**
     * animateFrame moves slide incrementally until reaching desired position
     * @param {Object} slide Slide instance
     * @param {Number} inc Float indicating amplitude of position change
     * @returns {Promise}
     */
    const animateFrame = (slide, inc) => {
        return new Promise(resolve => {
            let frameInterval = setInterval(() => {
                if (slide.props.currentPosition === slide.props.nextPosition) {
                    clearInterval(frameInterval)
                    resolve()
                }
                const limit = slide.props.nextPosition > slide.props.currentPosition ? inc : -1 * inc
                slide.props.currentPosition = getNextCoord(slide.props.currentPosition, slide.props.nextPosition, limit)
                requestAnimationFrame(() => slide.props.element.style.transform = `translateX(${slide.props.currentPosition}px)`)
            }, msFps)
        })
    }

    for (let slide of slides) {
        const inc = slide.props.width / numFrames
        const completed = animateFrame(slide, inc)
        slidePromises.push(completed)
    }
    return slidePromises
}

/**
 * getNextCoord returns the sum of currentPosition and limit if the difference between nextPosition 
 * and currentPosition is greater than limit, else nextPosition
 * @param {Number} currentPosition Float indicating the element's current position
 * @param {Number} nextPosition Float indicating the element's target position
 * @param {Number} limit Float indicating the maximum amplitude of change
 * @returns {Number} the intermediate, or possibly final, position the element should take
 */
const getNextCoord = (currentPosition, nextPosition, limit) => {
    if (Math.abs(nextPosition - currentPosition) > Math.abs(limit)) {
        return parseFloat(parseFloat(currentPosition + limit).toFixed(2))
    } else {
        return nextPosition
    }
}