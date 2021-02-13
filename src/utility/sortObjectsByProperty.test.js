import { sortObjectsByProperty } from './sortObjectsByProperty'

describe('sortObjectsByProperty', () => {
    
    it('returns sorted array', () => {
        const arr = [
            {
                foo: 9,
                bar: 0
            },
            {
                foo: 1,
                bar: 3
            },
            {
                foo: 12,
                bar: 2
            },
        ]

        // const expected = [arr[1], arr[0], arr[2]]
        const result = sortObjectsByProperty(arr, 'foo')
        expect(result[0]).toBe(arr[1])
        expect(result[1]).toBe(arr[0])
        expect(result[2]).toBe(arr[2])
    })

    it('does not throw for duplicates if allowDuplicates is true', () => {
        const arr = [
            {
                foo: 9,
                bar: 0
            },
            {
                foo: 9,
                bar: 0
            },
        ]


        const result = sortObjectsByProperty(arr, 'foo', true)
        expect(result[0]).toBe(arr[0])
        expect(result[1]).toBe(arr[1])
    })

    it('throws for duplicates if allowDuplicates is false', () => {
        const arr = [
            {
                foo: 9,
                bar: 0
            },
            {
                foo: 9,
                bar: 0
            },
        ]


        expect(() => sortObjectsByProperty(arr, 'foo', false)).toThrow()
    })
})
