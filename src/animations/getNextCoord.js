/**
 * getNextCoord returns the sum of currentPosition and limit if the difference between nextPosition 
 * and currentPosition is greater than limit, else nextPosition
 * @param {Number} currentPosition Float indicating the element's current position
 * @param {Number} nextPosition Float indicating the element's target position
 * @param {Number} limit Float indicating the maximum amplitude of change
 * @returns {Number} the intermediate, or possibly final, position the element should take
 */
export const getNextCoord = (currentPosition, nextPosition, limit) => {
    if (Math.abs(nextPosition - currentPosition) > Math.abs(limit)) {
        return parseFloat(parseFloat(currentPosition + limit).toFixed(2))
    } else {
        return nextPosition
    }
}

