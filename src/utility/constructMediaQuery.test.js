import { constructMediaQuery } from './constructMediaQuery'

describe('constructMediaQuery', () => {
    
    it('returns expected string given unit', () => {
        const expected = '(min-width: 1000px)'
        const query = 'min-width'
        const comparisonValue = 1000
        const unit = 'px'
        const result = constructMediaQuery({query, comparisonValue, unit})
        expect(result).toBe(expected)
    })

    it('returns expected string without passing unit arg', () => {
        const expected = '(foo: 1000)'
        const query = 'foo'
        const comparisonValue = 1000
        const result = constructMediaQuery({query, comparisonValue})
        expect(result).toBe(expected)
    })
})
