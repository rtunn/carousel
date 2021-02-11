import { animationManager } from './animationManager'
import * as slideFn from './slide-functions'
import * as gos from './utility/getOffscreenSlides'

const slideLeftSpy = jest.spyOn(slideFn, 'slideLeft').mockImplementation(() => jest.fn())
const slideRightSpy = jest.spyOn(slideFn, 'slideRight').mockImplementation(() => jest.fn())
const nextPositionSpy = jest.spyOn(slideFn, 'nextPosition').mockImplementation(() => jest.fn())
const cleanupSpy = jest.spyOn(slideFn, 'cleanup').mockImplementation(() => jest.fn())

describe('animationManager', () => {
    const prepFnSpy = jest.fn(() => [new Promise(resolve => resolve())])
    const primaryFnSpy = jest.fn(() => [new Promise(resolve => resolve())])
    const getOffscreenSlidesSpy = jest.spyOn(gos, 'getOffscreenSlides').mockImplementation(() => jest.fn()).mockReturnValue([{ content: 'bar' }])
    const slides = [{ content: 'foo' }, { content: 'bar' }]
    const numVisibleSlides = 2

    beforeEach(() => {
        prepFnSpy.mockClear()
        primaryFnSpy.mockClear()
        slideLeftSpy.mockClear()
        slideRightSpy.mockClear()
        cleanupSpy.mockClear()
        getOffscreenSlidesSpy.mockClear()
    })
    
    describe('given direction === 1', () => {
        
        beforeEach(() => {
            animationManager(slides, 1, numVisibleSlides, prepFnSpy, primaryFnSpy)
        })

        it('calls slideLeft with arg1 slides ', () => {
            expect(slideLeftSpy).toHaveBeenCalledWith(slides)
        })

        it('calls nextPosition with arg1 slides, arg2 direction', () => {
            expect(nextPositionSpy).toHaveBeenCalledWith(slides, 1)
        })

        it('calls getOffscreenSlides with arg1 slides, arg2 numVisibleSlides', () => {
            expect(getOffscreenSlidesSpy).toHaveBeenCalledWith(slides, numVisibleSlides)
        })

        it('calls primaryFn with arg1 slides', () => {
            expect(primaryFnSpy).toHaveBeenCalledWith(slides)
        })

        it('calls cleanup with arg1 slides', () => {
            expect(cleanupSpy).toHaveBeenCalledWith(slides)
        })
    })

    describe('given direction === -1', () => {
        
        beforeEach(() => {
            animationManager(slides, -1, numVisibleSlides, prepFnSpy, primaryFnSpy)
        })

        it('calls slideRight with arg1 slides', () => {
            expect(slideRightSpy).toHaveBeenCalledWith(slides)
        })
    })
    

})
