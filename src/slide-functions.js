/**
 * slideLeft sets the next index for slides when sliding left
 * @param {Array.<Object>} slides array of Slide instances
 */
export const slideLeft = slides => {
    const maxIndex = slides.length - 1
    for (let slide of slides) {
        slide.nextIndex = slide.currentIndex - 1 >= 0 ? slide.currentIndex - 1 : maxIndex
    }
}

/**
 * slideRight sets the next index for slides when sliding right
 * @param {Array.<Object>} slides array of Slide instances
 */
export const slideRight = slides => {
    const maxIndex = slides.length - 1
    for (let slide of slides) {
        slide.nextIndex = slide.currentIndex < maxIndex ? slide.currentIndex + 1 : 0
    }
}

/**
 * nextPosition sets the target position for each slide 
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} slideWidth Float width of slide's DOM element
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 */
export const nextPosition = (slides, direction) => {
    const maxIndex = slides.length - 1
    for (let slide of slides) {
        if (direction > 0) {
            slide.nextPosition = slide.currentIndex === 0 ? slide.width * -1 : slide.nextIndex * slide.width
        } else {
            slide.nextPosition = slide.currentIndex === maxIndex ? 0 : slide.nextIndex * slide.width
                }
    }
}

/**
 * cleanup updates slide props to prepare for next animation
 * @param {Array.<Object>} slides array of Slide instances
 */
export const cleanup = slides => {
    for (let slide of slides) {
        slide.currentIndex = slide.nextIndex
        slide.nextIndex = null
        slide.currentPosition = slide.nextPosition
        slide.nextPosition = null
    }
    return slides
}