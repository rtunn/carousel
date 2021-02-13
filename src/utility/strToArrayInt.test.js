import { strToArrayInt } from './strToArrayInt'
import * as ti from './toInt'

describe('strToArrayInt', () => {
    const testString = "12, 300, 88"

    it('throws if element cannot be parsed as integer', () => {
        const toIntMock = jest.spyOn(ti, 'toInt').mockImplementation(() => {throw 'foo'})
        expect(() => strToArrayInt(testString)).toThrow()
    })

    it('returns an array of integers in same order as string', () => {
        const toIntMock = jest.spyOn(ti, 'toInt').mockImplementation(jest.fn((val) => parseInt(val, 10)))
        const expected = [12, 300, 88]
        const result = strToArrayInt(testString)
        expect(result).toStrictEqual(expected)
    })

    it('returns correct array given non-default separator', () => {
        const toIntMock = jest.spyOn(ti, 'toInt').mockImplementation(jest.fn((val) => parseInt(val, 10)))
        const expected = [12, 300, 88]
        const result = strToArrayInt("12|300|88", "|")
        expect(result).toStrictEqual(expected)
    })
})
