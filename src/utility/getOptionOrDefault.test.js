import { getOptionOrDefault } from './getOptionOrDefault'

describe('getOptionOrDefault', () => {
    const dataset = {
        val: "13"
    }
    const fallback = {
        val: "5"
    }

    describe('given dataset and fallback arguments are omitted', () => {
        test('throws invalid name error', () => {
            const propertyRequest = {
                name: 'foo',
                convertFn: (val) => val
            }
            const omitted = () => getOptionOrDefault(propertyRequest)
            expect(omitted).toThrowError(new Error('[getOptionOrDefault] invalid name: foo'))
        })
    })

    describe('given property name that exists in dataset', () => {
        describe('given valid dataset value', () => {
            test('returns converted property from dataset', () => {
                const converter = jest.fn((value) => value)
                const propertyRequest = {
                    name: 'val',
                    convertFn: converter
                }
                const received = getOptionOrDefault(propertyRequest, dataset, fallback)
                expect(received).toBe("13")
                expect(converter).toHaveBeenCalled()
            })
        })

        describe('given invalid dataset value', () => {
            describe('given valid fallback value', () => {
                test('returns converted property from fallback if conversion of dataset value fails', () => {
                    let x = 0
                    const converter = jest.fn((value) => {
                        if (x === 0) {
                            x++
                            throw 'foo'
                        } else {
                            return value
                        }
                    })
                    const propertyRequest = {
                        name: 'val',
                        convertFn: converter
                    }
                    const received = getOptionOrDefault(propertyRequest, dataset, fallback)
                    expect(received).toBe("5")
                    expect(converter).toHaveBeenCalledTimes(2)
                })
            })

            describe('given invalid fallback value', () => {
                test('throws if fallback value cannot be converted', () => {
                    const converter = jest.fn((value) => {
                        throw 'foo'
                    })
                    const propertyRequest = {
                        name: 'val',
                        convertFn: converter
                    }
                    const failedConversion = () => getOptionOrDefault(propertyRequest, dataset, fallback)
                    expect(failedConversion).toThrowError(new Error('[getOptionOrDefault] property cannot be converted'))
                    expect(converter).toHaveBeenCalledTimes(2)
                })
            })
        })
    })

    describe('given property name that does not exist in dataset', () => {
        describe('given property name that does exist in fallback', () => {
            test('returns converted property from fallback', () => {
                let x = 0
                const converter = jest.fn((value) => {
                    if (x === 0) {
                        x++
                        throw 'foo'
                    } else {
                        return value
                    }
                })
                const propertyRequest = {
                    name: 'val',
                    convertFn: converter
                }
                const received = getOptionOrDefault(propertyRequest, dataset, fallback)
                expect(received).toBe("5")
                expect(converter).toHaveBeenCalledTimes(2)
            })
        })

        describe('given property name that does not exist in fallback', () => {
            test('throws invalid name error', () => {
                const propertyRequest = {
                    name: 'foo',
                    convertFn: (val) => val
                }
                const invalidName = () => getOptionOrDefault(propertyRequest, dataset, fallback)
                expect(invalidName).toThrowError(new Error('[getOptionOrDefault] invalid name: foo'))
            })
        })
    })
})