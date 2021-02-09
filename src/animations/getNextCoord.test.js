import {getNextCoord} from './getNextCoord'

describe('getNextCoord', () => {
    let currentPosition, nextPosition, limit
    beforeEach(() => {
        currentPosition = 20
        nextPosition = 100
        limit = 10
    })

    test('returns sum of current position and limit if difference between current and next position is greater than limit', () => {
        expect(getNextCoord(currentPosition, nextPosition, limit)).toBe(30)
    })

    test('returns nextPosition if difference between current and next position is less than limit', () => {
        nextPosition = 25
        expect(getNextCoord(currentPosition, nextPosition, limit)).toBe(25)
    })
})