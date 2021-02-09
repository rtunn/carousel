import { getCarouselProps } from './getCarouselProps'
import Carousel from '../components/Carousel'

/**
 * initCarousels initializes, renders and mounts Carousel components
 * @param {Object} defaultProps default configuration properties
 */
export const initCarousels = (defaultProps) => {
    const carouselElements = document.querySelectorAll('.Carousel')
    for (let el of carouselElements) {
        const props = getCarouselProps(el, defaultProps)
        const carousel = new Carousel(props)
        carousel.update()
    }
}