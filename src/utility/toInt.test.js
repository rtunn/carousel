import { toInt } from './toInt'

describe('toInt', () => {
    describe('given valid numeric string', () => {
        test('converts integer-like string to integer', () => {
            expect(
                toInt("3")
            )
                .toBe(3)
        })

        test('converts scientific notation to integer', () => {
            expect(toInt('3e+3')).toBe(3000)
        })

        test('truncates floating point numbers', () => {
            expect(toInt('7.8')).toBe(7)
        })
    })

    describe('given valid number', () => {
        test('returns integer for integer argument', () => {
            expect(toInt(3)).toBe(3)
        })

        test('returns integer for float argument', () => {
            expect(toInt(7.8)).toBe(7)
        })

        test('returns integer for scientific notation', () => {
            expect(toInt(3e+3)).toBe(3000)
        })
    })

    describe('given invalid argument', () => {
        test('throws error for NaN', () => {
            const toIntNan = () => toInt(NaN)
            expect(toIntNan).toThrow()
        })

        test('throws error for non-numeric string', () => {
            const toIntUnparsable = () => toInt('foo')
            expect(toIntUnparsable).toThrow()
        })
    })
})

