import Carousel from './Carousel'
import slideControl from './SlideControl'
import Slide from './Slide'
import * as animationManagerFn from '../animationManager'
import * as prepareAnimationModule from '../animations/prepareAnimation'
import * as executeAnimationModule from '../animations/executeAnimation'
import * as eh from '../utility/getTallestElementHeight'
import * as fm from '../utility/findByMediaSize'

const mockSlideElement = () => {
    const slideEl = document.createElement('div')
    slideEl.classList.add('Slide')
    return slideEl
}
const mockSlideUpdate = jest.fn()
jest.mock('./Slide', function () {
    return jest.fn().mockImplementation(function () {
        return {
            element: mockSlideElement(),
            update: mockSlideUpdate
        }
    })
})

const mockButton = () => document.createElement('button')
jest.mock('./SlideControl', () => {
    return jest.fn().mockImplementation(() => {
        return mockButton()
    })
})

describe('Carousel', () => {
    const fooProps = {
        element: document.createElement('div'),
        slides: [{ content: 'foo' }],
        direction: 1,
        duration: 1000,
        slideDelay: 3000,
        numVisibleSlides: 1,
        breakPoints: [700, 1500],
        breakPointNumVisibleSlides: [2, 3]
    }

    let findByMediaSizeMock = jest.spyOn(fm, 'findByMediaSize').mockImplementation(() => jest.fn()).mockReturnValue(1)

    beforeEach(() => {
        slideControl.mockClear()
        Slide.mockClear()
        mockSlideUpdate.mockClear()
        findByMediaSizeMock.mockClear()
    })

    describe('constructor', () => {

        test('throws if required props not provided', () => {
            expect(() => new Carousel()).toThrow()
        })

        test('returns instance of Carousel', () => {
            expect(new Carousel(fooProps) instanceof Carousel).toBe(true)
        })

        test('instance properties are assigned from props argument', () => {
            const carousel = new Carousel(fooProps)
            expect(carousel.element instanceof HTMLElement).toBe(true)
            expect(carousel.slides).toStrictEqual([{ content: 'foo' }])
            expect(carousel.direction).toBe(1)
            expect(carousel.duration).toBe(1000)
            expect(carousel.slideDelay).toBe(3000)
            expect(carousel.defaultNumVisibleSlides).toBe(1)
        })

        test('initialization properties are set', () => {
            const carousel = new Carousel(fooProps)
            expect(carousel.slideInterval).toBe(null)
            expect(carousel.state).toStrictEqual({})
            expect(carousel.resting).toBe(true)
        })
    })

    describe('setters and getters', () => {
        let carousel
        beforeEach(() => {
            carousel = new Carousel(fooProps)
        })

        describe('set element', () => {

            test('throws if argument is not HTMLElement', () => {
                expect(() => carousel.element = 'foo').toThrow()
            })

            test('sets element with valid argument', () => {
                const el = document.createElement('div')
                el.id = 'foo'
                carousel.element = el
                expect(carousel._element.id).toBe('foo')
            })

        })

        describe('get element', () => {

            test('returns _element', () => {
                const el = document.createElement('div')
                el.id = 'bar'
                carousel._element = el
                expect(carousel.element.id).toBe('bar')
            })
        })

        describe('set slides', () => {

            test('throws if argument is not an array', () => {
                expect(() => carousel.slides = {}).toThrow()
            })

            test('throws if arugment is empty array', () => {
                expect(() => carousel.slides = []).toThrow()
            })

            test('sets slides with valid argument', () => {
                carousel.slides = [{ content: 'baz' }]
                expect(carousel._slides).toStrictEqual([{ content: 'baz' }])
            })
        })

        describe('get slides', () => {

            test('returns _slides', () => {
                carousel._slides = [{ content: 'bar' }]
                expect(carousel.slides).toStrictEqual([{ content: 'bar' }])
            })
        })

        describe('set direction', () => {

            test('throws if argument is not 1 or -1', () => {
                expect(() => carousel.direction = 0).toThrow()
            })

            test('sets direction with valid argument', () => {
                carousel.direction = -1
                expect(carousel._direction).toBe(-1)
            })
        })

        describe('get direction', () => {

            test('returns _direction', () => {
                carousel._direction = -1
                expect(carousel.direction).toBe(-1)
            })
        })

        describe('set duration', () => {

            test('throws if argument is not a number', () => {
                expect(() => carousel.duration = 'foo').toThrow()
            })

            test('sets duration given valid argument', () => {
                carousel.duration = 1750
                expect(carousel._duration).toBe(1750)
            })
        })

        describe('get duration', () => {

            test('returns _duration', () => {
                carousel._duration = 1233
                expect(carousel.duration).toBe(1233)
            })
        })

        describe('set slideDelay', () => {

            test('throws if argument is not a number', () => {
                expect(() => carousel.slideDelay = 'foo').toThrow()
            })

            test('sets slideDelay given valid argument', () => {
                carousel.slideDelay = 4444
                expect(carousel._slideDelay).toBe(4444)
            })
        })

        describe('get slideDelay', () => {

            test('returns _slideDelay', () => {
                carousel._slideDelay = 5454
                expect(carousel.slideDelay).toBe(5454)
            })
        })

        describe('set defaultNumVisibleSlides', () => {

            test('throws if argument is not a number', () => {
                expect(() => carousel.defaultNumVisibleSlides = 'bar').toThrow()
            })

            test('sets defaultNumVisibleSlides given valid argument', () => {
                carousel.defaultNumVisibleSlides = 7
                expect(carousel._defaultNumVisibleSlides).toBe(7)
            })
        })

        describe('get defaultNumVisibleSlides', () => {

            it('returns _defaultNumVisibleSlides', () => {
                carousel._defaultNumVisibleSlides = 3
                expect(carousel.defaultNumVisibleSlides).toBe(3)
            })
        })

        describe('set numVisibleSlides', () => {
            
            it('throws (read-only)', () => {
                expect(() => carousel.numVisibleSlides = 3).toThrow()
            })
        })
        

        describe('get numVisibleSlides', () => {
            const localMock = jest.spyOn(fm, 'findByMediaSize').mockImplementation(() => jest.fn()).mockReturnValue(4)

            beforeEach(() => {
                localMock.mockClear()
            })

            test('returns result of findByMediaSize', () => {
                const tmp = [...carousel.slides]
                carousel.slides = [1, 2, 3, 4, 5, 6, 7]
                expect(carousel.numVisibleSlides).toBe(4)
                carousel.slides = tmp
            })

            test('calls findByMediaSize with correct arguments', () => {
                const _ = carousel.numVisibleSlides
                expect(localMock).toHaveBeenCalledWith(carousel.breakPointObjs, 'min-width', carousel.defaultNumVisibleSlides)
            })

            test('returns slides.length - 1 if breakPointNumSlides is higher than available slides', () => {
                const tmp = [...carousel.slides]
                carousel.slides = ['foo', 'bar']
                expect(carousel.numVisibleSlides).toBe(1)
                carousel.slides = tmp
            })
        })

        describe('set breakPointObjs', () => {

            it('throws if arg is not array', () => {
                expect(() => carousel.breakPointObjs = {}).toThrow()
            })

            it('throws if arg[0] is not array', () => {
                expect(() => carousel.breakPointObjs = [{}]).toThrow()
            })

            it('throws if arg[1] is not array', () => {
                expect(() => carousel.breakPointObjs = [[], {}]).toThrow()
            })

            it('throws if arg[0] and arg[1] have different lengths', () => {
                expect(() => carousel.breakPointObjs = [[5], [0, 1]]).toThrow()
            })

            it('sets _breakPointObjs to an array of objects with keys breakPoint and item', () => {
                const input = [
                    [700, 1400],
                    [0, 1]
                ]
                const expected = [
                    {
                        breakPoint: 700,
                        item: 0
                    },
                    {
                        breakPoint: 1400,
                        item: 1
                    }
                ]
                carousel.breakPointObjs = input
                expect(carousel._breakPointObjs).toStrictEqual(expected)
            })
        })

        describe('get BreakPointObjs', () => {

            it('returns _breakPointObjs', () => {
                const expected = [
                    {
                        breakPoint: 700,
                        item: 0
                    },
                    {
                        breakPoint: 1400,
                        item: 1
                    }
                ]
                carousel._breakPointObjs = expected
                expect(carousel.breakPointObjs).toStrictEqual(expected)
            })
        })
    })

    describe('render', () => {
        let carousel, elem, handleTransitionSpy

        beforeEach(() => {
            carousel = new Carousel(fooProps)
            handleTransitionSpy = jest.spyOn(carousel, 'handleTransition').mockImplementation(() => jest.fn())
            elem = carousel.render()
        })

        test('returns HTMLElement', () => {
            expect(elem instanceof HTMLElement).toBe(true)
        })

        test('returned element has class Carousel', () => {
            expect(elem.classList.contains('Carousel')).toBe(true)
        })

        test('returned element has child with class slide-container', () => {
            expect(elem.querySelector('.slide-container')).not.toBe(null)
        })

        test('returned element has two button children', () => {
            expect(elem.querySelectorAll('button').length).toBe(2)
        })

        test('slideControl is called twice', () => {
            expect(slideControl).toHaveBeenCalledTimes(2)
        })

        test('slideControl is called with correct arguments', () => {
            expect(slideControl).toHaveBeenNthCalledWith(1, expect.objectContaining({
                btnType: 'prev',
                onClick: handleTransitionSpy
            }))
            expect(slideControl).toHaveBeenNthCalledWith(2, expect.objectContaining({
                btnType: 'next',
                onClick: handleTransitionSpy
            }))
        })
    })

    describe('mount', () => {
        let carousel, el, componentDidMountSpy

        beforeEach(() => {
            carousel = new Carousel(fooProps)
            componentDidMountSpy = jest.spyOn(carousel, 'componentDidMount').mockImplementation(() => jest.fn())
            el = document.createElement('div')
        })

        describe('given invalid el', () => {

            test('throws error', () => {
                expect(() => carousel.mount(null)).toThrow()
            })
        })

        describe('given valid el', () => {

            test('sets element to el', () => {
                el.id = 'foo'
                carousel.mount(el)
                expect(carousel.element.id).toBe('foo')
            })

            describe('given carousel.element is instance of HTMLElement with parentNode', () => {
                let parent

                beforeEach(() => {
                    const elem = document.createElement('div')
                    parent = document.createElement('div')
                    parent.appendChild(elem)
                    carousel.element = elem
                    componentDidMountSpy.mockClear()
                })

                test('returns true', () => {
                    expect(carousel.mount(el)).toBe(true)
                })

                test('calls componentDidMount', () => {
                    carousel.mount(el)
                    expect(componentDidMountSpy).toHaveBeenCalled()
                })
            })


            describe('given carousel.element is not instance of HTMLElement', () => {

                test('returns false', () => {
                    expect(carousel.mount(el)).toBe(false)
                })
            })

            describe('given carousel.element is HTMLElement but has no parentNode', () => {

                test('returns false', () => {
                    carousel.element = document.createElement('div')
                    expect(carousel.mount(el)).toBe(false)
                })
            })
        })
    })

    describe('update', () => {

        test('calls mount with return value of render as argument', () => {
            const carousel = new Carousel(fooProps)
            const mountSpy = jest.spyOn(carousel, 'mount').mockImplementation(() => 'foo')
            const renderSpy = jest.spyOn(carousel, 'render').mockImplementation(() => 42)
            carousel.update()
            expect(renderSpy).toHaveBeenCalledTimes(1)
            expect(mountSpy).toHaveBeenCalledTimes(1)
            expect(mountSpy).toHaveBeenCalledWith(42)
        })
    })

    describe('componentDidMount', () => {
        let carousel, pauseSlidesSpy, startSlidesSpy, updateSpy
        const getTallestSpy = jest.spyOn(eh, 'getTallestElementHeight').mockImplementation(() => jest.fn()).mockReturnValue(300)

        beforeEach(() => {
            Element.prototype.getBoundingClientRect = jest.fn(() => {
                return {
                    width: 100
                }
            })

            const elem = document.createElement('div')
            const parent = document.createElement('div')

            elem.innerHTML = '<button><</button><div class="slide-container"></div><button>></button>'
            parent.appendChild(elem)
            window.document.body.appendChild(parent)

            const willMountProps = {
                ...fooProps,
                element: elem,
                slides: [
                    { content: '<h3>0</h3>' },
                    { content: '<h3>1</h3>' }
                ],
                numVisibleSlides: 1
            }

            carousel = new Carousel(willMountProps)
            pauseSlidesSpy = jest.spyOn(carousel, 'pauseSlides').mockImplementation(() => jest.fn())
            startSlidesSpy = jest.spyOn(carousel, 'startSlides').mockImplementation(() => jest.fn())
            updateSpy = jest.spyOn(carousel, 'update').mockImplementation(() => jest.fn())

            pauseSlidesSpy.mockClear()
            startSlidesSpy.mockClear()
            updateSpy.mockClear()
            getTallestSpy.mockClear()
        })

        it('calls slide constructor for each slide', () => {
            carousel.componentDidMount()
            expect(Slide).toHaveBeenCalledTimes(2)
        })

        it('calls slide constructor with correct argument', () => {
            const numSlidesMock = jest.spyOn(fm, 'findByMediaSize').mockImplementation(() => jest.fn()).mockReturnValue(1)
            carousel.componentDidMount()
            expect(Slide).toHaveBeenNthCalledWith(1, expect.objectContaining({
                content: '<h3>0</h3>',
                width: 100,
                indexDOM: 0,
                currentIndex: 0,
                currentPosition: 0,
                maxIndex: 1
            }))
            expect(Slide).toHaveBeenNthCalledWith(2, expect.objectContaining({
                content: '<h3>1</h3>',
                width: 100,
                indexDOM: 1,
                currentIndex: 1,
                currentPosition: -100,
                maxIndex: 1
            }))
        })

        it('calls slide update for each slide', () => {
            carousel.componentDidMount()
            expect(mockSlideUpdate).toHaveBeenCalledTimes(2)
        })

        it('appends slide elements to .slide-container element', () => {
            carousel.componentDidMount()
            const container = carousel.element.querySelector('.slide-container')
            expect(container.querySelectorAll('.Slide').length).toBe(2)
        })

        it('calls getTallestElementHeight', () => {
            carousel.componentDidMount()
            expect(getTallestSpy).toHaveBeenCalledTimes(1)
        })

        it('calls getTallestElementHeight with array and number', () => {
            carousel.componentDidMount()
            expect(getTallestSpy).toHaveBeenCalledWith(expect.any(Array), expect.any(Number))
        })

        it('sets container height', () => {
            carousel.componentDidMount()
            const container = carousel.element.querySelector('.slide-container')
            expect(container.style.height).toBe('300px')
        })

        it('adds event listeners to element', () => {
            expect(carousel.element.onmouseenter).toBe(null)
            expect(carousel.element.onmouseleave).toBe(null)
            carousel.componentDidMount()
            expect(carousel.element.onmouseenter).toBe(pauseSlidesSpy)
            expect(carousel.element.onmouseleave).toBe(startSlidesSpy)
        })

        it('adds window resize event listener', () => {
            const resizeHandlerSpy = jest.spyOn(carousel, 'resizeHandler').mockImplementation(() => jest.fn())
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
            window.onresize = null
            carousel.componentDidMount()
            expect(addEventListenerSpy).toHaveBeenCalledWith('resize', resizeHandlerSpy)
            expect(resizeHandlerSpy).not.toHaveBeenCalled()
        })

        it('calls startSlides', () => {
            carousel.componentDidMount()
            expect(startSlidesSpy).toHaveBeenCalledTimes(1)
        })

    })

    describe('resizeHandler', () => {

        it('sets shouldResize to true', () => {
            const carousel = new Carousel(fooProps)
            const timeoutSpy = jest.spyOn(window, 'setTimeout').mockImplementation(() => jest.fn())
            expect(carousel.shouldResize).toBe(false)
            carousel.resizeHandler()
            expect(carousel.shouldResize).toBe(true)
        })

        it('sets timeout to execute resize queue', () => {
            const carousel = new Carousel(fooProps)
            const resizeSpy = jest.spyOn(carousel, 'resize')
            const timeoutSpy = jest.spyOn(window, 'setTimeout').mockImplementation(() => jest.fn())
            carousel.resizeHandler()
            expect(timeoutSpy).toHaveBeenCalledWith(resizeSpy, 1000)
        })
    })

    describe('resize', () => {

        it('calls pauseSlides and update if shouldResize is true and sets shouldResize to false', () => {
            const carousel = new Carousel(fooProps)
            const pauseSlidesSpy = jest.spyOn(carousel, 'pauseSlides').mockImplementation(() => jest.fn())
            const updateSpy = jest.spyOn(carousel, 'update').mockImplementation(() => jest.fn())
            carousel.shouldResize = true
            carousel.resize()
            expect(pauseSlidesSpy).toHaveBeenCalledTimes(1)
            expect(updateSpy).toHaveBeenCalledTimes(1)
            expect(carousel.shouldResize).toBe(false)
        })

        it('does not call pauseSlides or update if shouldResize is false', () => {

            const carousel = new Carousel(fooProps)
            const pauseSlidesSpy = jest.spyOn(carousel, 'pauseSlides').mockImplementation(() => jest.fn())
            const updateSpy = jest.spyOn(carousel, 'update').mockImplementation(() => jest.fn())
            carousel.shouldResize = false
            carousel.resize()
            expect(pauseSlidesSpy).not.toHaveBeenCalled()
            expect(updateSpy).not.toHaveBeenCalled()
            expect(carousel.shouldResize).toBe(false)
        })
    })

    describe('pauseSlides', () => {
        let carousel

        beforeEach(() => {
            window.clearInterval = jest.fn()
            carousel = new Carousel(fooProps)
        })

        it('calls clearInterval', () => {
            carousel.pauseSlides()
            expect(window.clearInterval).toHaveBeenCalledTimes(1)
        })

        it('sets state.slideInterval to null', () => {
            carousel.state.slideInterval = 2
            carousel.pauseSlides()
            expect(carousel.state.slideInterval).toBe(null)
        })
    })

    describe('startSlides', () => {
        let carousel, handleTransitionSpy

        beforeEach(() => {
            window.setInterval = jest.fn((func, _) => {
                func()
                return 42
            })
            carousel = new Carousel(fooProps)
            handleTransitionSpy = jest.spyOn(carousel, 'handleTransition').mockImplementation(() => jest.fn())
            handleTransitionSpy.mockClear()
        })

        it('calls setInterval', () => {
            carousel.slideDelay = 1000
            carousel.duration = 500
            carousel.startSlides()
            expect(window.setInterval).toHaveBeenCalledWith(expect.any(Function), 1500)
        })

        it('sets state.slideInterval', () => {
            carousel.startSlides()
            expect(carousel.state.slideInterval).toBe(42)
        })

        describe('given document is hidden', () => {

            it('does not call handleTransitionSpy', () => {
                jest.spyOn(document, 'hidden', 'get').mockReturnValue(true)
                carousel.startSlides()
                expect(handleTransitionSpy).not.toHaveBeenCalled()
            })
        })

        describe('given document is not hidden', () => {

            it('calls handleTransitionSpy', () => {
                jest.spyOn(document, 'hidden', 'get').mockReturnValue(false)
                carousel.startSlides()
                expect(handleTransitionSpy).toHaveBeenCalledTimes(1)
            })
        })
    })

    describe('handleTransition', () => {
        let carousel, animationManagerSpy, prepFnSpy, primaryFnSpy

        beforeEach(() => {
            carousel = new Carousel(fooProps)
            animationManagerSpy = jest.spyOn(animationManagerFn, 'animationManager').mockImplementation(() => jest.fn())
            prepFnSpy = jest.spyOn(carousel, 'getPrepFn').mockImplementation(() => jest.fn()).mockReturnValue(42)
            primaryFnSpy = jest.spyOn(carousel, 'getPrimaryFn').mockImplementation(() => jest.fn()).mockReturnValue(13)
            animationManagerSpy.mockClear()
            prepFnSpy.mockClear()
            primaryFnSpy.mockClear()
            findByMediaSizeMock.mockClear()
        })

        describe('given carousel is not resting', () => {

            it('returns false', () => {
                carousel.resting = false
                expect(carousel.handleTransition(1)).toBe(false)
            })
        })

        it('sets resting to false', () => {
            window.setTimeout = jest.fn((func, delay) => jest.fn())
            expect(carousel.resting).toBe(true)
            carousel.handleTransition(1)
            expect(carousel.resting).toBe(false)
        })

        it('calls animationManager with correct arguments', () => {
            carousel.state.slides = [
                { content: 'foo' },
                { content: 'bar' }
            ]
            const tmp = [...carousel.slides]
            carousel.slides = [1, 2, 3]
            findByMediaSizeMock.mockReturnValue(2)
            carousel.handleTransition(1)
            expect(animationManagerSpy).toHaveBeenCalledTimes(1)
            expect(animationManagerSpy).toHaveBeenCalledWith(
                expect.objectContaining([
                    { content: 'foo' },
                    { content: 'bar' }
                ]),
                1,
                2,
                prepFnSpy(),
                primaryFnSpy()
            )
            carousel.slides = tmp
        })

        it('sets resting to true', () => {
            window.setTimeout = jest.fn((func, delay) => func())
            carousel.handleTransition(1)
            expect(window.setTimeout).toHaveBeenCalled()
            expect(carousel.resting).toBe(true)
        })

    })

    describe('getPrepFn', () => {

        it('returns function with bound arguments', () => {
            const prepareAnimationSpy = jest.spyOn(prepareAnimationModule, 'prepareAnimation').mockImplementation(() => jest.fn())
            const carousel = new Carousel(fooProps)
            carousel.state.slides = [
                { content: 'foo' },
                { content: 'bar' }
            ]
            const prepFn = carousel.getPrepFn(1)
            prepFn([{ content: 'bar' }])
            const container = carousel.element.querySelector('.slide-container')
            expect(prepareAnimationSpy).toHaveBeenCalledWith(
                container,
                [{ content: 'bar' }],
                1
            )
        })
    })

    describe('getPrimaryFn', () => {

        it('returns function with bound arguments', () => {
            const executeAnimationSpy = jest.spyOn(executeAnimationModule, 'executeAnimation').mockImplementation(() => jest.fn())
            const carousel = new Carousel(fooProps)
            carousel.duration = 3000
            const primaryFn = carousel.getPrimaryFn()
            primaryFn([{ content: 'bar' }])
            expect(executeAnimationSpy).toHaveBeenCalledWith(
                [{ content: 'bar' }],
                3000
            )
        })
    })
})