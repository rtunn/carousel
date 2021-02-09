/**
 * toInt attempts to convert value to an integer
 * @param {Any} value 
 * @returns {Number}
 */
export const toInt = (value) => {
    if (isNaN(value)) {
        throw new Error('[toInt] NaN cannot be parsed as integer')
    }
    const asFloat = parseFloat(value)
    return parseInt(asFloat, 10)
}