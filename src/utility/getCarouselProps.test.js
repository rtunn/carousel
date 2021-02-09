import { getCarouselProps } from './getCarouselProps'

const defaultProps = {
    slideDirection: 1,
    slideDuration: 2000,
    slideDelay: 5000,
    numVisible: 3
}

describe('getCarouselProps', () => {
    describe('given element with config in dataset', () => {
        document.body.innerHTML = `
        <div class="Carousel" data-slide-direction="-1" data-slide-duration="1000" data-slide-delay="4000"
            data-num-visible="2">
            <div class="slide"><h3>0</h3></div>
            <div class="slide"><h3>1</h3></div>
            <div class="slide"><h3>2</h3></div>
            <div class="slide"><h3>3</h3></div>
        </div>
        `
        const elem = document.querySelector('.Carousel')

        test('returns props object', () => {
            const received = getCarouselProps(elem, defaultProps)
            expect(received.element).toEqual(elem)
            expect(received.slides.length).toBe(4)
            expect(received.slides[0].content).toContain('<h3>0</h3>')
            expect(received.slides[1].content).toContain('<h3>1</h3>')
            expect(received.slides[2].content).toContain('<h3>2</h3>')
            expect(received.slides[3].content).toContain('<h3>3</h3>')
            expect(received.direction).toBe(-1)
            expect(received.duration).toBe(1000)
            expect(received.slideDelay).toBe(4000)
            expect(received.numVisibleSlides).toBe(2)
        })
    })

    describe('given element without config in dataset', () => {
        document.body.innerHTML = `
        <div class="Carousel">
            <div class="slide"><h3>0</h3></div>
            <div class="slide"><h3>1</h3></div>
            <div class="slide"><h3>2</h3></div>
            <div class="slide"><h3>3</h3></div>
        </div>
        `
        const elem = document.querySelector('.Carousel')

        test('returns props object', () => {
            const received = getCarouselProps(elem, defaultProps)
            expect(received.element).toEqual(elem)
            expect(received.slides.length).toBe(4)
            expect(received.slides[0].content).toContain('<h3>0</h3>')
            expect(received.slides[1].content).toContain('<h3>1</h3>')
            expect(received.slides[2].content).toContain('<h3>2</h3>')
            expect(received.slides[3].content).toContain('<h3>3</h3>')
            expect(received.direction).toBe(1)
            expect(received.duration).toBe(2000)
            expect(received.slideDelay).toBe(5000)
            expect(received.numVisibleSlides).toBe(3)
        })
    })
})