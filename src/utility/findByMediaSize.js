import { sortObjectsByProperty } from './sortObjectsByProperty'
import { findMediaMatch } from './findMediaMatch'

/**
 * findByMediaSize
 * @param {Array.<Object>} breakPointObjs
 * @param {Object} breakPointObj 
 * @param {Number} breakPoint breakPointObj.breakPoint - integer or integer-like string denoting number of pixels for query 
 * @param {Number} item breakPointObj.item - the item that should be returned if the query matches the breakpoint
 * @param {string} queryString valid mediaQueryString - i.e. "min-width" or "max-width"
 * @param {*} defaultValue value to return if no breakPoints match query
 */
export const findByMediaSize = (breakPointObjs, queryString, defaultValue) => {
    const validQueryStrings = ['min-width', 'max-width']

    if (Array.isArray(breakPointObjs) === false) return defaultValue
    if (validQueryStrings.includes(queryString) === false) return defaultValue

    const sortedBps = sortObjectsByProperty(breakPointObjs, 'breakPoint', false)

    if (queryString === 'min-width') {
        sortedBps.reverse()
    }

    const mediaMatch = findMediaMatch(sortedBps, { query: queryString, property: 'breakPoint', unit: 'px' })
    if (mediaMatch) return mediaMatch.item
    return defaultValue
}