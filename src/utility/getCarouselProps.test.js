import { getCarouselProps } from './getCarouselProps'
import * as go from './getOptionOrDefault'

const defaultProps = {
    slideDirection: 1,
    slideDuration: 2000,
    slideDelay: 5000,
    numVisible: 3,
    breakPoints: [700, 1500],
    breakPointNumSlides: [2, 3]
}

describe('getCarouselProps', () => {

    describe('given element with config in dataset', () => {
        
        test('returns props object', () => {
            const datasetConfig = {
                slideDirection: -1,
                slideDuration: 1000,
                slideDelay: 4000,
                numVisible: 2,
                breakPoints: "700,500",
                breakPointNumSlides: "2,3"
            }
    
            const getOptionOrDefaultMock = jest.spyOn(go, 'getOptionOrDefault').mockImplementation(({convertFn, name}, _, __) => datasetConfig[name])
    
            document.body.innerHTML = `
            <div class="Carousel" 
                data-slide-direction="${datasetConfig.slideDirection}" 
                data-slide-duration="${datasetConfig.slideDuration}" 
                data-slide-delay="${datasetConfig.slideDelay}"
                data-num-visible="${datasetConfig.numVisible}" 
                data-break-points="${datasetConfig.breakPoints}" 
                data-break-point-num-slides="${datasetConfig.breakPointNumSlides}"
            >
                <div class="slide"><h3>0</h3></div>
                <div class="slide"><h3>1</h3></div>
                <div class="slide"><h3>2</h3></div>
                <div class="slide"><h3>3</h3></div>
            </div>
            `
            const elem = document.querySelector('.Carousel')

            const received = getCarouselProps(elem, defaultProps)
            expect(received.element).toEqual(elem)
            expect(received.slides.length).toBe(4)
            expect(received.slides[0].content).toContain('<h3>0</h3>')
            expect(received.slides[1].content).toContain('<h3>1</h3>')
            expect(received.slides[2].content).toContain('<h3>2</h3>')
            expect(received.slides[3].content).toContain('<h3>3</h3>')
            expect(received.direction).toBe(datasetConfig.slideDirection)
            expect(received.duration).toBe(datasetConfig.slideDuration)
            expect(received.slideDelay).toBe(datasetConfig.slideDelay)
            expect(received.numVisibleSlides).toBe(datasetConfig.numVisible)
            expect(received.breakPoints).toBe(datasetConfig.breakPoints)
        })
    })

    describe('given element without config in dataset', () => {
        
        test('returns props object', () => {
            document.body.innerHTML = `
            <div class="Carousel">
                <div class="slide"><h3>0</h3></div>
                <div class="slide"><h3>1</h3></div>
                <div class="slide"><h3>2</h3></div>
                <div class="slide"><h3>3</h3></div>
            </div>
            `
            const elem = document.querySelector('.Carousel')
            const getOptionOrDefaultMock = jest.spyOn(go, 'getOptionOrDefault').mockImplementation(({convertFn, name}, _, __) => defaultProps[name])
            const received = getCarouselProps(elem, defaultProps)
            expect(received.element).toEqual(elem)
            expect(received.slides.length).toBe(4)
            expect(received.slides[0].content).toContain('<h3>0</h3>')
            expect(received.slides[1].content).toContain('<h3>1</h3>')
            expect(received.slides[2].content).toContain('<h3>2</h3>')
            expect(received.slides[3].content).toContain('<h3>3</h3>')
            expect(received.direction).toBe(defaultProps.slideDirection)
            expect(received.duration).toBe(defaultProps.slideDuration)
            expect(received.slideDelay).toBe(defaultProps.slideDelay)
            expect(received.numVisibleSlides).toBe(defaultProps.numVisible)
            expect(received.breakPoints).toBe(defaultProps.breakPoints)
            expect(received.breakPointNumVisibleSlides).toBe(defaultProps.breakPointNumSlides)
        })
    })
})