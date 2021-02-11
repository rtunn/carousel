import slideControl from './SlideControl'

describe('slideControl', () => {
    const onclickMock = jest.fn()

    beforeEach(() => {
        onclickMock.mockClear()
    })

    it('throws if props.btnType is undefined', () => {
        expect(() => slideControl({onClick: onclickMock})).toThrowError(new Error('btnType is a required prop'))
    })

    it('throws if props.btnType is not "prev" or "next"', () => {
        expect(() => slideControl({
            onClick: onclickMock,
            btnType: 'foo'
        })).toThrowError(new Error('btnType must be "prev" or "next"'))
    })

    it('throws if props.onClick is undefined', () => {
        expect(() => slideControl({btnType: 'prev'})).toThrowError(new Error('onClick is a required prop'))
    })

    it('throws if props.onClick is not a function', () => {
        expect(() => slideControl({
            btnType: 'prev',
            onClick: 42
        })).toThrowError(new Error('onClick must be a function'))
    })

    it('returns a button, given valid arguments', () => {
        const el = slideControl({
            btnType: 'prev',
            onClick: onclickMock
        })
        expect(el instanceof HTMLElement).toBe(true)
        expect(el.tagName === "BUTTON").toBe(true)
    })

    describe('given props.btnType === prev', () => {
        const props = {
            btnType: 'prev',
            onClick: onclickMock
        }

        it('returns element with innerHTML === "&lt;"', () => {
            const el = slideControl(props)
            expect(el.innerHTML).toBe("&lt;")
        })

        it('sets onclick listener with correct arguments', () => {
            const el = slideControl(props)
            el.click()
            expect(onclickMock).toHaveBeenCalledWith(-1)
        })

        it('sets correct classList', () => {
            const el = slideControl(props)
            expect(el.classList.contains('SlideControl')).toBe(true)
            expect(el.classList.contains('prev')).toBe(true)
        })
    })

    describe('given props.btnType === "next"', () => {
        const props = {
            btnType: 'next',
            onClick: onclickMock
        }

        it('returns element with innerHTML === "&gt;"', () => {
            const el = slideControl(props)
            expect(el.innerHTML).toBe("&gt;")
        })

        it('sets onclick listener with correct arguments', () => {
            const el = slideControl(props)
            el.click()
            expect(onclickMock).toHaveBeenCalledWith(1)
        })

        it('sets correct classList', () => {
            const el = slideControl(props)
            expect(el.classList.contains('SlideControl')).toBe(true)
            expect(el.classList.contains('next')).toBe(true)
        })
    })
})