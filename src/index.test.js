import { main } from './index'
import * as init from './utility/initCarousels'

describe('main', () => {
    const initCarouselSpy = jest.spyOn(init, 'initCarousels').mockImplementation(() => jest.fn())
    window.carouselDefaultProps = 'foo'

    it('calls document.addEventListener with correct arguments', () => {
        document.addEventListener = jest.fn().mockImplementationOnce((event, callback) => callback())
        main()
        expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function))
        expect(initCarouselSpy).toHaveBeenCalledWith('foo')
    })
})