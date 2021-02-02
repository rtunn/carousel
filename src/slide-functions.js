/**
 * slideLeft sets the next index for slides when sliding left
 * @param {Array.<Object>} slides array of Slide instances
 */
export const slideLeft = slides => {
    const maxIndex = slides.length - 1
    for (let slide of slides) {
        slide.props.nextIndex = slide.props.currentIndex - 1 >= 0 ? slide.props.currentIndex - 1 : maxIndex
    }
}

/**
 * slideRight sets the next index for slides when sliding right
 * @param {Array.<Object>} slides array of Slide instances
 */
export const slideRight = slides => {
    const maxIndex = slides.length - 1
    for (let slide of slides) {
        slide.props.nextIndex = slide.props.currentIndex < maxIndex ? slide.props.currentIndex + 1 : 0
    }
}

/**
 * nextPosition sets the target position for each slide 
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} slideWidth Float width of slide's DOM element
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 */
export const nextPosition = (slides, slideWidth, direction) => {
    const maxIndex = slides.length - 1
    for (let slide of slides) {
        if (slide.props.nextIndex === null) continue
        
        if (direction > 0) {
            if (slide.props.currentIndex === 0) {
                slide.props.nextPosition = slide.props.width * -1
            } else {
                slide.props.nextPosition = slide.props.nextIndex * slideWidth
            }
        } else {
            slide.props.nextPosition = slide.props.nextIndex * slideWidth
        }
    }
}

/**
 * cleanup updates slide props to prepare for next animation
 * @param {Array.<Object>} slides array of Slide instances
 */
export const cleanup = slides => {
    for (let slide of slides) {
        slide.props.currentIndex = slide.props.nextIndex
        slide.props.nextIndex = null
        slide.props.currentPosition = slide.props.nextPosition
        slide.props.nextPosition = null
    }
    return slides
}