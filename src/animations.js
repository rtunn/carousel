import { cleanup } from "./slide-functions"

/**
 * prepareAnimation moves the slide into the position it's expected to be in to perform the primary animation
 * @param {Object} container HTMLElement parent node of slides
 * @param {Object} slide Slide instance
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 */
export const prepareAnimation = (container, slide, direction) => {
    const nextPosition = direction > 0 ? container.getBoundingClientRect().width : slide.props.width * -1
    slide.props.element.style.opacity = 0
    slide.props.element.style.transform = `translateX(${nextPosition}px)`
    slide.props.currentPosition = nextPosition
    setTimeout(() => {
        slide.props.element.style.opacity = 1
    }, 1)
    console.log('[animations] prepareAnimation', nextPosition)
}

/**
 * executeAnimation moves on-screen slides into position
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} duration number of milliseconds to complete animation
 */
export const executeAnimation = (container, slides, duration) => {
    const msFps = 16.67
    const numFrames = Math.ceil(duration / msFps)

    /**
     * animateFrame moves slide incrementally until reaching desired position
     * @param {Object} slide Slide instance
     * @param {Number} inc Float indicating amplitude of position change
     */
    const animateFrame = (slide, inc) => {
        if (slide.props.currentPosition === slide.props.nextPosition) {
            cleanup([slide])
            return
        }

        const limit = slide.props.nextPosition > slide.props.currentPosition ? inc : -1 * inc
        slide.props.currentPosition = getNextCoord(slide.props.currentPosition, slide.props.nextPosition, limit)
        slide.props.element.style.transform = `translateX(${slide.props.currentPosition}px)`
        setTimeout(() => animateFrame(slide, inc), msFps)
    }

    for (let slide of slides) {
        console.log(slide)
        setTimeout(() => {
            const inc = slide.props.width / numFrames
            animateFrame(slide, inc)
        }, 1)
    }

    console.log('[animations] executeAnimation')
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