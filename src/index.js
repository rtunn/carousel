import Carousel from "./components/Carousel"

const carouselDefaultProps = {
    slideDirection: 1,
    slideDuration: 2000,
    slideDelay: 5000,
    numVisible: 3
}

document.addEventListener('DOMContentLoaded', () => {
    /**
     * getCarouselProps retrieves configuration properties
     * @param {Object} el HTMLElement
     * @returns {Object} props to be used as Carousel constructor arg
     */
    const getCarouselProps = (el) => {

        /**
         * isInt determines if value represents an integer
         * @param {Any} value 
         * @returns {Boolean}
         */
        const isInt = (value) => {
            if (isNaN(value)) {
              return false;
            }
            const x = parseFloat(value);
            return (x | 0) === x;
          }

        /**
         * getOptionOrDefault attempts to retrieve property from element's dataset, falls back to default if property not present
         * @param {string} propertyName 
         * @returns {Number} integer 
         */
        const getOptionOrDefault = (propertyName) => {
            if (isInt(el.dataset[propertyName])) {
                return parseInt(el.dataset[propertyName], 10)
            }
            return parseInt(carouselDefaultProps[propertyName], 10)
        }

        const props = {
            element: el,
            slides: [],
            direction: getOptionOrDefault('slideDirection'),
            duration: getOptionOrDefault('slideDuration'),
            slideDelay: getOptionOrDefault('slideDelay'),
        }

        const slideElements = el.querySelectorAll('.slide')
        for (let i=0; i < slideElements.length; i++) {
            const slide = slideElements[i]
            props.slides.push({
                content: slide.innerHTML
            })
        }


        props.numVisibleSlides = Math.min(props.slides.length - 1, getOptionOrDefault('numVisible'))

        return props
    }

    /**
     * initCarousels initializes, renders and mounts Carousel components
     */
    const initCarousels = () => {
        const carouselElements = document.querySelectorAll('.Carousel')
        for (let el of carouselElements) {
            const props = getCarouselProps(el)
            const carousel = new Carousel(props)
            carousel.update()
        }
    }

    initCarousels()
})