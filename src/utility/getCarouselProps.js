import { getOptionOrDefault } from './getOptionOrDefault'
import { toInt } from './toInt'
import { strToArrayInt } from './strToArrayInt'

/**
 * getCarouselProps retrieves configuration properties
 * @param {Object} el HTMLElement
 * @param {Object} defaultProps default configuration properties
 * @returns {Object} props to be used as Carousel constructor arg
 */
export const getCarouselProps = (el, defaultProps) => {
    const intRequest = { convertFn: toInt }
    const arrayRequest = { convertFn: strToArrayInt }
    const dataset = el.dataset
    const fallback = defaultProps
    const props = {
        element: el,
        slides: [],
        direction: getOptionOrDefault({ ...intRequest, name: 'slideDirection' }, dataset, fallback),
        duration: getOptionOrDefault({ ...intRequest, name: 'slideDuration' }, dataset, fallback),
        slideDelay: getOptionOrDefault({ ...intRequest, name: 'slideDelay' }, dataset, fallback),
        breakPoints: getOptionOrDefault({ ...arrayRequest, name: 'breakPoints' }, dataset, fallback),
        breakPointNumVisibleSlides: getOptionOrDefault({ ...arrayRequest, name: 'breakPointNumSlides' }, dataset, fallback)
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
        getOptionOrDefault({ ...intRequest, name: 'numVisible' }, dataset, fallback)
    )

    return props
}