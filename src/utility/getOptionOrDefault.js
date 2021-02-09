/**
 * getOptionOrDefault attempts to retrieve property from element's dataset, falls back to default if property not present
 * @param {Object} obj - an object
 * @param {string} obj.name - name property to retrieve
 * @param {Function} obj.convertFn - function that converts 
 * @returns {Any}
 */
export const getOptionOrDefault = ({name, convertFn}, dataset={}, fallback={}) => {
    let value
    const datasetValue = dataset[name]
    const fallbackValue = fallback[name]

    if (datasetValue === undefined && fallbackValue === undefined) {
        throw '[getOptionOrDefault] invalid name'
    }

    try {
        value = convertFn(datasetValue)
    } catch(_) {
        try {
            value = convertFn(fallbackValue)
        } catch(_) {
            throw '[getOptionOrDefault] property cannot be converted'
        }
    }

    return value
}