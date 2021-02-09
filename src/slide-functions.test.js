import { slideLeft, slideRight, nextPosition, cleanup } from './slide-functions'

describe('slideLeft', () => {
    let slides
    beforeEach(() => {
        slides = [
            { currentIndex: 0 },
            { currentIndex: 1 },
            { currentIndex: 2 },
        ]
    })

    test('slide props nextIndex is decremented by one if currentIndex is greater than 0', () => {
        slideLeft(slides)
        expect(slides[1].nextIndex).toBe(0)
        expect(slides[2].nextIndex).toBe(1)
    })

    test('slide props nextIndex is set to the max index if currentIndex is 0', () => {
        slideLeft(slides)
        expect(slides[0].nextIndex).toBe(slides.length - 1)
    })
})

describe('slideRight', () => {

    let slides
    beforeEach(() => {
        slides = [
            { currentIndex: 0 },
            { currentIndex: 1 },
            { currentIndex: 2 },
        ]
    })

    test('slide props nextIndex is incremented by one if currentIndex is less than max index', () => {
        slideRight(slides)
        expect(slides[0].nextIndex).toBe(1)
        expect(slides[1].nextIndex).toBe(2)
    })

    test('slide props nextIndex is set to 0 if currentIndex is max index', () => {
        slideRight(slides)
        expect(slides[2].nextIndex).toBe(0)
    })
})

describe('nextPosition', () => {
    describe('given direction === 1', () => {
        let slides
        beforeEach(() => {
            slides = [
                {
                    currentIndex: 0,
                    nextIndex: 2,
                    width: 100
                },
                {
                    currentIndex: 1,
                    nextIndex: 0,
                    width: 100
                },
                {
                    currentIndex: 2,
                    nextIndex: 1,
                    width: 100
                },
            ]
        })

        test('nextPosition is set to -1 * width for slide with currentIndex === 0 ', () => {
            nextPosition(slides, 1)
            expect(slides[0].nextPosition).toBe(-100)
        })

        test('nextPosition is set to width * nextIndex for slide with currentIndex > 0 ', () => {
            nextPosition(slides, 1)
            expect(slides[1].nextPosition).toBe(0)
            expect(slides[2].nextPosition).toBe(100)
        })
    })

    describe('given direction === -1', () => {
        let slides
        beforeEach(() => {
            slides = [
                {
                    currentIndex: 0,
                    nextIndex: 1,
                    width: 100
                },
                {
                    currentIndex: 1,
                    nextIndex: 2,
                    width: 100
                },
                {
                    currentIndex: 2,
                    nextIndex: 0,
                    width: 100
                },
            ]
        })

        test('nextPosition is set to 0 for slide with currentIndex === maxIndex ', () => {
            nextPosition(slides, -1)
            expect(slides[2].nextPosition).toBe(0)
        })

        test('nextPosition is set to width * nextIndex for slide with currentIndex < maxIndex ', () => {
            nextPosition(slides, -1)
            expect(slides[0].nextPosition).toBe(100)
            expect(slides[1].nextPosition).toBe(200)
        })
    })
})

describe('cleanup', () => {
    const slides = [
        {
            currentIndex: 0,
            currentPosition: 0,
            nextIndex: 1,
            nextPosition: -100
        },
        {
            currentIndex: 1,
            currentPosition: 100,
            nextIndex: 2,
            nextPosition: 0
        },
        {
            currentIndex: 2,
            currentPosition: 200,
            nextIndex: 0,
            nextPosition: 100
        }
    ]

    test('resets slide props', () => {
        cleanup(slides)
        expect(slides[0].currentIndex).toBe(1)
        expect(slides[1].currentIndex).toBe(2)
        expect(slides[2].currentIndex).toBe(0)

        expect(slides[0].nextIndex).toBe(null)
        expect(slides[1].nextIndex).toBe(null)
        expect(slides[2].nextIndex).toBe(null)

        expect(slides[0].currentPosition).toBe(-100)
        expect(slides[1].currentPosition).toBe(0)
        expect(slides[2].currentPosition).toBe(100)

        expect(slides[0].nextPosition).toBe(null)
        expect(slides[1].nextPosition).toBe(null)
        expect(slides[2].nextPosition).toBe(null)
    })
})