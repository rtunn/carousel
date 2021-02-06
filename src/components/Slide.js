/**
 * Class representing a slide in a carousel
 */
class Slide {
    /**
     * Creates a Slide
     * @param {Object} props configuration properties
     * @param {Number} currentIndex props.currentIndex - Integer indicating current index relative to carousel. 0 represents left side of carousel
     * @param {Number} currentPosition props.currentPosition - Float indicating the magnitude of the current translation
     * @param {Number} nextIndex props.nextIndex - Integer indicating next index relative to carousel. 0 represents left side of carousel
     * @param {Number} nextPosition props.nextPosition - Float indicating the magnitude of the target translation
     */
    constructor(props = {
        currentIndex: 0,
        currentPosition: 0,
        nextIndex: null,
        nextPosition: null,
        domIndex: 0
    }) {
        this.props = props
    }

    /**
     * render creates the HTMLElement for a Slide
     * @returns {Object} HTMLElement
     */
    render() {
        const el = document.createElement('div')
        el.classList.add('slide')
        el.style.width = `${this.props.width}px`
        el.style.transform = `translateX(${this.props.currentPosition}px)`
        el.innerHTML = this.props.content
        this.props.element = el
        return el
    }

    /**
     * mount replaces the existing element in the DOM with el
     * @param {Object} el HTMLElement
     */
    mount(el) {
        if (this.props.element != null && this.props.element.parentNode != null) {
            this.props.element.parentNode.replaceChild(el, this.props.element)
        }
        this.props.element = el
    }

    /**
     * update is a convenience function for mounting and rendering
     */
    update() {
        this.mount(this.render())
    }
}

export default Slide