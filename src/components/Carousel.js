import Slide from './Slide'
import slideControl from './SlideControl'
import {
    prepareAnimation,
    executeAnimation
} from '../animations'
import {
    animationManager
} from '../animationManager'

/**
 * Class representing a carousel
 */
class Carousel {
    /**
     * Create a carousel
     * @param {Object} props
     * @param {Object} element props.element - HTMLElement
     * @param {Array.<Object>} slides props.slides - Array of Slide props
     * @param {string} content props.slides[i].content - string representation of Slide's innerHTML
     * @param {Number} direction props.direction - 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
     * @param {Number} duration props.duration - number of milliseconds to complete slide animation
     * @param {Number} slideDelay props.slideDelay - number of milliseconds between slide animations when on autoplay
     * @param {Number} numVisibleSlides props.numVisibleSlides - Integer number of slides visible to client
     */
    constructor(props) {
        this.slideInterval = null
        this.state = {}
        this.resting = true
        Object.assign(this, props)
    }

    /**
     * componentDidMount renders Slide components and attaches them to Carousel element,
     * calls startSlides
     */
    componentDidMount() {
        const container = this.element.querySelector('.slide-container')
        const containerWidth = container.getBoundingClientRect().width
        const slideWidth = containerWidth / this.numVisibleSlides
        this.state.slides = []
        const maxIndex = this.slides.length - 1
        this.slides.forEach((slideProps, i) => {
            const slide = new Slide({
                ...slideProps,
                width: slideWidth,
                indexDOM: i,
                currentIndex: i,
                currentPosition: i < maxIndex ? i * slideWidth : -slideWidth,
                maxIndex
            })
            slide.render()
            this.state.slides.push(slide)
        })
        const slideElements = this.state.slides.map(slide => slide.element)

        for (let slideEl of slideElements) {
            container.appendChild(slideEl)
        }

        this.startSlides()
    }

    /**
     * pauseSlides removes the interval set by startSlides
     */
    pauseSlides() {
        clearInterval(this.state.slideInterval)
        this.state.slideInterval = null
    }

    /**
     * startSlides sets an interval to call handleTransition with the Carousel's slideDelay
     */
    startSlides() {
        const delay = this.slideDelay + this.duration
        this.state.slideInterval = setInterval(() => {
            if (!document.hidden) {
                this.handleTransition(this.direction)
            }
        }, delay)
    }

    /**
     * handleTransition calls the animationManager if the carousel is not in motion
     * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
     */
    handleTransition(direction) {
        if (this.resting !== true) return
        this.resting = false
        const slides = this.state.slides
        const prepFn = (offscreenSlides) => {
            return prepareAnimation(slides, offscreenSlides, direction)
        }
        const primaryFn = (modifiedSlides) => {
            return executeAnimation(modifiedSlides, this.duration)
        }
        animationManager(slides, direction, this.numVisibleSlides, prepFn, primaryFn)
        setTimeout(() => {
            this.resting = true
        }, this.duration)
    }

    /**
     * render creates the carousel's HTMLElement
     * @returns {Object} HTMLElement
     */
    render() {
        const el = document.createElement('div')
        el.classList.add('Carousel')
        const container = document.createElement('div')
        container.classList.add('slide-container')
        el.appendChild(
            slideControl({
                btnType: 'prev',
                onClick: () => this.handleTransition(-1)
            })
        )
        el.appendChild(container)
        el.appendChild(
            slideControl({
                btnType: 'next',
                onClick: () => this.handleTransition(1)
            })
        )
        return el
    }

    /**
     * mount replaces the existing element in the DOM with el, then calls componentDidMount
     * @param {Object} el HTMLElement
     */
    mount(el) {
        el.onmouseenter = this.pauseSlides
        el.onmouseleave = this.startSlides
        window.onresize = () => {
            this.pauseSlides()
            this.update()
        }

        if (this.element != null && this.element.parentNode != null) {
            this.element.parentNode.replaceChild(el, this.element)
        }
        this.element = el
        this.componentDidMount()
    }

    /**
     * update is a convenience function for mounting and rendering
     */
    update() {
        this.mount(this.render())
    }
}

export default Carousel