import { executeAnimation } from './executeAnimation'
import * as recur from '../utility/recurTilTrue'

describe('executeAnimation', () => {
    const duration = 1
    const recurTilTrue = jest.fn()
    let slides
    beforeEach(() => {
        slides = [
            {
                currentPosition: 0,
                nextPosition: 100,
                width: 100
            },
            {
                currentPosition: 100,
                nextPosition: 200,
                width: 100
            },
            {
                currentPosition: 200,
                nextPosition: 0,
                width: 100
            }
        ]
        recurTilTrue.mockClear()
        jest.spyOn(recur, 'recurTilTrue').mockImplementation(() => recurTilTrue())
    })

    test('returns array of promises', () => {
        recurTilTrue.mockReturnValue(new Promise(resolve => {resolve()}))
        const promises = executeAnimation(slides, duration)
        expect(Array.isArray(promises)).toBe(true)
        expect(promises[0] instanceof Promise)
        expect(promises[1] instanceof Promise)
        expect(promises[2] instanceof Promise)
    })

    test('calls recurTilTrue for each slide', () => {
        recurTilTrue.mockReturnValue(new Promise(resolve => {resolve()}))
        const _ = executeAnimation(slides, duration)
        expect(recurTilTrue).toHaveBeenCalledTimes(3)
    })
})