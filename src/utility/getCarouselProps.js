import { getOptionOrDefault } from './getOptionOrDefault'
import { toInt } from './toInt'

/**
 * getCarouselProps retrieves configuration properties
 * @param {Object} el HTMLElement
 * @param {Object} defaultProps default configuration properties
 * @returns {Object} props to be used as Carousel constructor arg
 */
export const getCarouselProps = (el, defaultProps) => {
    const propertyRequest = {
        convertFn: toInt
    }
    const dataset = el.dataset
    const fallback = defaultProps
    const props = {
        element: el,
        slides: [],
        direction: getOptionOrDefault({ ...propertyRequest, name: 'slideDirection' }, dataset, fallback),
        duration: getOptionOrDefault({ ...propertyRequest, name: 'slideDuration' }, dataset, fallback),
        slideDelay: getOptionOrDefault({ ...propertyRequest, name: 'slideDelay' }, dataset, fallback),
    }

    const slideElements = el.querySelectorAll('.slide')
    for (let i = 0; i < slideElements.length; i++) {
        const slide = slideElements[i]
        props.slides.push({
            content: slide.innerHTML
        })
    }

    props.numVisibleSlides = Math.min(
        props.slides.length - 1,
        getOptionOrDefault({ ...propertyRequest, name: 'numVisible' }, dataset, fallback)
    )

    return props
}