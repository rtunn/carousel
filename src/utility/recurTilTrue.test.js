import { recurTilTrue } from './recurTilTrue'

describe('recurTilTrue', () => {
    let x = 0
    const mockBooleanFn = jest.fn(() => {
        if (x !== 1) {
            x++
            return false
        }
        return true
    })

    test('calls callback until returns true', () => {
        jest.spyOn(window, 'setInterval')
        jest.spyOn(window, 'clearInterval')
        return recurTilTrue(mockBooleanFn, 10).then(_ => {
            expect(mockBooleanFn).toHaveBeenCalledTimes(2)
            expect(window.setInterval).toHaveBeenCalledTimes(1)
            expect(window.clearInterval).toHaveBeenCalledTimes(1)
        })
    })

    test('promise is rejected if booleanFn throws error', () => {
        const failedMock = jest.fn(() => {throw 'failed'})
        return recurTilTrue(failedMock, 1).catch(err => {
            expect(err).toBe('failed')
        })
    })
})