/**
 * recurTilTrue sets an interval to call booleanFn with delay until booleanFn returns true
 * once booleanFn returns true, the interval is cleared.
 * a promise is returned that resolves once the interval is cleared.
 * @param {Function} booleanFn function that returns true or false
 * @param {Number} delay integer number of milliseconds for delay between intervals
 */
export const recurTilTrue = (booleanFn, delay) => {
    return new Promise((resolve, reject) => {
        let interval = window.setInterval(() => {
            try {
                if (booleanFn()) {
                    window.clearInterval(interval)
                    resolve()
                }
            } catch(err) {
                reject(err)
            }
        }, delay)
    })
}