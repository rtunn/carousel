import { loadLazyImages } from './loadLazyImages'


describe('loadLazyImages', () => {
    let element

    beforeEach(() => {
        element = document.createElement('div')
    })

    it('resolves if no images in element', () => {
        expect(() => loadLazyImages(element)).not.toThrow()
    })
})