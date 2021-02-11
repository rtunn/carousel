import Slide from './Slide'
import slideControl from './SlideControl'
import { prepareAnimation } from '../animations/prepareAnimation'
import { executeAnimation } from '../animations/executeAnimation'
import { animationManager } from '../animationManager'
import { replaceChildElement } from "../utility/replaceChildElement"
import { getTallestElementHeight } from '../utility/getTallestElementHeight'


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
    constructor({
        element,
        slides,
        direction,
        duration,
        slideDelay,
        numVisibleSlides
    }) {
        this.slideInterval = null
        this.state = {}
        this.resting = true
        this.element = element
        this.slides = slides
        this.direction = direction
        this.duration = duration
        this.slideDelay = slideDelay
        this.numVisibleSlides = numVisibleSlides
    }

    set element(el) {
        if (el instanceof HTMLElement === false) throw 'element must be instance of HTMLElement'
        this._element = el
    }

    get element() {
        return this._element
    }

    set slides(s) {
        if (Array.isArray(s) === false) throw 'slides must be an array'
        if (s.length < 1) throw 'must supply at least one slide'
        this._slides = s
    }

    get slides() {
        return this._slides
    }

    set direction(d) {
        if ([-1, 1].includes(d) === false) throw 'direction must be 1 or -1'
        this._direction = d
    }

    get direction() {
        return this._direction
    }

    set duration(d) {
        if (typeof d !== 'number') throw 'duration must be a number'
        this._duration = d
    }

    get duration() {
        return this._duration
    }

    set slideDelay(s) {
        if (typeof s !== 'number') throw 'slideDelay must be a number'
        this._slideDelay = s
    }

    get slideDelay() {
        return this._slideDelay
    }

    set numVisibleSlides(n) {
        if (typeof n !== 'number') throw 'numVisibleSlides must be a number'
        this._numVisibleSlides = n
    }

    get numVisibleSlides() {
        return this._numVisibleSlides
    }



    /**
     * componentDidMount renders Slide components and attaches them to Carousel element,
     * calls startSlides
     */
    componentDidMount = () => {
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
            slide.update()
            this.state.slides.push(slide)
        })
        const slideElements = this.state.slides.map(slide => slide.element)

        for (let slideEl of slideElements) {
            container.appendChild(slideEl)
        }

        const tallestSlideHeight = getTallestElementHeight(slideElements, 0)
        container.style.height = `${tallestSlideHeight}px`

        this.element.onmouseenter = this.pauseSlides
        this.element.onmouseleave = this.startSlides
        window.onresize = this.resizeHandler
        this.startSlides()
    }

    /**
     * resizehandler pauses slides and updates the component
     */
    resizeHandler = () => {
        this.pauseSlides()
        this.update()
    }

    /**
     * pauseSlides removes the interval set by startSlides
     */
    pauseSlides = () => {
        clearInterval(this.state.slideInterval)
        this.state.slideInterval = null
    }

    /**
     * startSlides sets an interval to call handleTransition with the Carousel's slideDelay
     */
    startSlides = () => {
        const delay = this.slideDelay + this.duration
        this.state.slideInterval = setInterval(() => {
            if (document.hidden === false) {
                this.handleTransition(this.direction)
            }
        }, delay)
    }

    /**
     * handleTransition calls the animationManager if the carousel is not in motion
     * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
     * @param {Boolean} _ returns false if early return (carousel is not resting), else true
     */
    handleTransition = (direction) => {
        if (this.resting !== true) return false
        this.resting = false
        const slides = this.state.slides
        animationManager(slides,
            direction,
            this.numVisibleSlides,
            this.getPrepFn(direction),
            this.getPrimaryFn()
        )
        setTimeout(() => {
            this.resting = true
        }, this.duration)
        return true
    }

    /**
     * getPrepFn returns a function that is used as the prepFn callback arg in animationManager
     * @param {Number} direction 1 or -1, where 1 means the slides are moving to the left and -1 means slides are moving to the right
     * @returns {Function}
     */
    getPrepFn = (direction) => {
        const container = this.element.querySelector('.slide-container')
        return (offscreenSlides) => prepareAnimation(container, offscreenSlides, direction)
    }

    /**
     * getPrimaryFn returns a function that is used as the primaryFn callback arg in animationManager
     * @returns {Function}
     */
    getPrimaryFn = () => {
        return (modifiedSlides) => executeAnimation(modifiedSlides, this.duration)
    }

    /**
     * render creates the carousel's HTMLElement
     * @returns {Object} HTMLElement
     */
    render = () => {
        const el = document.createElement('div')
        el.classList.add('Carousel')
        const container = document.createElement('div')
        container.classList.add('slide-container')
        el.appendChild(
            slideControl({
                btnType: 'prev',
                onClick: this.handleTransition
            })
        )
        el.appendChild(container)
        el.appendChild(
            slideControl({
                btnType: 'next',
                onClick: this.handleTransition
            })
        )
        return el
    }

    /**
     * mount replaces the existing element in the DOM with el, then calls componentDidMount
     * @param {Object} el HTMLElement
     */
    mount = (el) => {
        const didReplace = replaceChildElement(el, this.element)
        this.element = el
        if (didReplace === true) {
            this.componentDidMount()
        }
        return didReplace
    }

    /**
     * update is a convenience function for mounting and rendering
     */
    update = () => {
        this.mount(this.render())
    }
}

export default Carousel