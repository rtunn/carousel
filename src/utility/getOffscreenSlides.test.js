import { getOffscreenSlides } from './getOffscreenSlides'

describe('getOffscreenSlides', () => {
    
    it('returns array of slides whose currentIndex is greater than or equal to numVisibleSlides', () => {
        const slides = [
            {currentIndex: 0},
            {currentIndex: 1},
            {currentIndex: 2},
            {currentIndex: 3},
        ]
        const numVisibleSlides = 2
        expect(getOffscreenSlides(slides, numVisibleSlides)).toStrictEqual([
            {currentIndex: 2},
            {currentIndex: 3}
        ])
    })
})
