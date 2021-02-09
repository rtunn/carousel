/**
 * prepareAnimation moves the slide into the position it's expected to be in to perform the primary animation
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
 * @returns {Array.<Promise>}
 */
export const prepareAnimation = (container, slides, direction) => {
    const promises = []
    for (let slide of slides) {
        let nextPosition
        if (slide.nextPosition < 0 || slide.nextPosition > container.getBoundingClientRect().width) {
            nextPosition = slide.nextPosition
        } else {
            nextPosition = direction > 0 ? container.getBoundingClientRect().width : slide.width * -1
        }
        slide.element.style.opacity = 0
        slide.element.style.transform = `translateX(${nextPosition}px)`
        slide.currentPosition = nextPosition

        const completedPrep = new Promise((resolve) => {
            // use timeout to return flow control to browser,
            // then reset opacity on separate UI update
            window.setTimeout(() => {
                slide.element.style.opacity = 1
                resolve()
            }, 1)
        })
        promises.push(completedPrep)
    }
    return promises
}