import { replaceChildElement } from './replaceChildElement'

describe('replaceChildElement', () => {

    describe('given valid arguments', () => {
        let newElement, existingElement, parentNode
        beforeEach(() => {
            newElement = document.createElement('div')
            existingElement = document.createElement('div')
            parentNode = document.createElement('div')
            newElement.id = 'new'
            existingElement.id = 'old'
            parentNode.appendChild(existingElement)
        })

        test('replaces existing element and returns true', () => {
            expect(parentNode.firstChild.id).toBe('old')
            expect(replaceChildElement(newElement, existingElement)).toBe(true)
            expect(parentNode.firstChild.id).toBe('new')

        })
    })

    describe('given invalid newElement', () => {
        let newElement, existingElement, parentNode
        beforeEach(() => {
            newElement = null
            existingElement = document.createElement('div')
            parentNode = document.createElement('div')
            existingElement.id = 'old'
            parentNode.appendChild(existingElement)
        })

        test('throws error', () => {
            expect(() => replaceChildElement(newElement, existingElement)).toThrow()
        })
    })

    describe('given existingElement is not instance of HTMLElement', () => {
        let newElement, existingElement
        beforeEach(() => {
            newElement = document.createElement('div')
            existingElement = null
        })

        test('returns false', () => {
            expect(replaceChildElement(newElement, existingElement)).toBe(false)
        })
    })

    describe('given existingElement has no parentNode', () => {
        let newElement, existingElement
        beforeEach(() => {
            newElement = document.createElement('div')
            existingElement = document.createElement('div')
        })

        test('returns false', () => {
            expect(replaceChildElement(newElement, existingElement)).toBe(false)
        })
    })
})