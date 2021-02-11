import { animateFrame } from './animateFrame'
import * as nextCoord from './getNextCoord'

describe('animateFrame', () => {
    const maxIncrement = 10
    const msFps = 16.67
    const getNextCoord = jest.fn()
    let slide

    beforeEach(() => {
        slide = {
            currentPosition: 100,
            nextPosition: 0,
            element: document.createElement('div')
        }
        getNextCoord.mockClear()
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => callback())
        jest.spyOn(nextCoord, 'getNextCoord').mockImplementation((...args) => getNextCoord(...args))
    })

    it('returns false when currentPosition !== nextPosition', () => {
        getNextCoord.mockReturnValue(90)

        expect(animateFrame(slide, maxIncrement)).toBe(false)
    })

    it('returns true when currentPosition === nextPosition', () => {
        slide.currentPosition = slide.nextPosition
        expect(animateFrame(slide, maxIncrement)).toBe(true)
    })

    it('sets currentPosition to coordFn return value', () => {
        getNextCoord.mockReturnValue(90)

        animateFrame(slide, maxIncrement)
        expect(slide.currentPosition).toBe(90)
    })

    it('sets element.style.transform to translate currentPosition', () => {
        getNextCoord.mockReturnValue(90)

        animateFrame(slide, maxIncrement)
        expect(slide.element.style.transform).toBe("translateX(90px)")
    })

    it('calls getNextCoord with limit === maxIncrement when nextPosition > currentPosition', () => {
        getNextCoord.mockReturnValue(90)

        slide = {
            currentPosition: 100,
            nextPosition: 200,
            element: document.createElement('div')
        }
        animateFrame(slide, maxIncrement)
        expect(getNextCoord).toHaveBeenCalledWith(100, 200, maxIncrement)
    })
})