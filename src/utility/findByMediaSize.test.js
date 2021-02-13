import { findByMediaSize } from './findByMediaSize'
import * as fm from './findMediaMatch'
import * as so from './sortObjectsByProperty'

describe('findByMediaSize', () => {
    const findMediaMatchMock = jest.spyOn(fm, 'findMediaMatch').mockImplementation(() => jest.fn())
    const sortObjectsByPropertyMock = jest.spyOn(so, 'sortObjectsByProperty').mockImplementation(() => jest.fn())

    beforeEach(() => {
        findMediaMatchMock.mockClear()
        sortObjectsByPropertyMock.mockClear()
    })
    
    it('returns defaultValue if breakPointObjs is not an array', () => {
        expect(findByMediaSize({}, 'min-width', 10)).toBe(10)
    })

    it('returns defaultValue if queryString is invalid', () => {
        expect(findByMediaSize([{}], 'foo', 10)).toBe(10)
    })

    it('returns defaultValue if no match is found', () => {
        findMediaMatchMock.mockReturnValue(undefined)
        expect(findByMediaSize([{}], 'max-width', 10)).toBe(10)
    })

    it('returns breakPointObj.item if breakPointObj.breakPoint matches of query', () => {
        const arr = [
            {
                breakPoint: 100,
                item: 0
            },
            {
                breakPoint: 300,
                item: 1
            }
        ]
        sortObjectsByPropertyMock.mockImplementation(a => a)
        findMediaMatchMock.mockImplementation(a => a[1])
        expect(findByMediaSize(arr, 'max-width', 10)).toBe(1)
    })

    it('reverse sorts breakPointObjs copy if queryString === "min-width"', () => {
        const arr = [
            {
                breakPoint: 100,
                item: 0
            },
            {
                breakPoint: 300,
                item: 1
            }
        ]
        const reverseMock = jest.fn()
        sortObjectsByPropertyMock.mockImplementation(a => {
            return {
                reverse: reverseMock
            }
        })
        findByMediaSize(arr, 'min-width', 10)
        expect(reverseMock).toHaveBeenCalled()
    })
})