import { findMediaMatch } from './findMediaMatch'
import * as cm from './constructMediaQuery'

describe('findMediaMatch', () => {
    const mediaObjs = [
        {
            breakPoint: 100,
            item: 0
        },
        {
            breakPoint: 500,
            item: 1
        },
        {
            breakPoint: 900,
            item: 2
        },
    ]
    let constructMediaQueryMock = jest.spyOn(cm, 'constructMediaQuery').mockImplementation(({query, comparisonValue, unit}) => comparisonValue)
    const mediaQuery = {
        property: 'breakPoint',
        unit: 'px'
    }

    describe('given query is "min-width"', () => {

        beforeEach(() => {
            mediaQuery.query = 'min-width'
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(query => ({
                    matches: query > 700
                })),
            })
            constructMediaQueryMock.mockClear()
        })

        it('returns the first matching mediaObj', () => {
            const expected = {
                breakPoint: 900,
                item: 2
            }
            const received = findMediaMatch(mediaObjs, mediaQuery)
            expect(received.breakPoint).toBe(expected.breakPoint)
            expect(received.item).toBe(expected.item)
        })

        it('calls constructMediaQuery with the correct args', () => {
            const expected = {
                query: 'min-width',
                comparisonValue: 500,
                unit: 'px'
            }
            findMediaMatch(mediaObjs, mediaQuery)
            expect(constructMediaQueryMock).toHaveBeenNthCalledWith(2, expected)
        })
    })

    describe('given query is "max-width"', () => {

        beforeEach(() => {
            mediaQuery.query = 'max-width'
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(query => ({
                    matches: query < 700
                })),
            })
            constructMediaQueryMock.mockClear()
        })

        it('returns the first matching mediaObj', () => {
            const expected = {
                breakPoint: 100,
                item: 0
            }
            const received = findMediaMatch(mediaObjs, mediaQuery)
            expect(received.breakPoint).toBe(expected.breakPoint)
            expect(received.item).toBe(expected.item)
        })
    })
})
