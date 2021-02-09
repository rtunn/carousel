import { initCarousels } from './initCarousels'
import Carousel from '../components/Carousel'
const mockCarouselUpdate = jest.fn()
jest.mock('../components/Carousel', () => {
    return jest.fn().mockImplementation(() => {
        return {update: mockCarouselUpdate}
    })
})

const defaultProps = {
    slideDirection: 1,
    slideDuration: 2000,
    slideDelay: 5000,
    numVisible: 3
}

describe('initCarousels', () => {
    beforeEach(() => {
        Carousel.mockClear()
        mockCarouselUpdate.mockClear()
    })
    test('constructs Carousel and returns in an array', () => {
        document.body.innerHTML = `
            <div class="Carousel">
                <div class="slide"><h3>0</h3></div>
                <div class="slide"><h3>1</h3></div>
                <div class="slide"><h3>2</h3></div>
                <div class="slide"><h3>3</h3></div>
            </div>
        `

        // check mockClear is working
        expect(Carousel).toHaveBeenCalledTimes(0)

        const carousels = initCarousels(defaultProps)
        expect(Carousel).toHaveBeenCalledTimes(1)
        expect(mockCarouselUpdate).toHaveBeenCalledTimes(1)
    })

    test('constructs the correct number of Carousels', () => {
        document.body.innerHTML = `
            <div class="Carousel">
                <div class="slide"><h3>0</h3></div>
                <div class="slide"><h3>1</h3></div>
                <div class="slide"><h3>2</h3></div>
                <div class="slide"><h3>3</h3></div>
            </div>
            <div class="Carousel second">
                <div class="slide"><h3>A</h3></div>
                <div class="slide"><h3>B</h3></div>
                <div class="slide"><h3>C</h3></div>
                <div class="slide"><h3>D</h3></div>
            </div>
        `

        // check mockClear is working
        expect(Carousel).toHaveBeenCalledTimes(0)
        
        const carousels = initCarousels(defaultProps)
        expect(Carousel).toHaveBeenCalledTimes(2)
        expect(mockCarouselUpdate).toHaveBeenCalledTimes(2)
    })
})