import {getElementHeight} from './getElementHeight'

describe('getElementHeight', () => {

    it('returns the elements height', () => {
        const el = document.createElement('div')
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                height: 200
            }
        })
        expect(getElementHeight(el)).toBe(200)
    })
})