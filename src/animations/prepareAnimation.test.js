import { prepareAnimation } from './prepareAnimation'

describe('prepareAnimation', () => {
    let slides
    const container = document.createElement('div')
    jest.spyOn(container, 'getBoundingClientRect').mockImplementation(() => {
        return { width: 100 }
    })

    const mockSetTimeout = jest.spyOn(window, 'setTimeout')

    beforeEach(() => {
        slides = [
            {
                currentPosition: 0,
                nextPosition: -100,
                width: 100,
                element: document.createElement('div')
            },
            {
                currentPosition: 100,
                nextPosition: 0,
                width: 100,
                element: document.createElement('div')
            }
        ]

        mockSetTimeout.mockRestore()
    })

    test('returns array of promises', () => {
        const promises = prepareAnimation(container, slides, 1)
        expect(Array.isArray(promises)).toBe(true)
        expect(promises[0] instanceof Promise).toBe(true)
        expect(promises[1] instanceof Promise).toBe(true)
    })

    test('opacity is initially set to 0 for each slide', () => {
        // set long delay on timeout to check slide opacity before timeout resets it
        mockSetTimeout.mockImplementation((resolve) => jest.fn(() => {
            resolve()
        }))

        const _ = prepareAnimation(container, slides, 1)
        expect(slides[0].element.style.opacity).toBe("0")
        expect(slides[1].element.style.opacity).toBe("0")
    })
    
    test('setTimeout is called for each slide to reset opacity', () => {
        jest.spyOn(window, 'setTimeout')

        const _ = prepareAnimation(container, slides, 1)
        expect(window.setTimeout).toHaveBeenCalledTimes(2)
    })

    test('all slides have opacity === "1" once promises are resolved', () => {
        const promises = prepareAnimation(container, slides, 1)
        return Promise.all(promises).then(_ => {
            expect(slides[0].element.style.opacity).toBe("1")
            expect(slides[1].element.style.opacity).toBe("1")
        })
    })

    test('slide transform is set to nextPosition', () => {
        const _ = prepareAnimation(container, slides, 1)
        expect(slides[0].element.style.transform).toBe(`translateX(${slides[0].currentPosition}px)`)
        expect(slides[1].element.style.transform).toBe(`translateX(${slides[1].currentPosition}px)`)
    })

    describe('given direction === 1', () => {
        const direction = 1

        beforeEach(() => {
            slides = [
                {
                    currentPosition: 0,
                    nextPosition: -100,
                    width: 100,
                    element: document.createElement('div')
                },
                {
                    currentPosition: 100,
                    nextPosition: 0,
                    width: 100,
                    element: document.createElement('div')
                },
                {
                    currentPosition: 200,
                    nextPosition: 90,
                    width: 100,
                    element: document.createElement('div')
                },
                {
                    currentPosition: 300,
                    nextPosition: 200,
                    width: 100,
                    element: document.createElement('div')
                },
            ]
        })

        test('slide.currentPosition is set to slide.nextPosition, if slide.nextPosition < 0', () => {
            const _ = prepareAnimation(container, slides, direction)
            expect(slides[0].currentPosition).toBe(-100)
        })

        test('slide.currentPosition is set to slide.nextPosition, if slide.nextPosition > container width', () => {
            const _ = prepareAnimation(container, slides, direction)
            expect(slides[3].currentPosition).toBe(200)
        })

        test('slide.currentPosition is set to container width, if slide.nextPosition is between 0 and container width', () => {
            const _ = prepareAnimation(container, slides, direction)
            expect(slides[2].currentPosition).toBe(100)
        })
    })

    describe('given direction === -1', () => {
        const direction = -1
        slides = [
            {
                currentPosition: 300,
                nextPosition: 0,
                width: 100
            }
        ]
        test('slide.currentPosition is set to slide.width * -1, if slide.nextPosition is between 0 and conatiner width', () => {
            const _ = prepareAnimation(container, slides, direction)
            expect(slides[0].currentPosition).toBe(-100)
        })
    })
})