import { getTallestElementHeight } from './getTallestElementHeight'
import * as eh from './getElementHeight'

describe('getTallestElementHeight', () => {
    let elementHeightSpy
    const elements = [
        {height: 0},
        {height: 100},
        {height: 200},
        {height: 300}
    ]


    beforeEach(() => {
        elementHeightSpy = jest.spyOn(eh, 'getElementHeight').mockImplementation((element) => {
            return element.height
        })
        elementHeightSpy.mockClear()
    })
    
    it('returns the height of the tallest element', () => {
        expect(getTallestElementHeight(elements, 200)).toBe(300)
    })

    it('returns minHeight, given all elements are shorter than minHeight', () => {
        const minHeight = 500
        expect(getTallestElementHeight(elements, minHeight)).toBe(500)
    })

    it('throws if minHeight not given', () => {
        const noMinHeight = () => getTallestElementHeight(elements)
        expect(noMinHeight).toThrow()
    })
})
