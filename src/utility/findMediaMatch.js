import { constructMediaQuery } from './constructMediaQuery'

/**
 * findMediaMatch find object whose property matches query against the current window
 * @param {Array.<Object>} mediaObjs array of mediaObj
 * @param {string} query 'min-width' or 'max-width'
 * @param {string} property key in mediaObj whose value will be compared
 * @param {string} unit unit to apply to comparison value
 */
export const findMediaMatch = (mediaObjs, { query, property, unit }) => {
    for (let mediaObj of mediaObjs) {
        const mediaQueryString = constructMediaQuery({ query, comparisonValue: mediaObj[property], unit })
        const mediaQueryList = window.matchMedia(mediaQueryString)
        if (mediaQueryList.matches) return mediaObj
    }
}