/**
 * constructMediaQuery creates a mediaQuery string
 * @param {Object} queryObj 
 * @param {string} query queryObj.query - valid media query type i.e. "min-width", "max-width", etc.
 * @param {Number} comparisonValue queryObj.comparisonValue
 * @param {string} unit queryObj.unit - unit to apply to comparisonValue
 * @returns {string} used as argument in window.matchMedia
 */
export const constructMediaQuery = (queryObj) => {
    const unitName = queryObj.unit || ''
    return `(${queryObj.query}: ${queryObj.comparisonValue}${unitName})`
}