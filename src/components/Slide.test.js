import Slide from './Slide'

describe('Slide', () => {

    describe('constructor', () => {

        test('returns Slide instance', () => {
            const slide = new Slide()
            expect(slide instanceof Slide).toBe(true)
            expect(typeof slide).toBe('object')
        })
    
        test('sets default properties if props omitted', () => {
            const slide = new Slide()
            expect(slide.element).toBe(null)
            expect(slide.currentIndex).toBe(0)
            expect(slide.currentPosition).toBe(0)
            expect(slide.nextIndex).toBe(null)
            expect(slide.nextPosition).toBe(null)
            expect(slide.width).toBe(100)
            expect(slide.content).toBe('')
        })

        test('sets properties from props argument', () => {
            const props = {
                element: document.createElement('div'),
                currentIndex: 1,
                currentPosition: 200,
                nextIndex: 2,
                nextPosition: 400,
                width: 200,
                content: '<h1>Foo</h1>'
            }
            const slide = new Slide(props)
            expect(slide.element instanceof HTMLElement).toBe(true)
            expect(slide.currentIndex).toBe(1)
            expect(slide.currentPosition).toBe(200)
            expect(slide.nextIndex).toBe(2)
            expect(slide.nextPosition).toBe(400)
            expect(slide.width).toBe(200)
            expect(slide.content).toBe('<h1>Foo</h1>')
        })
    })

    describe('render', () => {
        let slide
        beforeEach(() => {
            slide = new Slide()
        })

        test('returns instance of HTMLElement', () => {
            expect(slide.render() instanceof HTMLElement).toBe(true)
        })

        test('returned element has correct attributes', () => {
            const el = slide.render()
            expect(el.classList.contains('slide')).toBe(true)
            expect(el.style.width).toBe('100px')
            expect(el.style.transform).toBe('translateX(0px)')
            expect(el.innerHTML instanceof Text)
        })
    })

    describe('mount', () => {
        let slide, el
        beforeEach(() => {
            slide = new Slide()
            el = slide.render()
        })

        describe('given invalid el', () => {
            
            test('throws error', () => {
                expect(() => slide.mount(null)).toThrow()
            })
        })
        

        describe('given valid el', () => {
            
            test('sets element to el', () => {
                expect(slide.element).toBe(null)
                slide.mount(el)
                expect(slide.element instanceof HTMLElement).toBe(true)
            })

            describe('given slide.element is instance of HTMLElement with parentNode', () => {

                test('returns true', () => {
                    slide.element = document.createElement('div')
                    const parent = document.createElement('div')
                    parent.appendChild(slide.element)
                    expect(slide.mount(el)).toBe(true)
                })
            })


            describe('given slide.element is not instance of HTMLElement', () => {

                test('returns false', () => {
                    expect(slide.mount(el)).toBe(false)
                })
            })

            describe('given slide.element is HTMLElement but has no parentNode', () => {

                test('returns false', () => {
                    slide.element = document.createElement('div')
                    expect(slide.mount(el)).toBe(false)
                })
            })
        })
    })

    describe('update', () => {

        test('calls mount with return value of render as argument', () => {
            const slide = new Slide()
            jest.spyOn(slide, 'mount').mockImplementation(() => 'foo')
            jest.spyOn(slide, 'render').mockImplementation(() => 42)
            slide.update()
            expect(slide.render).toHaveBeenCalledTimes(1)
            expect(slide.mount).toHaveBeenCalledTimes(1)
            expect(slide.mount).toHaveBeenCalledWith(42)
        })
    })
})