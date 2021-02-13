/**
 * sortObjectsByProperty sorts array by value a given property
 * @param {Array.<Object>} objs array of objects to sort
 * @param {string} key key of the property to use in sort function
 * @param {boolean} allowDuplicates throws error if set to false and two or more objects' property has the same value
 * @returns {Array.<Object>} objs sorted by property
 */
export const sortObjectsByProperty = (objs, key, allowDuplicates) => {
    return [...objs].sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        if (allowDuplicates !== true) throw `encountered duplicate value for objects: ${a} and ${b}`
        return 0
    })
}